package com.github.genraven.genesys.domain.actor;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Derived Threshold")
public class Threshold {

    @Min(value = 0)
    @Schema(description = "Current value of the Stat", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
    private int current;

    @Min(value = 1)
    @Schema(description = "Total value of the Stat", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
    private int total;
}
