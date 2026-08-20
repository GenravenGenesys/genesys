package com.github.genraven.genesys.service;

import com.github.genraven.genesys.configuration.EncounterStateCache;
import com.github.genraven.genesys.configuration.GenesysTemplateCache;
import com.github.genraven.genesys.domain.actor.Characteristics;
import com.github.genraven.genesys.domain.actor.DerivedStats;
import com.github.genraven.genesys.domain.campaign.encounter.*;
import com.github.genraven.genesys.domain.campaign.encounter.RollEvaluationResponse.SpendOption;
import com.github.genraven.genesys.domain.common.GenesysSymbolResults;
import com.github.genraven.genesys.domain.enums.CharacteristicType;
import com.github.genraven.genesys.domain.enums.ResultType;
import com.github.genraven.genesys.domain.quality.EquipmentQuality;
import com.github.genraven.genesys.domain.skill.RankedSkill;
import com.github.genraven.genesys.util.DiceRollerUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class DicePoolService {

    private final EncounterStateCache encounterStateCache;
    private final CalculationService calculationService;

    // ── Public endpoints ─────────────────────────────────────────────────────

    /**
     * Executes a melee attack roll.
     * Uses target's {@code melee} defense to upgrade difficulty dice.
     */
    public Mono<RollEvaluationResponse> executeMeleeAttack(CombatRollRequest request) {
        return executeRoll(request, true);
    }

    /**
     * Executes a ranged attack roll.
     * Uses target's {@code ranged} defense to upgrade difficulty dice.
     */
    public Mono<RollEvaluationResponse> executeCombatRoll(CombatRollRequest request) {
        return executeRoll(request, false);
    }

    /**
     * Executes an initiative roll for a single participant.
     * Initiative is an unopposed roll — no difficulty or challenge dice are added.
     * The skill must be present on the participant's skill list.
     */
    public Mono<InitiativeSlot> executeInitiativeRoll(InitiativeRollRequest request) {
        Participant participant = encounterStateCache.getParticipant(request.getParticipantId())
                .orElseThrow(() -> new IllegalStateException(
                        "Participant not found in encounter: " + request.getParticipantId()));

        // Find the requested initiative skill
        RankedSkill initiativeSkill = participant.getSkills().stream()
                .filter(s -> s.getName().equalsIgnoreCase(request.getInitiativeSkillName()))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException(
                        "Skill '" + request.getInitiativeSkillName() + "' not found on participant: "
                                + participant.getName()));

        int skillRank = initiativeSkill.getRanks();
        int characteristicValue = getCharacteristicValue(
                participant.getCharacteristics(), initiativeSkill.getCharacteristic());

        // Upgrade ability → proficiency up to skill rank
        int proficiency = Math.min(skillRank, characteristicValue);
        int ability = characteristicValue - proficiency;

        log.info("Initiative pool for [{}] using [{}]: prof={} ability={} boost={} setback={}",
                participant.getName(), initiativeSkill.getName(),
                proficiency, ability, request.getBoostDice(), request.getSetbackDice());

        // Initiative has no set difficulty — roll unopposed
        GenesysSymbolResults symbols = DiceRollerUtil.rollPool(
                proficiency, ability, 0, 0,
                request.getBoostDice(), request.getSetbackDice());

        log.info("Initiative result for [{}]: S={} A={} T={} F={} Th={} D={}",
                participant.getName(),
                symbols.getSuccess(), symbols.getAdvantage(), symbols.getTriumph(),
                symbols.getFailure(), symbols.getThreat(), symbols.getDespair());

        InitiativeSlot.Type slotType = participant.getType() == Participant.Type.PC
                ? InitiativeSlot.Type.PLAYER
                : InitiativeSlot.Type.NPC;

        return Mono.just(InitiativeSlot.builder()
                .rolledBy(participant.getName())
                .type(slotType)
                .results(symbols)
                .build());
    }

    // ── Core roll logic ──────────────────────────────────────────────────────

    private Mono<RollEvaluationResponse> executeRoll(CombatRollRequest request, boolean melee) {
        Participant attacker = encounterStateCache.getParticipant(request.getAttackerId())
                .orElseThrow(() -> new IllegalStateException(
                        "Attacker not found in encounter: " + request.getAttackerId()));

        Participant target = encounterStateCache.getParticipant(request.getTargetEnemyInstanceId())
                .orElseThrow(() -> new IllegalStateException(
                        "Target not found in encounter: " + request.getTargetEnemyInstanceId()));

        // ── Find the weapon ────────────────────────────────────────────────
        Weapon weapon = findEquippedWeapon(attacker, request.getWeaponInstanceId());

        // ── Build dice pool ────────────────────────────────────────────────
        DicePool pool = buildPool(attacker, weapon, target, melee,
                request.getSituationalBoostDice(), request.getEnvironmentalSetbackDice());

        log.info("Pool for [{}] vs [{}]: prof={} ability={} diff={} chal={} boost={} setback={}",
                attacker.getName(), target.getName(),
                pool.proficiency, pool.ability, pool.difficulty, pool.challenge,
                pool.boost, pool.setback);

        // ── Roll ───────────────────────────────────────────────────────────
        GenesysSymbolResults symbols = DiceRollerUtil.rollPool(
                pool.proficiency, pool.ability, pool.challenge, pool.difficulty,
                pool.boost, pool.setback);

        log.info("Roll result: S={} A={} T={} F={} Th={} D={}",
                symbols.getSuccess(), symbols.getAdvantage(), symbols.getTriumph(),
                symbols.getFailure(), symbols.getThreat(), symbols.getDespair());

        // ── Compute hit and base wounds ────────────────────────────────────
        int netSuccess = symbols.getSuccess() - symbols.getFailure();
        boolean hit = netSuccess >= 1;
        int baseWounds = 0;

        if (hit) {
            int brawnBonus = weapon.isBrawn()
                    ? getCharacteristicValue(attacker.getCharacteristics(), CharacteristicType.BRAWN) : 0;
            int rawDamage = weapon.getDamage() + brawnBonus + netSuccess;
            int targetSoak = target.getDerivedStats().getSoak().getCurrent();
            baseWounds = Math.max(1, rawDamage - targetSoak);
        }

        // ── Spend options ──────────────────────────────────────────────────
        List<SpendOption> options = buildSpendOptions(symbols, weapon, hit);

        // ── Store pending state ────────────────────────────────────────────
        int viciousRating = weapon.getQualities().stream()
                .filter(q -> "Vicious".equalsIgnoreCase(q.getName()))
                .mapToInt(EquipmentQuality::getRanks)
                .sum();

        String rollSessionId = UUID.randomUUID().toString();
        PendingRollState pending = PendingRollState.builder()
                .rollSessionId(rollSessionId)
                .attackerId(attacker.getId())
                .targetId(target.getId())
                .symbolResults(symbols)
                .baseWoundsInflicted(baseWounds)
                .hit(hit)
                .availableSpendOptions(options)
                .viciousRating(viciousRating)
                .weaponUsed(weapon)
                .build();

        encounterStateCache.storePendingRoll(pending);

        // ── Build response ─────────────────────────────────────────────────
        return Mono.just(RollEvaluationResponse.builder()
                .rollSessionId(rollSessionId)
                .results(symbols)
                .finalWoundsInflicted(baseWounds)
                .spendOptions(options)
                .build());
    }

    // ── Dice pool construction ────────────────────────────────────────────────

    private DicePool buildPool(Participant attacker, Weapon weapon, Participant target,
                                boolean melee, int boostBonus, int setbackPenalty) {
        // Match weapon skill to attacker's skill list by name
        int skillRank = 0;
        CharacteristicType characteristicType = CharacteristicType.BRAWN;

        if (weapon.getSkill() != null) {
            for (RankedSkill rs : attacker.getSkills()) {
                if (rs.getName().equalsIgnoreCase(weapon.getSkill().getName())) {
                    skillRank = rs.getRanks();
                    characteristicType = rs.getCharacteristic();
                    break;
                }
            }
        }

        int characteristicValue = getCharacteristicValue(attacker.getCharacteristics(), characteristicType);

        // Upgrade ability dice to proficiency based on skill rank
        int proficiency = Math.min(skillRank, characteristicValue);
        int ability = characteristicValue - proficiency;

        // Base difficulty: 2 purple (Average difficulty)
        int baseDifficulty = 2;

        // Target defense upgrades difficulty dice → challenge dice
        DerivedStats targetStats = target.getDerivedStats();
        int defenseRating = melee
                ? targetStats.getMelee().getCurrent()
                : targetStats.getRanged().getCurrent();

        int challenge = Math.min(defenseRating, baseDifficulty);
        int difficulty = baseDifficulty - challenge;

        return new DicePool(proficiency, ability, challenge, difficulty,
                boostBonus, setbackPenalty);
    }

    // ── Spend option generation ───────────────────────────────────────────────

    private List<SpendOption> buildSpendOptions(GenesysSymbolResults symbols, Weapon weapon, boolean hit) {
        List<SpendOption> options = new ArrayList<>();

        int netAdvantage = symbols.getAdvantage() - symbols.getThreat();
        int netThreat    = symbols.getThreat() - symbols.getAdvantage();
        int triumphs     = symbols.getTriumph();
        int despairs     = symbols.getDespair();

        // ── ADVANTAGE options ──────────────────────────────────────────────
        if (netAdvantage >= 1) {
            options.add(new SpendOption("Recover 1 Strain", ResultType.ADVANTAGE, 1, true));
        }
        if (netAdvantage >= 2) {
            options.add(new SpendOption("Pass Boost Die to Next Ally", ResultType.ADVANTAGE, 2, false));
        }
        if (netAdvantage >= 3) {
            options.add(new SpendOption("Add Setback Die to Target's Next Roll", ResultType.ADVANTAGE, 3, false));
        }

        // Weapon quality: Blast — spend 2 advantages to activate area damage
        boolean hasBlast = weapon.getQualities().stream()
                .anyMatch(q -> "Blast".equalsIgnoreCase(q.getName()));
        if (hasBlast && netAdvantage >= 2) {
            options.add(new SpendOption("Activate Blast", ResultType.ADVANTAGE, 2, false));
        }

        // Critical Injury — needs advantages equal to weapon's critical rating
        if (hit && netAdvantage >= weapon.getCritical()) {
            options.add(new SpendOption("Activate Critical Injury", ResultType.ADVANTAGE, weapon.getCritical(), false));
        }

        // ── TRIUMPH options ────────────────────────────────────────────────
        if (triumphs >= 1) {
            options.add(new SpendOption("Activate Critical Injury (Triumph)", ResultType.TRIUMPH, 1, false));
            options.add(new SpendOption("Upgrade Next Ally's Ability Die",    ResultType.TRIUMPH, 1, false));
        }

        // ── THREAT options (applied against the attacker) ─────────────────
        if (netThreat >= 1) {
            options.add(new SpendOption("Attacker Suffers 1 Strain", ResultType.THREAT, 1, true));
        }
        if (netThreat >= 2) {
            options.add(new SpendOption("Target Gains Boost Die on Next Roll", ResultType.THREAT, 2, false));
        }

        // ── DESPAIR options ────────────────────────────────────────────────
        if (despairs >= 1) {
            options.add(new SpendOption("Attacker Suffers Critical Injury (Despair)", ResultType.DESPAIR, 1, false));
        }

        return options;
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private Weapon findEquippedWeapon(Participant attacker, String weaponId) {
        if (attacker.getEquipment() == null || attacker.getEquipment().getEquippedWeapons() == null) {
            throw new IllegalStateException("Attacker [" + attacker.getName() + "] has no equipped weapons.");
        }
        return attacker.getEquipment().getEquippedWeapons().stream()
                .filter(w -> w.getId().equals(weaponId))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException(
                        "Weapon id=" + weaponId + " not found on attacker " + attacker.getName()));
    }

    private int getCharacteristicValue(Characteristics chars, CharacteristicType type) {
        return switch (type) {
            case BRAWN     -> chars.getBrawn().getCurrent();
            case AGILITY   -> chars.getAgility().getCurrent();
            case INTELLECT -> chars.getIntellect().getCurrent();
            case CUNNING   -> chars.getCunning().getCurrent();
            case WILLPOWER -> chars.getWillpower().getCurrent();
            case PRESENCE  -> chars.getPresence().getCurrent();
        };
    }

    /** Simple value object for dice pool composition. */
    private record DicePool(int proficiency, int ability, int challenge,
                            int difficulty, int boost, int setback) {}
}
