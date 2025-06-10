package com.github.genraven.genesys.domain.common;

import java.util.ArrayList;
import java.util.List;

import com.github.genraven.genesys.domain.Difficulty;
import com.github.genraven.genesys.domain.RangeBand;
import com.github.genraven.genesys.domain.actor.ActorSkill;

import lombok.Data;

@Data
public class Action {
    private ActorSkill skill;
    private Difficulty difficulty;
    private ActorSkill opposedSkill;
    private RangeBand rangeBand = RangeBand.ENGAGED;
    private List<Advantage> advantages = new ArrayList();
}
