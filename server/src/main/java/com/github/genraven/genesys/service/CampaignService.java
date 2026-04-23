package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.campaign.CampaignCompendium;
import com.github.genraven.genesys.repository.CampaignRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class CampaignService {

    private final CampaignRepository campaignRepository;

    public Flux<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Mono<Campaign> getCampaign(final String id) {
        return campaignRepository.findById(id);
    }

    public Mono<Campaign> createCampaign(final Campaign campaign) {
        log.info("Creating new campaign with name: {}", campaign.getName());
        return campaignRepository.save(campaign);
    }

    public Mono<CampaignCompendium> getCampaignCompendium(final String campaignId) {
        log.info("Fetching compendium for campaign with id: {}", campaignId);
        return campaignRepository.findById(campaignId).map(Campaign::getCompendium);
    }

    public Mono<Campaign> updateCampaign(final String id, final Campaign campaign) {
        log.info("Updating campaign with id: {}", id);
        return campaignRepository.save(campaign)
            .doOnNext(updatedCampaign -> log.debug("Updated campaign: {}", updatedCampaign))
            .doOnError(error -> log.error("Error updating campaign with id: {}", id, error));
    }
}
