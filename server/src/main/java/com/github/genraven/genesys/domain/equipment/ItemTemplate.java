package com.github.genraven.genesys.domain.equipment;

import com.github.genraven.genesys.domain.modifier.Modifier;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Setting-specific weapons, armor, and gear")
public class ItemTemplate {

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    private String name;

    @EnumValidator(enumClass = EquipmentType.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private EquipmentType type;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String description;

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int price = 0;

    @NotNull
    private boolean restricted = false;

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int encumbrance = 0;

    @Min(0)
    @Max(10)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int rarity = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Modifier> modifiers = new ArrayList<>();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<EquipmentQuality> qualities = new ArrayList<>();
}
