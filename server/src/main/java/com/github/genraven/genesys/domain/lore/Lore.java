package com.github.genraven.genesys.domain.lore;

import com.github.genraven.genesys.domain.enums.LoreType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Lore {

    protected Lore() {
    }

    public Lore(final String name) {
        this.name = name;
    }

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private LoreType type;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String description;
}
