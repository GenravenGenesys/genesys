package com.github.genraven.genesys.domain.common;

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
    @Schema(description = "Number of Success symbols rolled", requiredMode =  Schema.RequiredMode.REQUIRED)
    private Integer success = 0;

    @Schema(description = "Number of Advantage symbols rolled", requiredMode =  Schema.RequiredMode.REQUIRED)
    private Integer advantage = 0;

    @Schema(description = "Number of Triumph symbols rolled", requiredMode =  Schema.RequiredMode.REQUIRED)
    private Integer triumph = 0;

    @Schema(description = "Number of Failure symbols rolled", requiredMode =  Schema.RequiredMode.REQUIRED)
    private Integer failure = 0;

    @Schema(description = "Number of Threat symbols rolled", requiredMode =  Schema.RequiredMode.REQUIRED)
    private Integer threat = 0;

    @Schema(description = "Number of Despair symbols rolled", requiredMode =  Schema.RequiredMode.REQUIRED)
    private Integer despair = 0;
}
