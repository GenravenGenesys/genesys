package com.github.genraven.genesys.util;

import com.github.genraven.genesys.domain.actor.ActorTalent;
import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.actor.player.PlayerSkill;

public final class PlayerExperienceUtil {

    public static int getExperienceFromUnrankedTalent(final ActorTalent talent) {
        switch (talent.getTier()) {
            case FIRST -> {
                return 5;
            }
            case SECOND -> {
                return 10;
            }
            case THIRD -> {
                return 15;
            }
            case FOURTH -> {
                return 20;
            }
            case FIFTH -> {
                return 25;
            }
            default -> throw new IllegalStateException("Unexpected value: " + talent.getTier());
        }
    }

    public static int getExperienceFromRankedTalent(final ActorTalent talent) {
        switch (talent.getTier()) {
            case FIRST -> {
                return talent.getRanks() * 5;
            }
            case SECOND -> {
                return 5 + talent.getRanks() * 5;
            }
            case THIRD -> {
                return 10 + talent.getRanks() * 5;
            }
            case FOURTH -> {
                return 15 + talent.getRanks() * 5;
            }
            case FIFTH -> {
                return 25;
            }
            default -> throw new IllegalStateException("Unexpected value: " + talent.getTier());
        }
    }

    public static int getExperienceFromCharacteristicUpgrade(final Characteristic characteristic) {
        return characteristic.getCurrent() * 10;
    }

    public static int getExperienceFromSkillUpgrade(final PlayerSkill playerSkill) {
        return playerSkill.isCareer() ? playerSkill.getRanks() * 5 : 5 + playerSkill.getRanks() * 5;
    }
}
