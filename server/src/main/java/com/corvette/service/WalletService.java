package com.corvette.service;

import com.corvette.model.Wallet;
import com.corvette.repository.WalletRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WalletService {
    //    private final String WALLET_EXAMPLE = "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826";
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
}