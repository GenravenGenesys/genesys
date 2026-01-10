package com.github.genraven.genesys.domain.actor;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdversaryRatings {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int combat;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int social;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int general;
}
