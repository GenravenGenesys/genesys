package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.CriticalInjury;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class InjuryService {

    private final ReactiveMongoTemplate reactiveMongoTemplate;

    public Flux<CriticalInjury> findAllByCampaignId(final String campaignId) {
        return reactiveMongoTemplate.findById(campaignId, Campaign.class)
                .flatMapMany(campaign -> Flux.fromIterable(campaign.getCompendium().getCriticalInjuries()));
    }

    public Mono<CriticalInjury> addCriticalInjury(final String campaignId, final CriticalInjury injury) {
        injury.setId(UUID.randomUUID().toString());

        Query query = new Query(Criteria.where("id").is(campaignId));
        Update update = new Update().push("compendium.injury", injury);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(injury);
    }

    public Mono<CriticalInjury> updateCriticalInjury(final String campaignId, final String injuryId, final CriticalInjury updatedCriticalInjury) {
        Query query = new Query(Criteria.where("id").is(campaignId).and("compendium.injury.id").is(injuryId));

        Update update = new Update().set("compendium.injury.$", updatedCriticalInjury);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(updatedCriticalInjury);
    }
}
