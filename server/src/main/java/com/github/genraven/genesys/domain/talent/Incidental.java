package com.github.genraven.genesys.domain.talent;

import com.github.genraven.genesys.domain.modifier.DiceModifier;
import com.github.genraven.genesys.domain.modifier.HealEffect;
import com.github.genraven.genesys.domain.modifier.ResultsModifier;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Incidental {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Dice added to or removed from rolls when this incidental is activated")
    private List<DiceModifier> diceModifiers = new ArrayList<>();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Fixed result symbols added to rolls when this incidental is activated")
    private List<ResultsModifier> resultsModifiers = new ArrayList<>();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Healing applied to wounds or strain when this incidental is activated")
    private List<HealEffect> healEffects = new ArrayList<>();
}
