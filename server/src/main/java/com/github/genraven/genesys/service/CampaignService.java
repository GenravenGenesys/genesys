package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.campaign.CampaignCompendium;
import com.github.genraven.genesys.repository.CampaignRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Objects;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Slf4j
@Service
@RequiredArgsConstructor
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final ReactiveMongoTemplate reactiveMongoTemplate;

    public Flux<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Mono<Campaign> getCampaign(final String id) {
        return campaignRepository.findById(id);
    }

    public Mono<Campaign> createCampaign(final String name) {
        return campaignRepository.save(new Campaign());
    }

    public Mono<CampaignCompendium> getCampaignCompendium(final String campaignId) {
        log.info("Fetching compendium for campaign with id: {}", campaignId);
        return campaignRepository.findById(campaignId).map(Campaign::getCompendium);
    }

    public Flux<CampaignCompendium> getCampaignCompendiumUpdates(final String campaignId) {
        return reactiveMongoTemplate
            .changeStream(Campaign.class)
            .watchCollection("campaigns")
            .filter(where("fullDocument._id").is(campaignId))
            .listen()
            .map(event -> Objects.requireNonNull(event.getBody()).getCompendium());
    }

//    public Mono<Campaign> updateCampaign(final String id, final Campaign campaign) {
//        log.info("Updating campaign with id: {}", id);
//        return getCampaign(id).map(camp -> {
//                camp.setName(campaign.getName());
//                camp.setParty(campaign.getParty());
//                camp.setSessions(campaign.getSessions());
//                camp.setActive(campaign.isActive());
//                return camp;
//            }).flatMap(campaignRepository::save)
//            .doOnNext(updatedCampaign -> log.debug("Updated campaign: {}", updatedCampaign))
//            .doOnError(error -> log.error("Error updating campaign with id: {}", id, error));
//    }
//
//    public Mono<Campaign> getCurrentCampaign() {
//        return campaignRepository.findByCurrent(true);
//    }
//
//    public Mono<Campaign> setCurrentCampaign(final String id) {
//        return campaignRepository.findAll()
//            .map(campaign -> {
//                campaign.setCurrent(false);
//                return campaign;
//            })
//            .flatMap(campaignRepository::save)
//            .then(getCampaign(id))
//            .map(campaign -> {
//                campaign.setCurrent(true);
//                return campaign;
//            })
//            .flatMap(campaignRepository::save);
//    }
}
