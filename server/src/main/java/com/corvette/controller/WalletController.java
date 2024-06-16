package com.corvette.controller;

import com.corvette.service.WalletService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/wallets")
@RestController
public class WalletController {

    private final  WalletService service;

    public WalletController(WalletService service) {
        this.service = service;
    }

    @GetMapping("/check/{userWallet}")
    public ResponseEntity checkWallet(@PathVariable String userWallet) {
        if(service.checkUserWallet(userWallet)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
