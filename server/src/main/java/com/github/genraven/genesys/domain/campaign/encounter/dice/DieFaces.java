package com.github.genraven.genesys.domain.campaign.encounter.dice;

import java.util.List;

import static com.github.genraven.genesys.domain.campaign.encounter.dice.DiceSymbol.*;

public final class DieFaces {

    private DieFaces() {}

    // ── Ability Die (Green d8) ───────────────────────────────────────────────
    public static final List<List<DiceSymbol>> ABILITY = List.of(
            List.of(BLANK),
            List.of(SUCCESS),
            List.of(SUCCESS),
            List.of(SUCCESS, SUCCESS),
            List.of(ADVANTAGE),
            List.of(ADVANTAGE),
            List.of(SUCCESS, ADVANTAGE),
            List.of(ADVANTAGE, ADVANTAGE)
    );

    // ── Proficiency Die (Yellow d12) ─────────────────────────────────────────
    public static final List<List<DiceSymbol>> PROFICIENCY = List.of(
            List.of(BLANK),
            List.of(SUCCESS),
            List.of(SUCCESS),
            List.of(SUCCESS, SUCCESS),
            List.of(SUCCESS, SUCCESS),
            List.of(ADVANTAGE),
            List.of(SUCCESS, ADVANTAGE),
            List.of(SUCCESS, ADVANTAGE),
            List.of(SUCCESS, ADVANTAGE),
            List.of(ADVANTAGE, ADVANTAGE),
            List.of(ADVANTAGE, ADVANTAGE),
            List.of(TRIUMPH)
    );

    // ── Difficulty Die (Purple d8) ───────────────────────────────────────────
    public static final List<List<DiceSymbol>> DIFFICULTY = List.of(
            List.of(BLANK),
            List.of(FAILURE),
            List.of(FAILURE, FAILURE),
            List.of(THREAT),
            List.of(THREAT),
            List.of(THREAT),
            List.of(THREAT, THREAT),
            List.of(FAILURE, THREAT)
    );

    // ── Challenge Die (Red d12) ──────────────────────────────────────────────
    public static final List<List<DiceSymbol>> CHALLENGE = List.of(
            List.of(BLANK),
            List.of(FAILURE),
            List.of(FAILURE),
            List.of(FAILURE, FAILURE),
            List.of(FAILURE, FAILURE),
            List.of(THREAT),
            List.of(THREAT),
            List.of(FAILURE, THREAT),
            List.of(FAILURE, THREAT),
            List.of(THREAT, THREAT),
            List.of(THREAT, THREAT),
            List.of(DESPAIR)
    );

    // ── Boost Die (Blue d6) ──────────────────────────────────────────────────
    public static final List<List<DiceSymbol>> BOOST = List.of(
            List.of(BLANK),
            List.of(BLANK),
            List.of(SUCCESS),
            List.of(SUCCESS, ADVANTAGE),
            List.of(ADVANTAGE, ADVANTAGE),
            List.of(ADVANTAGE)
    );

    // ── Setback Die (Black d6) ───────────────────────────────────────────────
    public static final List<List<DiceSymbol>> SETBACK = List.of(
            List.of(BLANK),
            List.of(BLANK),
            List.of(FAILURE),
            List.of(FAILURE),
            List.of(THREAT),
            List.of(THREAT)
    );
}
