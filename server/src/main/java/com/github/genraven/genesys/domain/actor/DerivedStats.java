package com.github.genraven.genesys.domain.actor;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Stats")
public class DerivedStats {

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Threshold woundThreshold;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Threshold strainThreshold;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Attribute defense;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Attribute soak;
}
