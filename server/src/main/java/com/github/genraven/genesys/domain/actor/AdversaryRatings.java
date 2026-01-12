package com.github.genraven.genesys.domain.actor;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdversaryRatings {

    @Min(1)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int combat;

    @Min(1)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int social;

    @Min(1)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int general;
}
