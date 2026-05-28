package com.github.genraven.genesys.util;

import com.github.genraven.genesys.domain.campaign.encounter.RollEvaluationResponse.SpendOption;
import com.github.genraven.genesys.domain.enums.ResultType;

import java.util.HashMap;
import java.util.Map;

public class GenesysSpendOptionRegistry {
    private static final Map<String, SpendOption> GLOBAL_OPTIONS = new HashMap<>();

    static {
        // Core Rules: Advantage spending profiles
        GLOBAL_OPTIONS.put("add_boost_next_ally", new SpendOption("Pass Boost Die to Next Ally", ResultType.ADVANTAGE, 1, true));
//        GLOBAL_OPTIONS.put("add_defense_current", new SpendOption("add_defense_current", "Add Melee/Ranged Defense (+1)", "ADVANTAGE", 2, false));

        // Core Rules: Triumph spending profiles
//        GLOBAL_OPTIONS.put("upgrade_next_ally", new SpendOption("upgrade_next_ally", "Upgrade Next Ally's Action", "TRIUMPH", 1, false));
    }

    public static SpendOption getOption(String name) {
        return GLOBAL_OPTIONS.get(name);
    }
}
