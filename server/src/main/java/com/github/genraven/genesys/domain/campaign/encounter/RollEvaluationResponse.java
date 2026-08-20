package com.github.genraven.genesys.domain.campaign.encounter;

import com.github.genraven.genesys.domain.common.GenesysSymbolResults;
import com.github.genraven.genesys.domain.enums.ResultType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RollEvaluationResponse {

    private String rollSessionId;
    private GenesysSymbolResults results;
    private int finalWoundsInflicted;
    private List<SpendOption> spendOptions;

    @AllArgsConstructor
    public static class SpendOption {
        public String name;
        public ResultType type;
        public int amount;
        public boolean repeatable;
    }
}
