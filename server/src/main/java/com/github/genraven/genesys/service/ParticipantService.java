package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.actor.adversary.AdversarySkill;
import com.github.genraven.genesys.domain.actor.adversary.AdversaryTemplate;
import com.github.genraven.genesys.domain.actor.player.PlayerCharacter;
import com.github.genraven.genesys.domain.actor.player.PlayerSkill;
import com.github.genraven.genesys.domain.campaign.encounter.Participant;
import com.github.genraven.genesys.domain.skill.Skill;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final AdversaryService adversaryService;

    public Mono<Participant> convertPlayerCharacterToParticipant(final PlayerCharacter playerCharacter) {
        final List<Skill> skills = Optional.ofNullable(playerCharacter.getSkills())
                .orElse(List.of())
                .stream()
                .map(this::mapPlayerSkillToSkill)
                .collect(Collectors.toList());

        final Participant participant = Participant.builder()
                .id(playerCharacter.getId())
                .name(playerCharacter.getName())
                .type(Participant.Type.PC)
                .characteristics(playerCharacter.getCharacteristics())
                .derivedStats(playerCharacter.getDerivedStats())
                .skills(skills)
                .build();

        return Mono.just(participant);
    }

    public Mono<Participant> convertAdversaryTemplateToParticipant(final String campaignId, final String adversaryId) {
        return adversaryService.findAdversaryById(campaignId, adversaryId)
                .map(template -> {
                    final List<Skill> skills = Optional.ofNullable(template.getSkills())
                            .orElse(List.of())
                            .stream()
                            .map(this::mapAdversarySkillToSkill)
                            .collect(Collectors.toList());

                    return Participant.builder()
                            .id(template.getId())
                            .name(template.getName())
                            .type(Participant.Type.NPC)
                            .characteristics(template.getCharacteristics())
                            .derivedStats(template.getDerivedStats())
                            .skills(skills)
                            .build();
                });
    }

    private Skill mapAdversarySkillToSkill(final AdversarySkill adversarySkill) {
        return Skill.builder()
                .id(adversarySkill.getId())
                .name(adversarySkill.getName())
                .characteristic(adversarySkill.getCharacteristic())
                .type(adversarySkill.getType())
                .initiative(adversarySkill.isInitiative())
                .build();
    }

    private Skill mapPlayerSkillToSkill(final PlayerSkill playerSkill) {
        return Skill.builder()
                .id(playerSkill.getId())
                .name(playerSkill.getName())
                .characteristic(playerSkill.getCharacteristic())
                .type(playerSkill.getType())
                .initiative(playerSkill.getInitiative())
                .summary(playerSkill.getSummary())
                .description(playerSkill.getDescription())
                .build();
    }
}




