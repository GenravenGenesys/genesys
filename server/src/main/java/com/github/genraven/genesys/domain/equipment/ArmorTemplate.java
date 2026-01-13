package com.github.genraven.genesys.domain.equipment;

import com.github.genraven.genesys.domain.actor.Attribute;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Schema(name = "ArmorTemplate")
public class ArmorTemplate extends ItemTemplate {

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Attribute soak;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Attribute defense;
}
