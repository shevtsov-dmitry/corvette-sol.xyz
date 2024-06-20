package com.corvette.service;

import com.corvette.repository.TelegBotRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TelegBotService {

    @Autowired
    private TelegBotRepo repo;

    public String getMessage(String type) {
        return repo.findByType(type).getFirst().getMessage();
    }

    public boolean changeMessage(String type, String newMessage) {
        try {
            repo.updateByTypeAndMessage(type, newMessage);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


}
