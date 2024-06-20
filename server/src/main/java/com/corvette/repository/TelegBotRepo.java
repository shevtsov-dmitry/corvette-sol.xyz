package com.corvette.repository;

import com.corvette.model.TelegbotMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TelegBotRepo extends JpaRepository<TelegbotMessage, Integer> {
    @Query("SELECT e FROM TelegbotMessage e WHERE e.type = :type")
    List<TelegbotMessage> findByType(String type);
    @Query("UPDATE TelegbotMessage e SET e.type = :type WHERE e.message = :message")
    void updateByTypeAndMessage(String type, String message);
}
