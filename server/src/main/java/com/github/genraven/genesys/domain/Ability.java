package com.github.genraven.genesys.domain;

import com.github.genraven.genesys.domain.common.Action;
import com.github.genraven.genesys.domain.enums.Activation;
import com.github.genraven.genesys.domain.modifier.Modifier;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Ability {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String description;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Activation activation;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Cost cost = new Cost();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Limit limit = new Limit();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Action action = new Action();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Modifier> modifiers = new ArrayList<>();
}
