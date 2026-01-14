package com.github.genraven.genesys.domain.campaign;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "The root entity for a VTT Campaign setting")
@Document(collection = "sessions")
public class CampaignSession {

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @Indexed
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String campaignId;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime sessionDate;

    @Valid
    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<CampaignScene> scenes = List.of();
}