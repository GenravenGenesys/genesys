package com.github.genraven.genesys.domain.campaign;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "campaigns")
public class Campaign {

    protected Campaign() {
    }

    public Campaign(final String name) {
        this.name = name;
    }

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    private String name;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Party party = new Party();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Session> sessions = new ArrayList<>();

    @NotNull
    private boolean current = false;

    @NotNull
    private boolean active = false;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<String> talentIds = new ArrayList<>();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<String> skillIds = new ArrayList<>();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<String> sceneIds = new ArrayList<>();
}
