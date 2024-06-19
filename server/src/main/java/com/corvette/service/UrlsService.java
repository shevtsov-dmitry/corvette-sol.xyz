package com.corvette.service;

import com.corvette.repository.UrlRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UrlsService {

    @Autowired
    private UrlRepo repo;

    public String listUrls() {
        var sb = new StringBuilder();
        repo.findAll().forEach(url -> sb.append("to: %s | url: %s%n".formatted(url.getWebsite(), url.getUrl())));
        return sb.toString();
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
