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
@Schema(description = "Characteristic Stat")
public class Characteristics {

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic brawn;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic agility;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic intellect;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic cunning;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic willpower;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic presence;
}
