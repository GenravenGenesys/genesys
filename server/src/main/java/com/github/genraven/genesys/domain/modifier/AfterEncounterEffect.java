package com.github.genraven.genesys.domain.modifier;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class AfterEncounterEffect {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Wounds suffered at the end of the encounter")
    private int wounds = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Strain suffered at the end of the encounter")
    private int strain = 0;
}
