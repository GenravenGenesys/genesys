package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.domain.campaign.CampaignSession;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends ReactiveMongoRepository<CampaignSession, String> {
}
