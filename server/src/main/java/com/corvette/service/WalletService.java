package com.corvette.service;

import org.apache.tomcat.util.buf.Ascii;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.*;
import java.util.regex.Pattern;

@Service
public class WalletService {

    // TODO make it env
    private final String WALLETS_PATH = "/home/shd/.local/state/wallets.txt";
    private final String WALLET_EXAMPLE = "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826";

    public boolean checkWalletRegex(String userWallet) {
        String asciiRegex = "^[\\x00-\\x7F]*$";
        return userWallet.length() > 10 && userWallet.length() < 75 && userWallet.matches(asciiRegex);
    }

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
            if (!Files.exists(path)){
                Files.createFile(path);
            }
            final String newWallet = userWallet + ",";
            System.out.println(path);
            Files.writeString(path, newWallet, StandardOpenOption.APPEND);
        }
        catch (IOException e) {
            return false;
        }
        return true;
    }
}