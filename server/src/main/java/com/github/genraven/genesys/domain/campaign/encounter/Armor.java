package com.github.genraven.genesys.domain.campaign.encounter;

import com.github.genraven.genesys.domain.quality.EquipmentQuality;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents a piece of armor equipped by or carried by a Participant in an encounter.
 */
@Data
@Builder
public class Armor {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Min(0)
    @Schema(description = "Soak bonus granted by this armor", requiredMode = Schema.RequiredMode.REQUIRED)
    private int soak;

    @Min(0)
    @Schema(description = "Defense bonus granted by this armor", requiredMode = Schema.RequiredMode.REQUIRED)
    private int defense;

    @Valid
    @Builder.Default
    @Schema(description = "Active qualities on this armor")
    private List<EquipmentQuality> qualities = new ArrayList<>();
}

