package com.corvette.controller;

import com.corvette.service.UrlsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/urls")
public class UrlsController {

    private final UrlsService service;

    public UrlsController(UrlsService service) {
        this.service = service;
    }

    @GetMapping("/list")
    public Map<String, String> listUrls(){
        return service.listUrls();
    }

    @PutMapping("/change")
    public String changeUrl(@RequestParam String to, @RequestParam String url) {
        return service.changeUrl(to, url);
    }
}
