package com.github.genraven.genesys.domain.quality;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class EquipmentQuality extends Quality {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @Min(1)
    private int ranks = 1;
}
