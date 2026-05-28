package com.github.genraven.genesys.domain.campaign.encounter;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ResolveChoicesRequest {
    private String rollSessionId;
    private String attackerId;
    private String targetEnemyInstanceId;

    private List<SelectedChoice> selectedChoices;

    public static class SelectedChoice {
        public String name;
        public int count;
    }
}
