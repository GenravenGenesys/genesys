package com.github.genraven.genesys.domain.campaign;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record CampaignEncounter(
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) String encounterId,
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) String name,
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) List<String> npcIds,
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) List<String> initiativeOrder // Genesys use "Slots" (PC/NPC), but storing IDs works too
) {}