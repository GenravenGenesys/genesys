package com.github.genraven.genesys.domain.quality;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Quality {

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String description;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int cost = 2;

    @NotNull
    private Boolean armor = false;

    @NotNull
    private Boolean weapon = false;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private QualityStats stats = new QualityStats();
}
