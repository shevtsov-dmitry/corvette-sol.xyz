package com.corvette;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class CorvetteService {
    private final ResourceLoader resourceLoader;
    // TODO make env
    private final String IMAGES_STORAGE_PATH = "/home/shd/Pictures/corvette/";

    public CorvetteService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    public List<byte[]> retrieveAssets(String show, CarAssetMetadata metadata) {
        List<byte[]> matchedImages = new ArrayList<>();
        try {
            Path dirPath = Paths.get(IMAGES_STORAGE_PATH);
            try (DirectoryStream<Path> directoryStream = Files.newDirectoryStream(dirPath)) {
                for (Path filePath : directoryStream) {
                    String fileName = filePath.getFileName().toString();
                    fileName = fileName.substring(0, fileName.lastIndexOf("."));
                    if (isFilenameMatching(fileName, show, metadata)) {
                        Resource resource = resourceLoader.getResource("file:" + filePath);
                        matchedImages.add(resource.getContentAsByteArray());
                    }
                }
            }
            return matchedImages;
        } catch (
                Exception e) {
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
                String[] requested = new String[]{splitted[0], splitted[2]};
                return Arrays.equals(splitted, requested);
            }
            case "rims" -> {
                return fileName.startsWith(metadata.color() + "-" + metadata.color());
            }
            default -> {
                return false;
            }
        }
    }

}