package com.github.genraven.genesys.domain.campaign.encounter.dice;

import lombok.Data;

@Data
public class RollTotals {
    private int success = 0;
    private int advantage = 0;
    private int triumph = 0;
    private int failure = 0;
    private int threat = 0;
    private int despair = 0;
}