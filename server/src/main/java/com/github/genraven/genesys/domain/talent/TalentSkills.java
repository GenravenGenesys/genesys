package com.github.genraven.genesys.domain.talent;

import com.github.genraven.genesys.domain.skill.Skill;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TalentSkills {

    private List<Skill> potentialCareerSkills = new ArrayList<>();
}
