package com.github.genraven.genesys.util;

import com.github.genraven.genesys.domain.common.GenesysSymbolResults;

import java.util.Random;

/**
 * Simulates Genesys RPG dice pools using the official FFG face tables.
 *
 * <p>Each die type maps its faces to raw symbol counts.  After all dice are
 * rolled the results are netted out: successes cancel failures, advantages
 * cancel threats.  Triumphs and despairs are never cancelled by each other.</p>
 */
public final class DiceRollerUtil {

    private DiceRollerUtil() {}

    private static final Random RNG = new Random();

    // ── Face tables ──────────────────────────────────────────────────────────
    // Each inner array: [successes, advantages, triumphs, failures, threats, despairs]

    /** Boost die (d6) */
    private static final int[][] BOOST_FACES = {
        {0, 0, 0, 0, 0, 0}, // blank
        {0, 0, 0, 0, 0, 0}, // blank
        {1, 0, 0, 0, 0, 0}, // success
        {1, 1, 0, 0, 0, 0}, // success + advantage
        {0, 2, 0, 0, 0, 0}, // advantage + advantage
        {0, 1, 0, 0, 0, 0}, // advantage
    };

    /** Setback die (d6) */
    private static final int[][] SETBACK_FACES = {
        {0, 0, 0, 0, 0, 0}, // blank
        {0, 0, 0, 0, 0, 0}, // blank
        {0, 0, 0, 1, 0, 0}, // failure
        {0, 0, 0, 1, 0, 0}, // failure
        {0, 0, 0, 0, 1, 0}, // threat
        {0, 0, 0, 0, 1, 0}, // threat
    };

    /** Ability die (d8) */
    private static final int[][] ABILITY_FACES = {
        {0, 0, 0, 0, 0, 0}, // blank
        {1, 0, 0, 0, 0, 0}, // success
        {1, 0, 0, 0, 0, 0}, // success
        {2, 0, 0, 0, 0, 0}, // success + success
        {0, 1, 0, 0, 0, 0}, // advantage
        {1, 1, 0, 0, 0, 0}, // success + advantage
        {0, 2, 0, 0, 0, 0}, // advantage + advantage
        {1, 1, 0, 0, 0, 0}, // success + advantage
    };

    /** Difficulty die (d8) */
    private static final int[][] DIFFICULTY_FACES = {
        {0, 0, 0, 0, 0, 0}, // blank
        {0, 0, 0, 1, 0, 0}, // failure
        {0, 0, 0, 2, 0, 0}, // failure + failure
        {0, 0, 0, 0, 1, 0}, // threat
        {0, 0, 0, 0, 1, 0}, // threat
        {0, 0, 0, 0, 1, 0}, // threat
        {0, 0, 0, 1, 1, 0}, // failure + threat
        {0, 0, 0, 0, 2, 0}, // threat + threat
    };

    /** Proficiency die (d12) */
    private static final int[][] PROFICIENCY_FACES = {
        {0, 0, 0, 0, 0, 0}, // blank
        {1, 0, 0, 0, 0, 0}, // success
        {1, 0, 0, 0, 0, 0}, // success
        {2, 0, 0, 0, 0, 0}, // success + success
        {2, 0, 0, 0, 0, 0}, // success + success
        {1, 1, 0, 0, 0, 0}, // success + advantage
        {1, 1, 0, 0, 0, 0}, // success + advantage
        {1, 1, 0, 0, 0, 0}, // success + advantage
        {0, 1, 0, 0, 0, 0}, // advantage
        {0, 1, 0, 0, 0, 0}, // advantage
        {1, 0, 1, 0, 0, 0}, // triumph  (also counts as 1 success)
        {1, 1, 0, 0, 0, 0}, // success + advantage
    };

    /** Challenge die (d12) */
    private static final int[][] CHALLENGE_FACES = {
        {0, 0, 0, 0, 0, 0}, // blank
        {0, 0, 0, 1, 0, 0}, // failure
        {0, 0, 0, 1, 0, 0}, // failure
        {0, 0, 0, 2, 0, 0}, // failure + failure
        {0, 0, 0, 2, 0, 0}, // failure + failure
        {0, 0, 0, 1, 1, 0}, // failure + threat
        {0, 0, 0, 1, 1, 0}, // failure + threat
        {0, 0, 0, 1, 1, 0}, // failure + threat
        {0, 0, 0, 0, 1, 0}, // threat
        {0, 0, 0, 0, 1, 0}, // threat
        {0, 0, 0, 1, 0, 1}, // despair  (also counts as 1 failure)
        {0, 0, 0, 1, 1, 0}, // failure + threat
    };

    // ── Public API ───────────────────────────────────────────────────────────

    /**
     * Rolls a Genesys dice pool and returns net symbol totals.
     *
     * @param proficiency number of Proficiency (yellow d12) dice
     * @param ability     number of Ability (green d8) dice
     * @param challenge   number of Challenge (red d12) dice
     * @param difficulty  number of Difficulty (purple d8) dice
     * @param boost       number of Boost (blue d6) dice
     * @param setback     number of Setback (black d6) dice
     */
    public static GenesysSymbolResults rollPool(int proficiency, int ability,
                                                int challenge, int difficulty,
                                                int boost, int setback) {
        int[] raw = new int[6]; // [S, A, T(riumph), F, Th, D(espair)]

        rollDice(raw, PROFICIENCY_FACES, proficiency);
        rollDice(raw, ABILITY_FACES,     ability);
        rollDice(raw, CHALLENGE_FACES,   challenge);
        rollDice(raw, DIFFICULTY_FACES,  difficulty);
        rollDice(raw, BOOST_FACES,       boost);
        rollDice(raw, SETBACK_FACES,     setback);

        // Net out successes vs failures, advantages vs threats
        int netSuccess   = Math.max(0, raw[0] - raw[3]);
        int netFailure   = Math.max(0, raw[3] - raw[0]);
        int netAdvantage = Math.max(0, raw[1] - raw[4]);
        int netThreat    = Math.max(0, raw[4] - raw[1]);

        // Triumphs and despairs survive cancellation intact
        int triumph = raw[2];
        int despair = raw[5];

        return GenesysSymbolResults.builder()
                .success(netSuccess + triumph)   // triumph contributes a success
                .advantage(netAdvantage)
                .triumph(triumph)
                .failure(netFailure + despair)   // despair contributes a failure
                .threat(netThreat)
                .despair(despair)
                .build();
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private static void rollDice(int[] totals, int[][] faces, int count) {
        for (int i = 0; i < count; i++) {
            int face = RNG.nextInt(faces.length);
            for (int sym = 0; sym < 6; sym++) {
                totals[sym] += faces[face][sym];
            }
        }
    }
}

