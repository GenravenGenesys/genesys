package com.github.genraven.genesys.domain.actor;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Characteristic Stat")
public class Characteristics {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int brawn;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int agility;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int intellect;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int cunning;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int willpower;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int presence;
}
