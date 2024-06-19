package com.corvette.service;

import com.corvette.repository.UrlRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UrlsService {

    @Autowired
    private UrlRepo repo;

    public Map<String, String> listUrls() {
        Map<String, String> map = new HashMap<>();
        repo.findAll().forEach(url -> map.put(url.getWebsite(), url.getUrl()));
        return map;
    }

    public String changeUrl(String to, String url) {
        try {
            repo.updateByWebsiteAndUrl(to, url);
            return  "Successfully updated ✓";
        } catch (Exception e){
            e.printStackTrace();
            return "Error updating data ☠. Happened because website name doesn't exist in database. Check for errors in the spelling of the website to which the link is indicated.";
        }
    }
}
