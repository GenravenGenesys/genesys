package com.github.genraven.genesys.domain.campaign;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
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

    @EnumValidator(enumClass = Status.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Status status;

    @Getter
    @AllArgsConstructor
    public enum Status {
        Building("Building"),
        Ready("Ready"),
        ACTIVE("Active"),
        RESOLVED("Resolved");

        @JsonValue
        private final String label;
    }
}
