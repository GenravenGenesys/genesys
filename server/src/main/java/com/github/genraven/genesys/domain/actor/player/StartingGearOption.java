package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.equipment.ItemTemplate;
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
@Schema(description = "One selectable option within a starting gear entry; may be a single item or a bundle of items")
public class StartingGearOption {

    @Schema(description = "Human-readable label for this option (e.g. \"traveling gear\")")
    private String description;

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
        description = "The item or items the player receives when they choose this option")
    private List<ItemTemplate> items = new ArrayList<>();
}

