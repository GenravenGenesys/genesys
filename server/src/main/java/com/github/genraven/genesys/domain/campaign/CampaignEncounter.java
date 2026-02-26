package com.github.genraven.genesys.domain.campaign;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.actor.adversary.AdversaryTemplate;
import com.github.genraven.genesys.domain.campaign.encounter.InitiativeSlot;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CampaignEncounter {

    @EnumValidator(enumClass = Type.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Type type;

    @EnumValidator(enumClass = Status.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Status status;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String encounterId;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<AdversaryTemplate> npcIds;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<InitiativeSlot> initiativeOrder;

    @Valid
    @Schema(description = "Party state during Encounter", requiredMode = Schema.RequiredMode.REQUIRED)
    private Party party;

    @Getter
    @AllArgsConstructor
    public enum Type {
        COMBAT("Combat"),
        SOCIAL("Social"),
        GENERAL("General");

        @JsonValue
        private final String label;
    }

    @Getter
    @AllArgsConstructor
    public enum Status {
        BUILDING("Building"),
        READY("Ready"),
        ACTIVE("Active"),
        RESOLVED("Resolved");

        @JsonValue
        private final String label;
    }
}