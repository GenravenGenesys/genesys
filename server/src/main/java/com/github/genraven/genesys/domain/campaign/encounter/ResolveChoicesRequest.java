package com.github.genraven.genesys.domain.campaign.encounter;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResolveChoicesRequest {
    private String rollSessionId;
    private String attackerId;
    private String targetEnemyInstanceId;

    private List<SelectedChoice> selectedChoices;

    /**
     * One player decision: spend {@code count} currency of the option identified
     * by {@code name} (matches SpendOption.name from RollEvaluationResponse).
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SelectedChoice {
        /** Matches SpendOption.name — e.g. "activate_critical", "add_boost_next_ally" */
        public String name;
        /** How many times to activate this option */
        public int count;
    }
}
