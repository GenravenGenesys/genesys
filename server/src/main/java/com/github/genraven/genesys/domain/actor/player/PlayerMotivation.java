package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.enums.MotivationType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "A player motivation of a specific type")
public class PlayerMotivation {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "The motivation type")
    private MotivationType type;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Description of the motivation")
    private String description;
}
