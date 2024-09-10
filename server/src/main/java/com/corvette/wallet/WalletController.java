package com.corvette.wallet;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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


    @GetMapping("/list")
    public ResponseEntity<Map<Integer, String>> listWallets() {
        try {
            return ResponseEntity.ok(service.listAllWallets());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(0, "Error on a server: %s".formatted(e.getMessage())));
        }
    }

    @PostMapping("/save/{userWallet}")
    public ResponseEntity saveWallet(@PathVariable String userWallet) {
        return service.saveUserWallet(userWallet) ? ResponseEntity.ok().build() : ResponseEntity.internalServerError().build();
    }
}