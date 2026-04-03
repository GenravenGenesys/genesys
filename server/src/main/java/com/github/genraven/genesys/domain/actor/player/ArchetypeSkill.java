package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.enums.SkillType;
import com.github.genraven.genesys.domain.skill.Skill;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "A skill entry granted by an archetype during character creation")
public class ArchetypeSkill {

    @Schema(
            description = "The skill granted. Null when playerChoice is true and the player selects the skill themselves.",
            nullable = true
    )
    private Skill skill;

    @Min(value = 1)
    @Max(value = 2)
    @Builder.Default
    @Schema(
            requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Number of starting ranks in this skill granted by the archetype before experience is spent",
            minimum = "1",
            maximum = "2"
    )
    private int startingRanks = 1;

    @Min(value = 2)
    @Max(value = 3)
    @Builder.Default
    @Schema(
            requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Maximum rank this skill may be trained to during character creation",
            minimum = "2",
            maximum = "3"
    )
    private int maxRank = 2;

    @Builder.Default
    @Schema(
            description = "When true, the skill must be a non-career skill (not among the character's career skills). " +
                    "May be combined with playerChoice=true, in which case the player must choose from non-career skills."
    )
    private boolean nonCareer = false;

    @Builder.Default
    @Schema(
            description = "When true, the player selects which skill to apply these ranks to at character creation " +
                    "(the 'skill' field will be null). " +
                    "Use 'nonCareer=true' to restrict the choice to non-career skills, " +
                    "and 'requiredSkillType' to restrict the choice to a specific skill type."
    )
    private boolean playerChoice = false;

    @Schema(
            description = "When playerChoice is true, restricts the type of skill the player may choose " +
                    "(e.g. KNOWLEDGE for a knowledge-only free choice). Null means any skill type is allowed.",
            nullable = true
    )
    private SkillType requiredSkillType;
}


