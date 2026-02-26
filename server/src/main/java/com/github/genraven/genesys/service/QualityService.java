package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.quality.Quality;

import lombok.RequiredArgsConstructor;

import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QualityService {

    private final ReactiveMongoTemplate reactiveMongoTemplate;

    public Flux<Quality> findAllByCampaignId(final String campaignId) {
        return reactiveMongoTemplate.findById(campaignId, Campaign.class)
            .flatMapMany(campaign -> Flux.fromIterable(campaign.getCompendium().getQualities()));
    }

    public Mono<Quality> addQuality(final String campaignId, final Quality quality) {
        quality.setId(UUID.randomUUID().toString());

        Query query = new Query(Criteria.where("id").is(campaignId));
        Update update = new Update().push("compendium.quality", quality);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(quality);
    }

    public Mono<Quality> updateQuality(final String campaignId, final String qualityId, final Quality updatedQuality) {
        Query query = new Query(Criteria.where("id").is(campaignId).and("compendium.quality.id").is(qualityId));

        Update update = new Update().set("compendium.quality.$", updatedQuality);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(updatedQuality);
    }
}
