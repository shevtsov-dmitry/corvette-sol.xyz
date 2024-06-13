package com.corvette;

import com.corvette.records.Image;
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

    @GetMapping("/models")
    public List<Image> getModels() {
        return service.getModels();
    }
}
