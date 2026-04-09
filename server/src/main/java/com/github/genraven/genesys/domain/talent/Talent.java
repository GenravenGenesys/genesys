package com.github.genraven.genesys.domain.talent;

import com.github.genraven.genesys.domain.campaign.encounter.Action;
import com.github.genraven.genesys.domain.campaign.encounter.Maneuver;
import com.github.genraven.genesys.domain.enums.Activation;
import com.github.genraven.genesys.domain.Cost;
import com.github.genraven.genesys.domain.Limit;
import com.github.genraven.genesys.domain.enums.Tier;
import com.github.genraven.genesys.domain.modifier.AbilityModifiers;
import com.github.genraven.genesys.domain.modifier.DiceModifier;
import com.github.genraven.genesys.domain.modifier.StatModifiers;
import com.github.genraven.genesys.validator.EnumValidator;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Setting-specific talents")
public class Talent {

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    private String name;

    @EnumValidator(enumClass = Activation.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Activation activation = Activation.PASSIVE;

    @EnumValidator(enumClass = Tier.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Tier tier = Tier.FIRST;

    @NotNull
    private boolean ranked = false;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String summary;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String description;

    @Valid
    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Cost cost = new Cost();

    @Valid
    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Limit limit = new Limit();

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private TalentSkills talentSkills = null;

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private StatModifiers statModifiers = null;

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private AbilityModifiers abilityModifiers = null;

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private TalentSkillCheck talentSkillCheck = null;

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<DiceModifier> diceModifiers = null;

    @Builder.Default
    @Schema(description = "Configuration for talents that function as a maneuver activation")
    private Maneuver maneuver = null;

    @Builder.Default
    @Schema(description = "Configuration for talents that function as a action activation")
    private Action action = null;
}
