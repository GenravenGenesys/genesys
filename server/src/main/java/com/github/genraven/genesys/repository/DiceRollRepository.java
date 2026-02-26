package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.domain.campaign.encounter.dice.DiceRoll;
import com.github.genraven.genesys.domain.campaign.encounter.dice.DiceRollType;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface DiceRollRepository extends ReactiveMongoRepository<DiceRoll, String> {

    Flux<DiceRoll> findByEncounterIdOrderByCreatedAtDesc(String encounterId);

    Flux<DiceRoll> findByEncounterIdAndRoundOrderByCreatedAtDesc(String encounterId, int round);

    Flux<DiceRoll> findByEncounterIdAndParticipantIdOrderByCreatedAtDesc(String encounterId, String participantId);

    Flux<DiceRoll> findByEncounterIdAndRollTypeOrderByCreatedAtDesc(String encounterId, DiceRollType rollType);

    Flux<DiceRoll> findByParticipantIdOrderByCreatedAtDesc(String participantId);
}