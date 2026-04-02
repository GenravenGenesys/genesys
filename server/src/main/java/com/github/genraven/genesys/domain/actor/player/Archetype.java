package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.Ability;
import com.github.genraven.genesys.domain.skill.Skill;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Setting-specific archetype for player characters")
public class Archetype {

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    private String name;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String description;

    @Min(value = 1)
    @Max(value = 5)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int brawn = 1;

    @Min(value = 1)
    @Max(value = 5)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int agility = 1;

    @Min(value = 1)
    @Max(value = 5)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int intellect = 1;

    @Min(value = 1)
    @Max(value = 5)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int cunning = 1;

    @Min(value = 1)
    @Max(value = 5)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int willpower = 1;

    @Min(value = 1)
    @Max(value = 5)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int presence = 1;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int wounds = 10;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int strain = 10;

    @Min(value = 65)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int experience = 100;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Skill> skills;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Ability> abilities = new ArrayList<>();
}
