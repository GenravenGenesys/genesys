package com.github.genraven.genesys.domain;

import com.github.genraven.genesys.domain.common.Action;
import com.github.genraven.genesys.domain.modifier.Modifier;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Ability {
    private String name;
    private String description;
    private Activation activation;
    private Cost cost = new Cost();
    private Limit limit = new Limit();
    private Action action = new Action();
    private List<Modifier> modifiers = new ArrayList<>();
}
