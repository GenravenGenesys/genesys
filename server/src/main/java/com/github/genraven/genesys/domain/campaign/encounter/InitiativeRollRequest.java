package com.github.genraven.genesys.domain.campaign.encounter;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Request to roll initiative for a single participant")
public class InitiativeRollRequest {

    @NotEmpty
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "ID of the participant rolling initiative (must be registered in the encounter)")
    private String participantId;

    @NotEmpty
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Name of the initiative skill to use (e.g. 'Cool' or 'Vigilance'). " +
                          "The skill must be present in the participant's skill list with initiative=true.")
    private String initiativeSkillName;

    @Builder.Default
    @Schema(description = "Extra boost (blue) dice from situational bonuses", defaultValue = "0")
    private int boostDice = 0;

    @Builder.Default
    @Schema(description = "Extra setback (black) dice from situational penalties", defaultValue = "0")
    private int setbackDice = 0;
}

