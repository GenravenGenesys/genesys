package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.talent.Talent;
import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.repository.CampaignRepository;
import com.github.genraven.genesys.repository.TalentRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TalentService {

    private static final Logger logger = LoggerFactory.getLogger(TalentService.class);
    private final TalentRepository talentRepository;
    private final CampaignRepository campaignRepository;

    public Flux<Talent> getAllTalents() {
        logger.info("Fetching all talents");
        return talentRepository.findAll()
                .doOnNext(talent -> logger.debug("Fetched talent: {}", talent.getName()));
    }

    public Mono<Talent> getTalent(final String name) {
        logger.info("Fetching talent with name: {}", name);
        return talentRepository.findById(name)
                .doOnNext(talent -> logger.debug("Fetched talent: {}", talent))
                .doOnError(error -> logger.error("Error fetching talent with name: {}", name, error));
    }

    public Mono<Talent> createTalent(final String name) {
        logger.info("Creating talent with name: {}", name);
        return talentRepository.save(new Talent(name))
                .doOnNext(talent -> logger.debug("Created talent: {}", talent))
                .doOnError(error -> logger.error("Error creating talent with name: {}", name, error));
    }

    public Mono<Talent> updateTalent(final String name, final Talent talent) {
        logger.info("Updating talent with name: {}", name);
        return getTalent(name).map(tal -> {
                    tal.setActivation(talent.getActivation());
                    tal.setRanked(talent.isRanked());
                    tal.setTier(talent.getTier());
                    tal.setDescription(talent.getDescription());
                    tal.setSummary(talent.getSummary());
                    tal.setCost(talent.getCost());
                    tal.setLimit(talent.getLimit());
                    tal.setTalentSkills(talent.getTalentSkills());
                    tal.setModifiers(talent.getModifiers());
                    return tal;
                }).flatMap(talentRepository::save)
                .doOnNext(updatedTalent -> logger.debug("Updated talent: {}", updatedTalent))
                .doOnError(error -> logger.error("Error updating talent with name: {}", name, error));
    }

    public Mono<List<Talent>> getTalentsForCurrentCampaign() {
        logger.info("Fetching talents for current campaign");
        return campaignRepository.findByCurrent(true)
                .doOnNext(campaign -> logger.debug("Found current campaign: {}", campaign))
                .flatMap(campaign -> Flux.fromIterable(campaign.getTalentIds())
                        .flatMap(talentRepository::findById)
                        .collectList())
                .doOnNext(talents -> logger.debug("Fetched talents for current campaign: {}", talents))
                .doOnError(error -> logger.error("Error fetching talents for current campaign", error));
    }

    public Mono<Campaign> addTalentToCurrentCampaign(final String talentId) {
        logger.info("Adding talent with ID: {} to current campaign", talentId);
        return campaignRepository.findByCurrent(true).flatMap(existingCampaign -> {
                    existingCampaign.getTalentIds().add(talentId);
                    return campaignRepository.save(existingCampaign);
                }).doOnNext(updatedCampaign -> logger.debug("Added talent to current campaign: {}", updatedCampaign))
                .doOnError(error -> logger.error("Error adding talent to current campaign", error));
    }

    public Mono<List<Talent>> getTalentsForCurrentCampaignByTier(final Talent.Tier tier) {
        logger.info("Fetching talents for current campaign by tier: {}", tier);
        return getTalentsForCurrentCampaign().flatMap(talents -> {
            final List<Talent> tierTalents = talents.stream().filter(talent -> talent.getTier() == tier).collect(Collectors.toList());
            return Mono.just(tierTalents);
        }).doOnNext(tierTalents -> logger.debug("Fetched talents for tier {}: {}", tier, tierTalents));
    }
}
