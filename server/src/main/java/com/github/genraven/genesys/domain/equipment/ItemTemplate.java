package com.github.genraven.genesys.domain.equipment;

import com.github.genraven.genesys.domain.enums.EquipmentType;
import com.github.genraven.genesys.domain.modifier.GearModifiers;
import com.github.genraven.genesys.domain.quality.EquipmentQuality;
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

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Base item template")
public class ItemTemplate {

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
    private int price;

    @NotNull
    private boolean restricted = false;

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int encumbrance;

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int hardPoints;

    @Min(0)
    @Max(10)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int rarity;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<EquipmentQuality> qualities = new ArrayList<>();

    @Min(1)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int amount;

    @NotNull
    private Boolean natural = false;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private WeaponStats weaponStats;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private ArmorStats armorStats;

    @Schema(description = "Modifiers granted by this item when equipped or used; null means no modifiers")
    private GearModifiers gearModifiers;
}
