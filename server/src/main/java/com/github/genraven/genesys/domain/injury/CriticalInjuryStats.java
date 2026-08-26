package com.github.genraven.genesys.domain.injury;

import com.github.genraven.genesys.domain.modifier.DiceModifier;
import com.github.genraven.genesys.domain.modifier.ResultsModifier;
import com.github.genraven.genesys.domain.modifier.StatModifiers;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class CriticalInjuryStats {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private StatModifiers statModifiers;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private DiceModifier diceModifier;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private ResultsModifier resultsModifier;
}
