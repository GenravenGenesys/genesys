package com.github.genraven.genesys.domain.talent;

import com.github.genraven.genesys.domain.skill.Skill;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TalentSkills {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Skill> potentialCareerSkills = new ArrayList<>();
}
