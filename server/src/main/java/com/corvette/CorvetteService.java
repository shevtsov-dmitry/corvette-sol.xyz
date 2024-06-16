package com.corvette;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class CorvetteService {
    private final ResourceLoader resourceLoader;
    // TODO make env
    private final String IMAGES_STORAGE_PATH = "/home/shd/Pictures/corvette/";
    private final Path dirPath = Paths.get(IMAGES_STORAGE_PATH);

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
                System.out.println(Arrays.toString(requested) + "\t" + Arrays.toString(splitted));
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
                if (curFilename.equals(metadata.requestedFilename())){
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
