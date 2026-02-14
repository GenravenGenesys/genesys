package com.github.genraven.genesys.domain.campaign.encounter;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.actor.adversary.AdversaryTemplate;
import com.github.genraven.genesys.domain.actor.player.PlayerCharacter;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class InitiativeSlot {

    @EnumValidator(enumClass = Type.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Type type;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private AdversaryTemplate adversaryTemplate;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private PlayerCharacter playerCharacter;

    private String initiative;

    @Getter
    @AllArgsConstructor
    public enum Type {
        PLAYER("Player"),
        NPC("NPC");

        @JsonValue
        private final String label;
    }
}
