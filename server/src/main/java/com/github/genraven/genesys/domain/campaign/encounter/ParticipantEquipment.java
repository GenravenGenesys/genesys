package com.github.genraven.genesys.domain.campaign.encounter;

import com.github.genraven.genesys.domain.equipment.ItemTemplate;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "The equipment of a participant (PC or NPC) taking part in an encounter")
public class ParticipantEquipment {
    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ItemTemplate> weapons;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private ItemTemplate equippedArmor;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ItemTemplate> otherGear;
}
