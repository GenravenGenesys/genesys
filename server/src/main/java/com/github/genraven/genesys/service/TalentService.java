package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.talent.Talent;
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
public class TalentService {

    private final ReactiveMongoTemplate reactiveMongoTemplate;

    public Flux<Talent> findAllByCampaignId(final String campaignId) {
        return reactiveMongoTemplate.findById(campaignId, Campaign.class)
            .flatMapMany(campaign -> Flux.fromIterable(campaign.getCompendium().getTalents()));
    }

    public Mono<Talent> addTalent(final String campaignId, final Talent talent) {
        talent.setId(UUID.randomUUID().toString());

        Query query = new Query(Criteria.where("id").is(campaignId));
        Update update = new Update().push("compendium.talents", talent);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(talent);
    }

    public Mono<Talent> updateTalent(final String campaignId, final String talentId, final Talent updatedTalent) {
        Query query = new Query(Criteria.where("id").is(campaignId).and("compendium.talents.id").is(talentId));

        Update update = new Update().set("compendium.talents.$", updatedTalent);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(updatedTalent);
    }
}
