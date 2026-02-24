package com.github.genraven.genesys.domain.campaign.encounter;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GenesysSymbolResults {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer success = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer advantage = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer triumph = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer failure = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer threat = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer despair = 0;
}
