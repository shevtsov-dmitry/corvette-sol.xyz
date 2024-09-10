package com.corvette.urls;

import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/get/{website}")
    public String getUrl(@PathVariable String website) {
        return service.getUrl(website);
    }

    @PutMapping("/change")
    public String changeUrl(@RequestParam String to, @RequestParam String url) {
        return service.changeUrl(to, url);
    }
}
