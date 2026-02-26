package com.github.genraven.genesys.domain.campaign.encounter.dice;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RawDieResult {
    private String dieType;
    private int faceRolled;              // 1-indexed for display
    private List<DiceSymbol> symbols;
}