package com.corvette.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/wallets/**").allowedOrigins("*").allowedMethods("GET", "POST");
        registry.addMapping("/cars/**").allowedOrigins("*").allowedMethods("GET", "POST");
        registry.addMapping("/urls/**").allowedOrigins("*").allowedMethods("GET", "PATCH");
    }

};
