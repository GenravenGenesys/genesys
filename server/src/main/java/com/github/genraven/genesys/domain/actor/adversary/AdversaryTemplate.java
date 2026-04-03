package com.github.genraven.genesys.domain.actor.adversary;

import com.github.genraven.genesys.domain.actor.Characteristics;
import com.github.genraven.genesys.domain.actor.DerivedStats;
import com.github.genraven.genesys.domain.error.GenesysError;
import com.github.genraven.genesys.domain.actor.Motivation;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Setting-specific adversaries such as Nemeses, Rivals, and Minions")
public class AdversaryTemplate {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    private String name;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "The description of the adversary")
    private String description;

    @EnumValidator(enumClass =  AdversaryType.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "The type of adversary")
    private AdversaryType type;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "The characteristics of the adversary")
    private Characteristics characteristics;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "The stats of the adversary")
    private DerivedStats derivedStats;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Weapons, armor, and gear of the adversary")
    private AdversaryEquipment equipment;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Adversary Skills")
    private List<AdversarySkill> skills;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Adversary Ratings")
    private AdversaryRatings ratings;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer size = 1;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Adversary motivations")
    private List<Motivation> motivations = new ArrayList<>();

    private List<GenesysError> errors;
}
