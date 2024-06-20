package com.corvette.controller;

import com.corvette.service.TelegBotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/telegbot")
public class TelegBotController {

    private final TelegBotService service;

    public TelegBotController(TelegBotService service) {
        this.service = service;
    }

    @GetMapping("/message/{type}")
    public ResponseEntity<String> getMessage(@PathVariable String type) {
        try {
            return ResponseEntity.ok(service.getMessage(type));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/message/{type}/{newMessage}")
    public ResponseEntity changeMessage(@PathVariable String type, @PathVariable String newMessage) {
        return service.changeMessage(type, newMessage) ? ResponseEntity.ok().build() : ResponseEntity.internalServerError().build();
    }

}
