package com.github.genraven.genesys.domain.campaign.encounter;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CombatRollRequest {

    @NotEmpty
    private String attackerId;

    @NotEmpty
    private String weaponInstanceId;

    @NotEmpty
    private String targetEnemyInstanceId;

    private int environmentalSetbackDice;

    private int situationalBoostDice;
}
