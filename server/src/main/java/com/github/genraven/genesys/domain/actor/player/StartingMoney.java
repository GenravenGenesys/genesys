package com.github.genraven.genesys.domain.actor.player;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Starting currency awarded to a player character of this career")
public class StartingMoney {

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
        description = "Fixed base amount of currency awarded (e.g. 200)")
    private int base;

    @NotEmpty
    @Schema(description = "Optional dice expression added on top of the base amount (e.g. \"1d100\")")
    private String diceExpression;
}

