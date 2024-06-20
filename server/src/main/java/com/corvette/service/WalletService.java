package com.corvette.service;

import com.corvette.model.Wallet;
import com.corvette.repository.WalletRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class WalletService {
    @Autowired
    private WalletRepo repo;

    public boolean checkWalletRegex(String userWallet) {
        String asciiRegex = "^[\\x00-\\x7F]*$";
        return userWallet.length() > 10 && userWallet.length() < 75 && userWallet.matches(asciiRegex);
    }

    public boolean checkUserWallet(String userWallet) {
        return repo.findAll().stream().map(Wallet::getWallet).anyMatch(userWallet::equals);
    }

    public boolean saveUserWallet(String userWallet) {
        return repo.save(new Wallet(userWallet)).getId() != null;
    }

    public Map<Integer, String> listAllWallets() {
        Map<Integer, String> map = new HashMap<>();
        repo.findAll().forEach(wallet -> map.put(wallet.getId(), wallet.getWallet()));
        return map;
    }
}