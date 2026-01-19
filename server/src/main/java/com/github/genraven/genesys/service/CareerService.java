package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.domain.campaign.Campaign;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class CareerService {

    private final ReactiveMongoTemplate reactiveMongoTemplate;

    public Flux<Career> findAllByCampaignId(final String campaignId) {
        return reactiveMongoTemplate.findById(campaignId, Campaign.class)
            .flatMapMany(campaign -> Flux.fromIterable(campaign.getCompendium().getCareers()));
    }

    public Mono<Career> addCareer(final String campaignId, final Career career) {
        career.setId(UUID.randomUUID().toString());

        Query query = new Query(Criteria.where("id").is(campaignId));
        Update update = new Update().push("compendium.careers", career);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(career);
    }

    public Mono<Career> updateCareer(final String campaignId, final String careerId, final Career updatedCareer) {
        Query query = new Query(Criteria.where("id").is(campaignId).and("compendium.careers.id").is(careerId));

        Update update = new Update().set("compendium.careers.$", updatedCareer);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(updatedCareer);
    }
}
