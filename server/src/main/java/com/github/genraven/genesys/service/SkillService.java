package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.repository.CampaignRepository;
import com.github.genraven.genesys.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {
    
    private final SkillRepository skillRepository;
    private final CampaignRepository campaignRepository;

    public Flux<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public Mono<Skill> getSkill(final String name) {
        return skillRepository.findById(name);
    }

    public Mono<Skill> createSkill(final String name) {
        return skillRepository.save(new Skill(name));
    }

    public Mono<Skill> updateSkill(final String name, final Skill skill) {
        return getSkill(name).map(sk -> {
            sk.setCharacteristic(skill.getCharacteristic());
            sk.setType(skill.getType());
            return sk;
        }).flatMap(skillRepository::save);
    }

    public Mono<List<Skill>> getSkillsForCurrentCampaign() {
        return campaignRepository.findByCurrent(true)
                .flatMap(campaign -> Flux.fromIterable(campaign.getSkillIds())
                        .flatMap(skillRepository::findById)
                        .collectList());
    }

    public Mono<Campaign> addSkillToCurrentCampaign(final String skillId) {
        return campaignRepository.findByCurrent(true).flatMap(existingCampaign -> {
            existingCampaign.getSkillIds().add(skillId);
            return campaignRepository.save(existingCampaign);
        });
    }
}
