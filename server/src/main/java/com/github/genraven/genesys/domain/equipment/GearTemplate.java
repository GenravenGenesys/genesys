package com.github.genraven.genesys.domain.equipment;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Schema(name = "GearTemplate")
public class GearTemplate extends ItemTemplate {

    @Min(1)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int amount;
}
