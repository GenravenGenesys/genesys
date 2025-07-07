package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.talent.Talent;
import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.repository.TalentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TalentService {

    private final TalentRepository talentRepository;
    private final CampaignService campaignService;

    public Flux<Talent> getAllTalents() {
        log.info("Fetching all talents");
        return talentRepository.findAll()
                .doOnNext(talent -> log.debug("Fetched talent: {}", talent.getName()));
    }

    public Mono<Talent> getTalent(final String id) {
        log.info("Fetching talent with id: {}", id);
        return talentRepository.findById(id)
                .doOnNext(talent -> log.debug("Fetched talent: {}", talent))
                .doOnError(error -> log.error("Error fetching talent with id: {}", id, error));
    }

    public Mono<Talent> createTalent(final String name) {
        log.info("Creating talent with name: {}", name);
        return talentRepository.save(new Talent(name))
                .doOnNext(talent -> log.debug("Created talent: {}", talent))
                .doOnError(error -> log.error("Error creating talent with name: {}", name, error));
    }

    public Mono<Talent> updateTalent(final String id, final Talent talent) {
        log.info("Updating talent with id: {}", id);
        return getTalent(id).map(tal -> {
            tal.setActivation(talent.getActivation());
            tal.setRanked(talent.isRanked());
            tal.setTier(talent.getTier());
            tal.setDescription(talent.getDescription());
            tal.setSummary(talent.getSummary());
            tal.setCost(talent.getCost());
            tal.setLimit(talent.getLimit());
            tal.setTalentSkills(talent.getTalentSkills());
            tal.setTalentStats(talent.getTalentStats());
            tal.setTalentSkillCheck(talent.getTalentSkillCheck());
            tal.setAction(talent.getAction());
            tal.setTalentRollModifiers(talent.getTalentRollModifiers());
            tal.setModifiers(talent.getModifiers());
            return tal;
        }).flatMap(talentRepository::save)
                .doOnNext(updatedTalent -> log.debug("Updated talent: {}", updatedTalent))
                .doOnError(error -> log.error("Error updating talent with id: {}", id, error));
    }

    public Mono<List<Talent>> getTalentsForCurrentCampaign() {
        log.info("Fetching talents for current campaign");
        return campaignService.getCurrentCampaign()
                .doOnNext(campaign -> log.debug("Found current campaign: {}", campaign))
                .flatMap(campaign -> Flux.fromIterable(campaign.getTalentIds())
                        .flatMap(talentRepository::findById)
                        .collectList())
                .doOnNext(talents -> log.debug("Fetched talents for current campaign: {}", talents))
                .doOnError(error -> log.error("Error fetching talents for current campaign", error));
    }

    public Mono<Campaign> addTalentToCurrentCampaign(final String talentId) {
        log.info("Adding talent with ID: {} to current campaign", talentId);
        return campaignService.getCurrentCampaign().flatMap(existingCampaign -> {
            existingCampaign.getTalentIds().add(talentId);
            return campaignService.updateCampaign(existingCampaign.getId(), existingCampaign);
        }).doOnNext(updatedCampaign -> log.debug("Added talent to current campaign: {}", updatedCampaign))
                .doOnError(error -> log.error("Error adding talent to current campaign", error));
    }

    public Mono<List<Talent>> getTalentsForCurrentCampaignByTier(final Talent.Tier tier) {
        log.info("Fetching talents for current campaign by tier: {}", tier);
        return getTalentsForCurrentCampaign().flatMap(talents -> {
            final List<Talent> tierTalents = talents.stream().filter(talent -> talent.getTier() == tier)
                    .collect(Collectors.toList());
            return Mono.just(tierTalents);
        }).doOnNext(tierTalents -> log.debug("Fetched talents for tier {}: {}", tier, tierTalents));
    }
}
