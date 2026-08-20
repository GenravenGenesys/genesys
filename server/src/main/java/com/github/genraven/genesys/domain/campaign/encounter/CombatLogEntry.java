package com.github.genraven.genesys.domain.campaign.encounter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CombatLogEntry {
    private String rollSessionId;
    private String timestamp;
    private String finalSummary;

    // Ordered lines explaining what happened mechanically step-by-step
    // e.g., ["Target took 5 wounds.", "Vicious Critical Injury triggered (+10 to table).", "Passed a Boost die to next ally."]
    @Builder.Default
    private List<String> narrativeLines = new ArrayList<>();

    /**
     * Factory method that creates a timestamped log entry (replaces the old no-arg constructor
     * auto-timestamp so that @Builder and @NoArgsConstructor do not conflict).
     */
    public static CombatLogEntry create() {
        CombatLogEntry entry = new CombatLogEntry();
        entry.timestamp = java.time.LocalDateTime.now().toString();
        entry.narrativeLines = new ArrayList<>();
        return entry;
    }

    /**
     * Appends a structural log or narrative description to the turn breakdown.
     */
    public void addNarrativeLine(String line) {
        this.narrativeLines.add(line);
    }
}
