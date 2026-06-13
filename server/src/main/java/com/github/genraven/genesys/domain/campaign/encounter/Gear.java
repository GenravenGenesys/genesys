package com.github.genraven.genesys.domain.campaign.encounter;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

/**
 * Represents a miscellaneous gear item carried by a Participant in an encounter.
 */
@Data
@Builder
public class Gear {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "Description of the gear item")
    private String description;

    @Schema(description = "Encumbrance value of the item")
    private int encumbrance;
}

