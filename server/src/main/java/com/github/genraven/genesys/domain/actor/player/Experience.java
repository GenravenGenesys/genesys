package com.github.genraven.genesys.domain.actor.player;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class Experience {

    @Min(value = 0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int initial = 0;

    @Min(value = 0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int total = 0;

    @Min(value = 0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int available = 0;
}
