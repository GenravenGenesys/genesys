package com.github.genraven.genesys.domain.campaign.encounter;

import com.github.genraven.genesys.domain.common.GenesysSymbolResults;
import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * Immutable snapshot of a resolved dice roll stored server-side
 * between the initial roll response and the player's spend/resolve commit.
 * Keyed by rollSessionId inside EncounterStateCache.
 */
@Data
@Builder
public class PendingRollState {

    /** Unique identifier linking this state to the UI's RollEvaluationResponse. */
    private String rollSessionId;

    private String attackerId;
    private String targetId;

    /** Net symbol totals after all dice have been rolled and cancelled. */
    private GenesysSymbolResults symbolResults;

    /**
     * Wounds that will be applied before the player spends symbols.
     * = weapon damage + brawn bonus (if applicable) + net successes - target soak.
     * Minimum 1 if the attack hits.
     */
    private int baseWoundsInflicted;

    /** Whether the attack actually hits (net successes >= 1). */
    private boolean hit;

    /**
     * Full menu of spend options available to the player based on net symbols
     * and active weapon qualities.  The UI shows this list; the player returns
     * a SelectedChoice for each option they want to activate.
     */
    private List<RollEvaluationResponse.SpendOption> availableSpendOptions;

    /**
     * Vicious quality rating on the weapon used (0 if none).
     * Added to the d100 critical injury roll during resolve.
     */
    private int viciousRating;

    /** The weapon object used in this roll (needed for resolve-time calculations). */
    private Weapon weaponUsed;
}

