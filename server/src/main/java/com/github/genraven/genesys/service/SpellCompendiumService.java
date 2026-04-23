package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.spell.Spell;

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
public class SpellCompendiumService {

    private final ReactiveMongoTemplate reactiveMongoTemplate;

    public Flux<Spell> findAllByCampaignId(final String campaignId) {
        return reactiveMongoTemplate.findById(campaignId, Campaign.class)
                .flatMapMany(campaign -> Flux.fromIterable(campaign.getCompendium().getSpells()));
    }

    public Mono<Spell> addSpell(final String campaignId, final Spell spell) {
        spell.setId(UUID.randomUUID().toString());

        Query query = new Query(Criteria.where("id").is(campaignId));
        Update update = new Update().push("compendium.spells", spell);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(spell);
    }

    public Mono<Spell> updateSpell(final String campaignId, final String spellId, final Spell updatedSpell) {
        updatedSpell.setId(spellId);
        Query query = new Query(Criteria.where("id").is(campaignId).and("compendium.spells.id").is(spellId));

        Update update = new Update().set("compendium.spells.$", updatedSpell);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(updatedSpell);
    }
}
