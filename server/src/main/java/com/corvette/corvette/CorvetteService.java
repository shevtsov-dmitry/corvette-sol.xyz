package com.corvette.corvette;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class CorvetteService {
    private final ResourceLoader resourceLoader;
    private final Logger log = LoggerFactory.getLogger(CorvetteService.class);

    @Value("${custom.env.IMAGES_STORAGE_PATH}")
    private String IMAGES_STORAGE_PATH;
    private Path dirPath;

    @PostConstruct
    public void init() {
        this.dirPath = Paths.get(IMAGES_STORAGE_PATH);
        if (!Files.exists(dirPath)) {
            try {
                log.warn("Couldn't find the image storage directory, creating it now... " +
                        "\nYou need to contain carmodel images by path {}", "${HOME}/Pictures/corvette/carmodels");
                Files.createDirectories(dirPath);
            } catch (IOException e) {
                log.error("Error while trying to initialize creating the directory: {}", e.getMessage());
                System.exit(1);
            }
        }
    }

    public CorvetteService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    public List<Map<String, byte[]>> retrieveAssets(String show, CarAssetMetadata metadata) {
        List<Map<String, byte[]>> matchedImages = new ArrayList<>();
        try (DirectoryStream<Path> directoryStream = Files.newDirectoryStream(dirPath)) {
            for (Path filePath : directoryStream) {
                String curFilename = getCurFilename(filePath);
                if (!isFilenameMatching(curFilename, show, metadata)) continue;
                Resource resource = resourceLoader.getResource("file:" + filePath);
                matchedImages.add(new HashMap<>(
                        Map.of("filename", curFilename.getBytes(), "image", resource.getContentAsByteArray())));
            }
            return matchedImages;
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    public boolean isFilenameMatching(String fileName, String show, CarAssetMetadata metadata) {
        switch (show) {
            case "model" -> {
                return fileName.endsWith(metadata.color() + "-" + metadata.rimsIdx());
            }
            case "color" -> {
                String[] splitted = fileName.split("-");
                splitted = new String[]{splitted[0], splitted[2]};
                String[] requested = new String[]{metadata.modelIdx(), metadata.rimsIdx()};
                return Arrays.equals(splitted, requested);
            }
            case "rims" -> {
                return fileName.startsWith(metadata.modelIdx() + "-" + metadata.color());
            }
            default -> {
                return false;
            }
        }
    }

    public byte[] getFinalCar(CarAssetMetadata metadata) {
        try (DirectoryStream<Path> directoryStream = Files.newDirectoryStream(dirPath)) {
            for (Path filePath : directoryStream) {
                String curFilename = getCurFilename(filePath);
                if (curFilename.equals(metadata.requestedFilename())) {
                    Resource resource = resourceLoader.getResource("file:" + filePath);
                    return resource.getContentAsByteArray();
                }
            }
        } catch (Exception e) {
            return new byte[0];
        }
        return new byte[0];
    }

    private static String getCurFilename(Path filePath) {
        String fileName = filePath.getFileName().toString();
        fileName = fileName.substring(0, fileName.lastIndexOf("."));
        return fileName;
    }

}
