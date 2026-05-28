package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.domain.campaign.encounter.CombatLogEntry;
import com.github.genraven.genesys.domain.campaign.encounter.CombatRollRequest;
import com.github.genraven.genesys.domain.campaign.encounter.ResolveChoicesRequest;
import com.github.genraven.genesys.domain.campaign.encounter.RollEvaluationResponse;
import com.github.genraven.genesys.service.DicePoolService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/dice")
@Tag(name = "Dice", description = "Handles Dice Rolls")
@RequiredArgsConstructor
public class DiceRollController {

    @Autowired
    private DicePoolService dicePoolService;

    @PostMapping("/combat/melee")
    public Mono<ResponseEntity<RollEvaluationResponse>> executeMeleeAttack(@RequestBody CombatRollRequest request) {
        return dicePoolService.executeCombatRoll(request)
            .map(ResponseEntity::ok);
    }

    @PostMapping("/combat/ranged")
    public Mono<ResponseEntity<RollEvaluationResponse>> executeRangedAttack(@RequestBody CombatRollRequest request) {
        return dicePoolService.executeCombatRoll(request)
            .map(ResponseEntity::ok);
    }

    @PostMapping("/resolve")
    public Mono<ResponseEntity<CombatLogEntry>> addCombatLog(@RequestBody ResolveChoicesRequest request) {
        return dicePoolService.executeCombatRoll(request)
            .map(ResponseEntity::ok);
    }
}
