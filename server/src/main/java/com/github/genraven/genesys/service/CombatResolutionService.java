package com.github.genraven.genesys.service;

import com.github.genraven.genesys.configuration.EncounterStateCache;
import com.github.genraven.genesys.domain.actor.Threshold;
import com.github.genraven.genesys.domain.campaign.encounter.*;
import com.github.genraven.genesys.domain.campaign.encounter.ResolveChoicesRequest.SelectedChoice;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class CombatResolutionService {

    private final EncounterStateCache encounterStateCache;
    private static final Random RNG = new Random();

    /**
     * Resolves a player's spend choices against the server-side pending roll state.
     *
     * <ol>
     *   <li>Fetches (and removes) the {@link PendingRollState} from the cache.</li>
     *   <li>Applies base wound damage to the target.</li>
     *   <li>Processes each {@link SelectedChoice} the player made.</li>
     *   <li>Writes the mutated participants back into the cache.</li>
     *   <li>Returns a narrated {@link CombatLogEntry}.</li>
     * </ol>
     */
    public Mono<CombatLogEntry> executeCommit(ResolveChoicesRequest request) {
        // ── Retrieve server-side roll state ───────────────────────────────
        PendingRollState pending = encounterStateCache
                .consumePendingRoll(request.getRollSessionId())
                .orElseThrow(() -> new IllegalStateException(
                        "No pending roll found for session: " + request.getRollSessionId()));

        Participant attacker = encounterStateCache.getParticipant(pending.getAttackerId())
                .orElseThrow(() -> new IllegalStateException(
                        "Attacker not found: " + pending.getAttackerId()));

        Participant target = encounterStateCache.getParticipant(pending.getTargetId())
                .orElseThrow(() -> new IllegalStateException(
                        "Target not found: " + pending.getTargetId()));

        CombatLogEntry log = CombatLogEntry.create();
        log.setRollSessionId(request.getRollSessionId());

        // ── Apply base wounds ─────────────────────────────────────────────
        if (pending.isHit()) {
            applyWounds(target, pending.getBaseWoundsInflicted(), log);
        } else {
            log.addNarrativeLine(attacker.getName() + "'s attack missed.");
        }

        // ── Process each player-chosen spend ─────────────────────────────
        if (request.getSelectedChoices() != null) {
            for (SelectedChoice choice : request.getSelectedChoices()) {
                processChoice(choice, attacker, target, pending, log);
            }
        }

        // ── Persist mutated state ─────────────────────────────────────────
        encounterStateCache.updateParticipant(attacker);
        encounterStateCache.updateParticipant(target);

        // ── Final summary ─────────────────────────────────────────────────
        String summary = String.format(
                "%s attacked %s — %s. Final wounds on target: %d/%d.",
                attacker.getName(), target.getName(),
                pending.isHit() ? "HIT" : "MISS",
                target.getDerivedStats().getWoundThreshold().getCurrent(),
                target.getDerivedStats().getWoundThreshold().getTotal());
        log.setFinalSummary(summary);

        return Mono.just(log);
    }

    // ── Spend dispatch ────────────────────────────────────────────────────────

    private void processChoice(SelectedChoice choice, Participant attacker,
                                Participant target, PendingRollState pending,
                                CombatLogEntry log) {
        switch (choice.getName()) {
            case "Recover 1 Strain" -> {
                int recovered = choice.getCount();
                recoverStrain(attacker, recovered, log);
            }
            case "Pass Boost Die to Next Ally" ->
                log.addNarrativeLine(attacker.getName() + " passes a Boost die to the next ally.");

            case "Add Setback Die to Target's Next Roll" ->
                log.addNarrativeLine(target.getName() + " gains a Setback die on their next roll.");

            case "Activate Blast" -> {
                int blastDmg = pending.getWeaponUsed().getDamage();
                log.addNarrativeLine("Blast activated! Adjacent targets take " + blastDmg + " damage.");
            }

            case "Activate Critical Injury", "Activate Critical Injury (Triumph)" -> {
                for (int i = 0; i < choice.getCount(); i++) {
                    int roll = RNG.nextInt(100) + 1 + (pending.getViciousRating() * 10);
                    roll = Math.min(roll, 150); // cap per core rules
                    log.addNarrativeLine("Critical Injury triggered! Rolled " + roll + " on the Critical Injury table.");
                }
            }

            case "Upgrade Next Ally's Ability Die" ->
                log.addNarrativeLine("An ally's next Ability die is upgraded to a Proficiency die.");

            case "Attacker Suffers 1 Strain" -> {
                int amount = choice.getCount();
                applyStrain(attacker, amount, log);
            }

            case "Target Gains Boost Die on Next Roll" ->
                log.addNarrativeLine(target.getName() + " gains a Boost die on their next roll.");

            case "Attacker Suffers Critical Injury (Despair)" -> {
                int roll = RNG.nextInt(100) + 1;
                log.addNarrativeLine(attacker.getName() + " suffers a Critical Injury from Despair! Rolled " + roll + ".");
            }

            default ->
                log.addNarrativeLine("Unknown spend choice ignored: " + choice.getName());
        }
    }

    // ── Wound / Strain helpers ────────────────────────────────────────────────

    private void applyWounds(Participant participant, int amount, CombatLogEntry log) {
        Threshold wounds = participant.getDerivedStats().getWoundThreshold();
        int newCurrent = wounds.getCurrent() + amount;
        wounds.setCurrent(newCurrent);
        log.addNarrativeLine(participant.getName() + " takes " + amount + " wounds ("
                + newCurrent + "/" + wounds.getTotal() + ").");
        if (newCurrent >= wounds.getTotal()) {
            log.addNarrativeLine(participant.getName() + " is incapacitated!");
        }
    }

    private void applyStrain(Participant participant, int amount, CombatLogEntry log) {
        Threshold strain = participant.getDerivedStats().getStrainThreshold();
        int newCurrent = strain.getCurrent() + amount;
        strain.setCurrent(newCurrent);
        log.addNarrativeLine(participant.getName() + " suffers " + amount + " strain ("
                + newCurrent + "/" + strain.getTotal() + ").");
        if (newCurrent >= strain.getTotal()) {
            log.addNarrativeLine(participant.getName() + " is overwhelmed by strain!");
        }
    }

    private void recoverStrain(Participant participant, int amount, CombatLogEntry log) {
        Threshold strain = participant.getDerivedStats().getStrainThreshold();
        int newCurrent = Math.max(0, strain.getCurrent() - amount);
        strain.setCurrent(newCurrent);
        log.addNarrativeLine(participant.getName() + " recovers " + amount + " strain ("
                + newCurrent + "/" + strain.getTotal() + ").");
    }
}
