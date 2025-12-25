package com.github.genraven.genesys.domain.equipment;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class EquipmentQuality extends Quality {

    protected EquipmentQuality() {}

    public EquipmentQuality(final Quality quality) {
        this.setName(quality.getName());
        this.setDescription(quality.getDescription());
        this.setCost(quality.getCost());
        this.setArmor(quality.isArmor());
        this.setWeapon(quality.isWeapon());
        this.setModifiers(quality.getModifiers());
    }

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @Min(0)
    private int ranks = 0;
}
