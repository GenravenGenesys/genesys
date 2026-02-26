package com.github.genraven.genesys.domain.modifier;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class Modifier {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Type type;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int ranks;

    @AllArgsConstructor
    @Getter
    public enum Type {
        DEFAULT("Default"),
        //Critical Injury
        DECREASE_CRITICAL_INJURY("Decrease Critical Injury"),
        INCREASE_CRITICAL_INJURY("Increase Critical Injury"),
        RESET_CRITICAL_INJURY("Reset Critical Injury"),
        //Strain
        SUFFER_STRAIN("Suffer Strain"),
        DEAL_STRAIN_DAMAGE("Deal Strain Damage"),
        //Defense
        INCREASE_MELEE_DEFENSE("Increase Melee Defense"),
        INCREASE_RANGED_DEFENSE("Increase Ranged Defense"),
        //Soak
        INCREASE_SOAK("Increase Soak"),
        IGNORE_SOAK("Ignore Soak"),
        // Recharge
        RECHARGE("Recharge");

        @JsonValue
        private final String label;
    }
}
