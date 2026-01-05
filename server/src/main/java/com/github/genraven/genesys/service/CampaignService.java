package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.campaign.Campaign;
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

    public Mono<Campaign> createCampaign(final String name) {
        return campaignRepository.save(new Campaign(name));
    }

    public Mono<Campaign> updateCampaign(final String id, final Campaign campaign) {
        log.info("Updating campaign with id: {}", id);
        return getCampaign(id).map(camp -> {
                camp.setName(campaign.getName());
                camp.setParty(campaign.getParty());
                camp.setSessions(campaign.getSessions());
                camp.setActive(campaign.isActive());
                return camp;
            }).flatMap(campaignRepository::save)
            .doOnNext(updatedCampaign -> log.debug("Updated campaign: {}", updatedCampaign))
            .doOnError(error -> log.error("Error updating campaign with id: {}", id, error));
    }

    public Mono<Campaign> getCurrentCampaign() {
        return campaignRepository.findByCurrent(true);
    }

    public Mono<Campaign> setCurrentCampaign(final String id) {
        return campaignRepository.findAll()
            .map(campaign -> {
                campaign.setCurrent(false);
                return campaign;
            })
            .flatMap(campaignRepository::save)
            .then(getCampaign(id))
            .map(campaign -> {
                campaign.setCurrent(true);
                return campaign;
            })
            .flatMap(campaignRepository::save);
    }
}
