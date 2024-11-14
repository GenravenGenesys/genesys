package com.github.genraven.genesys.domain.campaign;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Session {

    protected Session() {
    }

    public Session(final String name) {
        this.name = name;
    }

    private String name;
    private Party party;
    private Boolean active = false;
    private List<String> sceneIds = new ArrayList<>();
}
