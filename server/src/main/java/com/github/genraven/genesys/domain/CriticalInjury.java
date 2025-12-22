package com.github.genraven.genesys.domain;

import com.github.genraven.genesys.domain.modifier.Modifier;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "injuries")
public class CriticalInjury {

    protected CriticalInjury() {
    }

    public CriticalInjury(final String name) {
        this.name = name;
    }

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String description;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Difficulty severity;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int min;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int max;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Modifier> modifiers = new ArrayList<>();
}
