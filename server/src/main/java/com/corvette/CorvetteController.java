package com.corvette;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cars")
public class CorvetteController {

    private final CorvetteService service;

    public CorvetteController(CorvetteService service) {
        this.service = service;
    }

    @GetMapping("/get/rims")
    public ResponseEntity<List<Image>> getRims() {
        List<Image> modelImages = service.readAllFiles("rims");
        if(modelImages.isEmpty())  {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(modelImages);
    }


    @GetMapping("/get/models")
    public ResponseEntity<List<Image>> getModels() {
        List<Image> modelImages = service.readAllFiles("models");
        if(modelImages.isEmpty())  {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(modelImages);
    }


    @GetMapping("/get/colors")
    public ResponseEntity<List<Image>> getColors() {
        List<Image> modelImages = service.readAllFiles("colors");
        if(modelImages.isEmpty())  {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(modelImages);
    }

    @GetMapping("/get/backgrounds")
    public ResponseEntity<List<Image>> getBackgrounds() {
        List<Image> modelImages = service.readAllFiles("backgrounds");
        if(modelImages.isEmpty())  {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(modelImages);
    }





}
