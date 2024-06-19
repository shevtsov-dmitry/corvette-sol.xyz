package com.corvette.controller;

import com.corvette.service.WalletService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/wallets")
@RestController
public class WalletController {

    private final WalletService service;

    public WalletController(WalletService service) {
        this.service = service;
    }

    @GetMapping("/check/{userWallet}")
    public ResponseEntity<String> checkWallet(@PathVariable String userWallet) {
        if (!service.checkWalletRegex(userWallet) || userWallet.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        return service.checkUserWallet(userWallet) ? ResponseEntity.status(409).build() : ResponseEntity.notFound().build();
    }

    @PostMapping("/save/{userWallet}")
    public ResponseEntity saveWallet(@PathVariable String userWallet) {
        return service.saveUserWallet(userWallet) ? ResponseEntity.ok().build() : ResponseEntity.internalServerError().build();
    }
}