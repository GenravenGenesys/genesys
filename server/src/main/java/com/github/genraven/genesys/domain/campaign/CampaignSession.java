package com.github.genraven.genesys.domain.campaign;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.*;
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

    @Valid
    @Schema(description = "Party state during Session", requiredMode = Schema.RequiredMode.REQUIRED)
    private Party party;

    @EnumValidator(enumClass = Status.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Status status;

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer player;

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer gm;

    @Getter
    @AllArgsConstructor
    public enum Status {
        PLANNING("Planning"),
        READY("Ready"),
        ACTIVE("Active"),
        RESOLVED("Resolved");

        @JsonValue
        private final String label;
    }
}