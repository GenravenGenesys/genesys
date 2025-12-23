package com.github.genraven.genesys.domain.talent;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class TalentStats {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int wounds = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int strain = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int soak = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int defense = 0;
}
