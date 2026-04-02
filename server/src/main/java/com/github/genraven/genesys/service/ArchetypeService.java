package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.actor.player.Archetype;
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
public class ArchetypeService {
    
    private final ReactiveMongoTemplate reactiveMongoTemplate;

    public Flux<Archetype> findAllByCampaignId(final String campaignId) {
        return reactiveMongoTemplate.findById(campaignId, Campaign.class)
            .flatMapMany(campaign -> Flux.fromIterable(campaign.getCompendium().getArchetypes()));
    }

    public Mono<Archetype> addArchetype(final String campaignId, final Archetype archetype) {
        archetype.setId(UUID.randomUUID().toString());

        Query query = new Query(Criteria.where("id").is(campaignId));
        Update update = new Update().push("compendium.archetypes", archetype);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(archetype);
    }

    public Mono<Archetype> updateArchetype(final String campaignId, final String archetypeId, final Archetype updatedArchetype) {
        Query query = new Query(Criteria.where("id").is(campaignId).and("compendium.archetypes.id").is(archetypeId));

        Update update = new Update().set("compendium.archetypes.$", updatedArchetype);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(updatedArchetype);
    }
}
