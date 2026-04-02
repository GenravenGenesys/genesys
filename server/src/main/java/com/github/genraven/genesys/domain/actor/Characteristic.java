package com.github.genraven.genesys.domain.actor;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Characteristic Stat")
public class Characteristic {

    @Min(value = 1)
    @Schema(description = "Current value of the Characteristic", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
    private int current;

    @Min(value = 1)
    @Schema(description = "Base value of the Characteristic", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
    private int base;
}
