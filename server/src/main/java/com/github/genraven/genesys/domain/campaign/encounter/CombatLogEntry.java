package com.github.genraven.genesys.domain.campaign.encounter;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class CombatLogEntry {
    private String rollSessionId;
    private String timestamp;
    private String finalSummary;

    // Ordered lines explaining what happened mechanically step-by-step
    // e.g., ["Target took 5 wounds.", "Vicious Critical Injury triggered (+10 to table).", "Passed a Boost die to next ally."]
    private List<String> narrativeLines = new ArrayList<>();

    public CombatLogEntry() {
        // Automatically timestamp the log entry using java.time standard
        this.timestamp = java.time.LocalDateTime.now().toString();
    }

    /**
     * Appends a structural log or narrative description to the turn breakdown.
     */
    public void addNarrativeLine(String line) {
        this.narrativeLines.add(line);
    }
}
