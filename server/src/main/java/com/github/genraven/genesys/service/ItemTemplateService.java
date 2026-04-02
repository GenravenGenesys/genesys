package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.equipment.ItemTemplate;
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
public class ItemTemplateService {

    private final ReactiveMongoTemplate reactiveMongoTemplate;

    public Flux<ItemTemplate> findAllByCampaignId(final String campaignId) {
        return reactiveMongoTemplate.findById(campaignId, Campaign.class)
            .flatMapMany(campaign -> Flux.fromIterable(campaign.getCompendium().getItems()));
    }

    public Mono<ItemTemplate> addItem(final String campaignId, final ItemTemplate item) {
        item.setId(UUID.randomUUID().toString());

        Query query = new Query(Criteria.where("id").is(campaignId));
        Update update = new Update().push("compendium.items", item);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(item);
    }

    public Mono<ItemTemplate> updateItem(final String campaignId, final String itemId, final ItemTemplate updatedItem) {
        Query query = new Query(Criteria.where("id").is(campaignId).and("compendium.items.id").is(itemId));

        Update update = new Update().set("compendium.items.$", updatedItem);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(updatedItem);
    }

    public Mono<Void> deleteItem(final String campaignId, final String itemId) {
        Query query = new Query(Criteria.where("id").is(campaignId));
        Update update = new Update().pull("compendium.items", Query.query(Criteria.where("id").is(itemId)));

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).then();
    }
}
