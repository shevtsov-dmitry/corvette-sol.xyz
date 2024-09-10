package com.corvette.corvette;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cars")
public class CorvetteController {

    private final CorvetteService service;

    public CorvetteController(CorvetteService service) {
        this.service = service;
    }

    @GetMapping("/get/assets")
    public ResponseEntity<List<Map<String, byte[]>>> getCarAssets(
            @RequestParam String show, @RequestParam String model, @RequestParam String color, @RequestParam String rims) {
        var matchedImages = service.retrieveAssets(show, new CarAssetMetadata(model, color, rims));
        if (matchedImages.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(matchedImages);
    }


    @GetMapping("/get/constructed-car")
    public ResponseEntity<byte[]> getFinalCar(@RequestParam String model, @RequestParam String color, @RequestParam String rims) {
        var image = service.getFinalCar(new CarAssetMetadata(model, color, rims));
        if (image.length == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(image);
    }


}
