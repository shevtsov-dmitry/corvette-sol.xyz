package com.corvette.controller;

import com.corvette.service.WalletService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/wallets")
@RestController
public class WalletController {

    private final  WalletService service;

    public WalletController(WalletService service) {
        this.service = service;
    }

    @GetMapping("/check/{userWallet}")
    public ResponseEntity checkWallet(@PathVariable String userWallet) {
        return service.checkUserWallet(userWallet) ? ResponseEntity.ok().build() :  ResponseEntity.badRequest().build();
    }

    @PostMapping("/save/{userWallet}")
    public ResponseEntity saveWallet(@PathVariable String userWallet) {
        return service.saveUserWallet(userWallet) ? ResponseEntity.ok().build() :  ResponseEntity.badRequest().build();
    }
}