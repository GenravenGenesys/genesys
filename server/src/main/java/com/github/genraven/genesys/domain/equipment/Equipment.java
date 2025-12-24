package com.github.genraven.genesys.domain.equipment;

import com.github.genraven.genesys.domain.modifier.Modifier;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
public class Equipment {

    protected Equipment() {
    }

    public Equipment(final String name) {
        this.name = name;
    }

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    private String name;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String description;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @Min(0)
    private int price = 0;

    @NotNull
    private boolean restricted = false;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @Min(0)
    private int encumbrance = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @Min(0)
    @Max(10)
    private int rarity = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Modifier> modifiers = new ArrayList<>();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<EquipmentQuality> qualities = new ArrayList<>();
}
