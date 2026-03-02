package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.skill.Skill;
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
public class SkillService {

    private final ReactiveMongoTemplate reactiveMongoTemplate;

    public Flux<Skill> findAllByCampaignId(final String campaignId) {
        return reactiveMongoTemplate.findById(campaignId, Campaign.class)
            .flatMapMany(campaign -> Flux.fromIterable(campaign.getCompendium().getSkills()));
    }

    public Mono<Skill> addSkill(final String campaignId, final Skill skill) {
        skill.setId(UUID.randomUUID().toString());

        Query query = new Query(Criteria.where("id").is(campaignId));
        Update update = new Update().push("compendium.skills", skill);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(skill);
    }

    public Mono<Skill> updateSkill(final String campaignId, final String skillId, final Skill updatedSkill) {
        Query query = new Query(Criteria.where("id").is(campaignId).and("compendium.skills.id").is(skillId));

        Update update = new Update().set("compendium.skills.$", updatedSkill);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(updatedSkill);
    }
}
