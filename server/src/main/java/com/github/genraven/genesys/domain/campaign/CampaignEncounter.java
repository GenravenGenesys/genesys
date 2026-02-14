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

    @EnumValidator(enumClass = EncounterType.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private EncounterType encounterType;

    @EnumValidator(enumClass = EncounterStatus.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private EncounterStatus encounterStatus;

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
    public enum EncounterType {
        COMBAT("Combat"),
        SOCIAL("Social"),
        GENERAL("General");

        @JsonValue
        private final String label;
    }

    @Getter
    @AllArgsConstructor
    public enum EncounterStatus {
        READY("Ready"),
        ACTIVE("Active"),
        RESOLVED("Resolved");

        @JsonValue
        private final String label;
    }
}