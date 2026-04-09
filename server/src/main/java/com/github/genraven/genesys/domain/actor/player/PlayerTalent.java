package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.talent.*;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.*;

@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "Setting-specific talents on player")
public class PlayerTalent extends Talent{

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int ranks;
}
