package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.configuration.EncounterStateCache;
import com.github.genraven.genesys.domain.campaign.encounter.*;
import com.github.genraven.genesys.domain.campaign.encounter.InitiativeRollRequest;
import com.github.genraven.genesys.domain.campaign.encounter.InitiativeSlot;
import com.github.genraven.genesys.service.CombatResolutionService;
import com.github.genraven.genesys.service.DicePoolService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dice")
@Tag(name = "Dice", description = "Handles Dice Rolls and Combat Resolution")
@RequiredArgsConstructor
public class DiceRollController {

    private final DicePoolService dicePoolService;
    private final CombatResolutionService combatResolutionService;
    private final EncounterStateCache encounterStateCache;

    // ── Encounter lifecycle ──────────────────────────────────────────────────

    @PostMapping("/encounter/start")
    @Operation(
        summary = "Start an encounter",
        description = "Registers all participants in the server-side encounter state cache. " +
                      "Must be called before any dice rolls can be executed."
    )
    public Mono<ResponseEntity<Map<String, String>>> startEncounter(
            @RequestBody List<Participant> participants) {
        encounterStateCache.registerParticipants(participants);
        return Mono.just(ResponseEntity.ok(
                Map.of("status", "Encounter started", "participants", String.valueOf(participants.size()))));
    }

    @PostMapping("/encounter/end")
    @Operation(
        summary = "End an encounter",
        description = "Clears all live participant state and pending roll snapshots from the cache."
    )
    public Mono<ResponseEntity<Map<String, String>>> endEncounter() {
        encounterStateCache.clearEncounter();
        return Mono.just(ResponseEntity.ok(Map.of("status", "Encounter ended")));
    }

    // ── Dice rolls ───────────────────────────────────────────────────────────

    @PostMapping("/initiative")
    @Operation(
        summary = "Roll initiative for a participant",
        description = "Builds an unopposed dice pool from the participant's chosen initiative skill " +
                      "(e.g. Cool or Vigilance) and its linked characteristic. " +
                      "Returns an InitiativeSlot containing the raw symbol results and the participant's " +
                      "name and type (Player/NPC) so the UI can sort and build the initiative order."
    )
    public Mono<ResponseEntity<InitiativeSlot>> rollInitiative(
            @RequestBody InitiativeRollRequest request) {
        return dicePoolService.executeInitiativeRoll(request)
                .map(ResponseEntity::ok);
    }

    @PostMapping("/combat/melee")
    @Operation(
        summary = "Execute a melee attack roll",
        description = "Builds the dice pool from attacker/target Participants held server-side, " +
                      "rolls it, and returns symbols plus spend options. " +
                      "A rollSessionId is stored server-side for the resolve step."
    )
    public Mono<ResponseEntity<RollEvaluationResponse>> executeMeleeAttack(
            @RequestBody CombatRollRequest request) {
        return dicePoolService.executeMeleeAttack(request)
                .map(ResponseEntity::ok);
    }

    @PostMapping("/combat/ranged")
    @Operation(
        summary = "Execute a ranged attack roll",
        description = "Same as melee but uses the target's ranged defense for difficulty upgrades."
    )
    public Mono<ResponseEntity<RollEvaluationResponse>> executeRangedAttack(
            @RequestBody CombatRollRequest request) {
        return dicePoolService.executeCombatRoll(request)
                .map(ResponseEntity::ok);
    }

    // ── Resolve ───────────────────────────────────────────────────────────────

    @PostMapping("/resolve")
    @Operation(
        summary = "Resolve player's symbol spends",
        description = "The UI sends back a rollSessionId and the player's chosen spends " +
                      "(advantages, triumphs, threats, despairs). " +
                      "The backend looks up the stored PendingRollState, applies wounds/strain/critical " +
                      "injuries to live Participants in the cache, and returns a CombatLogEntry narrative."
    )
    public Mono<ResponseEntity<CombatLogEntry>> resolveChoices(
            @RequestBody ResolveChoicesRequest request) {
        return combatResolutionService.executeCommit(request)
                .map(ResponseEntity::ok);
    }
}
