package com.corvette.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Value("${SERVER_IP:http://localhost}")
    private String SERVER_IP;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/wallets/**").allowedOrigins("*").allowedMethods("GET", "POST");
        registry.addMapping("/cars/**").allowedOrigins("*").allowedMethods("GET", "POST");
        registry.addMapping("/urls/**").allowedOrigins("*").allowedMethods("GET");

        registry.addMapping("/urls/change").allowedOrigins(SERVER_IP).allowedMethods("PATCH");


    }

};
