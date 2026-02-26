package com.github.genraven.genesys.domain.campaign.encounter.dice;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class DicePool {

    @Min(0)
    @Schema(description = "Number of ability dice in the pool", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
    private int ability = 0;

    @Min(0)
    @Schema(description = "Number of proficiency dice in the pool", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
    private int proficiency = 0;

    @Min(0)
    @Schema(description = "Number of difficulty dice in the pool", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
    private int difficulty = 0;

    @Min(0)
    @Schema(description = "Number of challenge dice in the pool", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
    private int challenge = 0;

    @Min(0)
    @Schema(description = "Number of boost dice in the pool", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
    private int boost = 0;

    @Min(0)
    @Schema(description = "Number of setback dice in the pool", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
    private int setback = 0;
}
