package com.github.genraven.genesys.domain.campaign;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CampaignScene {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String sceneId;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String mapUrl;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<CampaignEncounter> encounters;

    @Valid
    @Schema(description = "Party state during Scene", requiredMode = Schema.RequiredMode.REQUIRED)
    private Party party;

    @NotNull
    private Boolean active = false;
}