package com.github.genraven.genesys.domain.campaign.encounter.dice;

import lombok.Data;

@Data
public class NetResult {
    private int netSuccess = 0;
    private int netAdvantage = 0;
    private boolean success = false;
    private boolean triumph = false;
    private boolean despair = false;
}