package com.corvette.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

@Service
public class WalletService {
    @Autowired
    private ResourceLoader resourceLoader;

    private final String FILE_NAME = "wallets.txt";

    public boolean checkUserWallet(String userWallet) {
        Resource resource = resourceLoader.getResource("classpath:" + FILE_NAME);
        try {
            Path path = Paths.get(resource.getURI());
            String[] allWallets = Files.readString(path).split(",");
            for (String wallet : allWallets) {
                if (wallet.equals(userWallet)) {
                    return true;
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return false;
    }


}