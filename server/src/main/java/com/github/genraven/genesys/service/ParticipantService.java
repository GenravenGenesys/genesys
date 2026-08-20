package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.actor.player.PlayerCharacter;
import com.github.genraven.genesys.domain.campaign.encounter.Participant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final AdversaryService adversaryService;

    public Mono<Participant> convertPlayerCharacterToParticipant(final PlayerCharacter playerCharacter) {
        return Mono.just(Participant.builder()
            .id(playerCharacter.getId())
            .name(playerCharacter.getName())
            .type(Participant.Type.PC)
            .characteristics(playerCharacter.getCharacteristics())
            .derivedStats(playerCharacter.getDerivedStats())
            .skills(playerCharacter.getSkills())
            .build());
    }

    public Mono<Participant> convertAdversaryTemplateToParticipant(final String campaignId, final String adversaryId) {
        return adversaryService.findAdversaryById(campaignId, adversaryId)
            .map(template -> Participant.builder()
                .id(template.getId())
                .name(template.getName())
                .type(Participant.Type.NPC)
                .characteristics(template.getCharacteristics())
                .derivedStats(template.getDerivedStats())
                .skills(template.getSkills())
                .build());
    }
}




