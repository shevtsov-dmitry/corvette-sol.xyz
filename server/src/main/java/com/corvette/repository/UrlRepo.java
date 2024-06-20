package com.corvette.repository;

import com.corvette.model.Url;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UrlRepo extends JpaRepository<Url, Integer> {

     @Modifying
     @Transactional
     @Query("UPDATE Url e SET e.url = :url WHERE e.website = :website")
     void updateByWebsiteAndUrl(String website, String url);

     Url getFirstByWebsite(String website);
}
