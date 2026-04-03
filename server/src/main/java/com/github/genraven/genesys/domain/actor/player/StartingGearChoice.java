package com.github.genraven.genesys.domain.actor.player;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "A single starting gear entry; the player must choose exactly one of the listed options")
public class StartingGearChoice {

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
        description = "The selectable options for this entry; a list of one means the item is fixed with no choice")
    private List<StartingGearOption> options = new ArrayList<>();
}

