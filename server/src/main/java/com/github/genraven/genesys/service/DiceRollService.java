package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.campaign.encounter.dice.*;
import com.github.genraven.genesys.repository.DiceRollRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class DiceRollService {

    private final DiceRollRepository diceRollRepository;

    // SecureRandom is thread-safe and cryptographically strong
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    // ── Public API ────────────────────────────────────────────────────────────

    public Mono<DiceRoll> rollDice(final DiceRollRequest request) {
        log.debug("Rolling dice for participant: {} in encounter: {}", request.getParticipantId(), request.getEncounterId());

        final var rawResults = rollAllDice(request.getDicePool());
        final var totals = calculateTotals(rawResults);
        final var netResult = calculateNetResult(totals);

        final var roll = new DiceRoll();
        roll.setEncounterId(request.getEncounterId());
        roll.setParticipantId(request.getParticipantId());
        roll.setParticipantName(request.getParticipantName());
        roll.setSlotId(request.getSlotId());
        roll.setRound(request.getRound());
        roll.setRollType(request.getRollType());
        roll.setDicePool(request.getDicePool());
        roll.setRawResults(rawResults);
        roll.setTotals(totals);
        roll.setNetResult(netResult);
        roll.setSkillUsed(request.getSkillUsed());
        roll.setActionId(request.getActionId());
        roll.setNotes(request.getNotes());

        return diceRollRepository.save(roll)
            .doOnNext(saved -> log.debug("Saved dice roll: {}", saved.getId()));
    }

    public Flux<DiceRoll> getRollsByEncounter(final String encounterId) {
        return diceRollRepository.findByEncounterIdOrderByCreatedAtDesc(encounterId);
    }

    public Flux<DiceRoll> getRollsByEncounterAndRound(final String encounterId, final int round) {
        return diceRollRepository.findByEncounterIdAndRoundOrderByCreatedAtDesc(encounterId, round);
    }

    public Flux<DiceRoll> getRollsByEncounterAndParticipant(final String encounterId, final String participantId) {
        return diceRollRepository.findByEncounterIdAndParticipantIdOrderByCreatedAtDesc(encounterId, participantId);
    }

    public Flux<DiceRoll> getInitiativeRolls(final String encounterId) {
        return diceRollRepository.findByEncounterIdAndRollTypeOrderByCreatedAtDesc(encounterId, DiceRollType.INITIATIVE);
    }

    public Mono<DiceRoll> getRoll(final String rollId) {
        return diceRollRepository.findById(rollId);
    }

    // ── Private Dice Engine ───────────────────────────────────────────────────

    private List<RawDieResult> rollAllDice(final DicePool pool) {
        final var results = new ArrayList<RawDieResult>();

        rollDieType("ability", pool.getAbility(), DieFaces.ABILITY, results);
        rollDieType("proficiency", pool.getProficiency(), DieFaces.PROFICIENCY, results);
        rollDieType("difficulty", pool.getDifficulty(), DieFaces.DIFFICULTY, results);
        rollDieType("challenge", pool.getChallenge(), DieFaces.CHALLENGE, results);
        rollDieType("boost", pool.getBoost(), DieFaces.BOOST, results);
        rollDieType("setback", pool.getSetback(), DieFaces.SETBACK, results);

        return results;
    }

    private void rollDieType(final String type,
                             final int count,
                             final List<List<DiceSymbol>> faces,
                             final List<RawDieResult> results) {
        IntStream.range(0, count).map(i -> SECURE_RANDOM.nextInt(faces.size()))
            .mapToObj(faceIndex -> new RawDieResult(type, faceIndex + 1, faces.get(faceIndex)))
            .forEach(results::add);
    }

    private RollTotals calculateTotals(final List<RawDieResult> rawResults) {
        final var totals = new RollTotals();

        rawResults.stream()
            .flatMap(r -> r.getSymbols().stream())
            .forEach(symbol -> {
                switch (symbol) {
                    case SUCCESS -> totals.setSuccess(totals.getSuccess() + 1);
                    case ADVANTAGE -> totals.setAdvantage(totals.getAdvantage() + 1);
                    case TRIUMPH -> totals.setTriumph(totals.getTriumph() + 1);
                    case FAILURE -> totals.setFailure(totals.getFailure() + 1);
                    case THREAT -> totals.setThreat(totals.getThreat() + 1);
                    case DESPAIR -> totals.setDespair(totals.getDespair() + 1);
                    default -> { /* BLANK - no action */ }
                }
            });

        return totals;
    }

    private NetResult calculateNetResult(final RollTotals totals) {
        final var net = new NetResult();

        // Triumph counts as success, Despair counts as failure
        final int netSuccess = (totals.getSuccess() + totals.getTriumph())
            - (totals.getFailure() + totals.getDespair());
        final int netAdvantage = totals.getAdvantage() - totals.getThreat();

        net.setNetSuccess(netSuccess);
        net.setNetAdvantage(netAdvantage);
        net.setSuccess(netSuccess > 0);
        net.setTriumph(totals.getTriumph() > 0);
        net.setDespair(totals.getDespair() > 0);

        return net;
    }
}