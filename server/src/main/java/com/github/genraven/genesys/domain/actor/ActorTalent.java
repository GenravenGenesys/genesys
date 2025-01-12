package com.github.genraven.genesys.domain.actor;

import com.github.genraven.genesys.domain.talent.Talent;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ActorTalent extends Talent {

    protected ActorTalent() {}

    public ActorTalent(final Talent talent) {
        this.setId(talent.getId());
        this.setName(talent.getName());
        this.setActivation(talent.getActivation());
        this.setRanked(talent.isRanked());
        this.setTier(talent.getTier());
        this.setDescription(talent.getDescription());
        this.setSummary(talent.getSummary());
        this.setCost(talent.getCost());
        this.setLimit(talent.getLimit());
        this.setTalentSkills(talent.getTalentSkills());
        this.setTalentStats(talent.getTalentStats());
        this.setTalentSkillCheck(talent.getTalentSkillCheck());
        this.setTalentRollModifiers(talent.getTalentRollModifiers());
    }

    private int ranks = 1;
}
