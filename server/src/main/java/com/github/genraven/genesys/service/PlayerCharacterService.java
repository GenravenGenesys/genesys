package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.actor.player.PlayerCharacter;
import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.validator.PlayerCharacterValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlayerCharacterService {

    private final ReactiveMongoTemplate reactiveMongoTemplate;
    private final PlayerCharacterValidator playerCharacterValidator;

    public Mono<PlayerCharacter> validatePlayerCharacter(final PlayerCharacter character) {
        return playerCharacterValidator.validate(character);
    }

    public Mono<PlayerCharacter> findById(final String campaignId, final String playerId) {
        return reactiveMongoTemplate.findById(campaignId, Campaign.class)
                .flatMap(campaign -> Mono.justOrEmpty(campaign.getParty().getPlayers().stream()
                        .filter(player -> player.getId().equals(playerId))
                        .findFirst()));
    }

    public Mono<PlayerCharacter> createPlayerCharacter(final String campaignId, final PlayerCharacter character) {
        character.setId(UUID.randomUUID().toString());

        Query query = new Query(Criteria.where("id").is(campaignId));
        Update update = new Update().push("party.players", character);

        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class).thenReturn(character);
    }
}
