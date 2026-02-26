package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.domain.campaign.Campaign;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface CampaignRepository extends ReactiveMongoRepository<Campaign, String> {
}
