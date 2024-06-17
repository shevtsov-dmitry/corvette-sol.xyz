package com.corvette.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.*;

@Service
public class WalletService {

    // TODO make it env
    private final String WALLETS_PATH = "/home/shd/.local/state/wallets.txt";

    public boolean checkUserWallet(String userWallet) {
        try {
            final Path path = Paths.get(WALLETS_PATH);
            final String[] allWallets = Files.readString(path).split(",");
            for (String wallet : allWallets) {
                if (wallet.equals(userWallet)) {
                    return true;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return false;
    }

    public boolean saveUserWallet(String userWallet) {
        try {
            final Path path = Paths.get(WALLETS_PATH);
            System.out.println(path);
            if (!Files.exists(path)){
                Files.createFile(path);
            }
            final String newWallet = userWallet + ",";
            System.out.println(path);
            Files.writeString(path, newWallet, StandardOpenOption.APPEND);
        }
        catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}