package com.github.genraven.genesys.domain.modifier;

import com.github.genraven.genesys.domain.enums.CharacteristicType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class CharacteristicModifier {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "The characteristic to modify")
    private CharacteristicType characteristic;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "The amount to modify the characteristic by; positive values increase, negative values decrease")
    private int amount;
}
