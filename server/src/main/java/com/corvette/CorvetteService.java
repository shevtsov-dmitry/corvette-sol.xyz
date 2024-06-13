package com.corvette;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class CorvetteService {
    private final ResourceLoader resourceLoader;
    private final String STORAGE_PATH = "/home/shd/Pictures/corvette/";

    public CorvetteService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    public List<Image> readAllFiles(String folderName) {
        try {
            List<Image> images = new ArrayList<>();
            Path path = Paths.get(STORAGE_PATH.concat(folderName));

            try (DirectoryStream<Path> directoryStream = Files.newDirectoryStream(path)) {
                int index = 0;
                for (Path filePath : directoryStream) {
                    if (Files.isRegularFile(filePath)) {
                        Resource resource = resourceLoader.getResource("file:" + filePath.toString());
                        images.add(new Image(index, Files.readAllBytes(filePath)));
                        index++;
                    }
                }
            }
            return images;
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

}