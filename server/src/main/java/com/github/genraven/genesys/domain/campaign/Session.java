package com.github.genraven.genesys.domain.campaign;

import com.github.genraven.genesys.validator.ValidationGroups;
import jakarta.validation.Valid;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotEmpty;
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

    @NotEmpty
    private String name;

    @Valid
    private Party party;

    @AssertTrue(groups = ValidationGroups.SceneStartValidation.class, message = "Session must be active in order to start the scene.")
    private Boolean active = false;

    private Integer player;

    private Integer gm;

    private List<String> sceneIds = new ArrayList<>();
}
