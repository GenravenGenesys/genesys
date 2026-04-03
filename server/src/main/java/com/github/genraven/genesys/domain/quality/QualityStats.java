package com.github.genraven.genesys.domain.quality;

import com.github.genraven.genesys.domain.modifier.DiceModifier;
import com.github.genraven.genesys.domain.modifier.ResultsModifier;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class QualityStats {

    // Combat Effects
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int criticalInjury = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int ignoreSoak = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int damageOverTime = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int areaDamage = 0;

    // Defense Effects
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int soak = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int meleeDefense = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int rangedDefense = 0;

    // Special flags
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private boolean ensnare = false;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private boolean stun = false;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private DiceModifier  diceModifier;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private ResultsModifier resultsModifier;

    // Narrative
    private String description = "";
}
