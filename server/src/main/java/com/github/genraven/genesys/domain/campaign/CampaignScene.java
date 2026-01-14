package com.github.genraven.genesys.domain.campaign;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record CampaignScene(
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) String sceneId,
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) String name,
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) String mapUrl,
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) List<CampaignEncounter> encounters
) {}