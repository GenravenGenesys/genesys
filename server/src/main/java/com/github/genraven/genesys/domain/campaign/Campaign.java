package com.github.genraven.genesys.domain.campaign;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "campaigns")
@Schema(description = "The root entity for a VTT Campaign setting")
public class Campaign {

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    private String name;

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Party party = new Party();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "GM-defined setting bible")
    private CampaignCompendium compendium;
}
