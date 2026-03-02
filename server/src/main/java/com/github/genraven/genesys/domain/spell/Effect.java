package com.github.genraven.genesys.domain.spell;

import lombok.Data;

@Data
public class Effect {

    private String name;

    private String description;

    private int increase = 0;
}
