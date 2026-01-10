package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.actor.AdversaryTemplate;
import com.github.genraven.genesys.domain.campaign.Campaign;
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
public class AdversaryService {

    private final ReactiveMongoTemplate reactiveMongoTemplate;

    public Flux<AdversaryTemplate> findAllByCampaignId(final String campaignId) {
        return reactiveMongoTemplate.findById(campaignId, Campaign.class)
            .flatMapMany(campaign -> Flux.fromIterable(campaign.getCompendium().getAdversaries()));
    }

    public Mono<AdversaryTemplate> addAdversary(final String campaignId, final AdversaryTemplate adversary) {
        adversary.setId(UUID.randomUUID().toString());

        Query query = new Query(Criteria.where("id").is(campaignId));
        Update update = new Update().push("compendium.adversarys", adversary);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(adversary);
    }

    public Mono<AdversaryTemplate> updateAdversary(final String campaignId, final String adversaryId, final AdversaryTemplate updatedAdversary) {
        Query query = new Query(Criteria.where("id").is(campaignId).and("compendium.adversarys.id").is(adversaryId));

        Update update = new Update().set("compendium.adversarys.$", updatedAdversary);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(updatedAdversary);
    }
}
