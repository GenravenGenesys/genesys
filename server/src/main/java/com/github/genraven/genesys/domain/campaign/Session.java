package com.github.genraven.genesys.domain.campaign;

import com.github.genraven.genesys.validator.ValidationGroups;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Party party;

    @NotNull
    private Boolean active = false;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer player;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer gm;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<String> sceneIds = new ArrayList<>();
}
