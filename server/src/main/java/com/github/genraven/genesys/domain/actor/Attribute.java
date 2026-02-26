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
@Schema(description = "Defensive Attribute")
public class Attribute {

    @Min(value = 0)
    @Schema(description = "Current value of the Defensive Attribute", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
    private int current;

    @Min(value = 0)
    @Schema(description = "Base value of the Defensive Attribute", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
    private int base;
}
