package com.github.genraven.genesys.domain.campaign.encounter.dice;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DiceRollRequest {

    @NotBlank
    private String encounterId;

    @NotBlank
    private String participantId;

    @NotBlank
    private String participantName;

    private String slotId;

    @Min(1)
    private int round;

    @NotNull
    private DiceRollType rollType;

    @Valid
    @NotNull
    private DicePool dicePool;

    private String skillUsed;
    private String actionId;
    private String notes;
}