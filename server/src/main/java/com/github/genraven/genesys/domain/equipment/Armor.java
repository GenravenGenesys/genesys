package com.github.genraven.genesys.domain.equipment;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "armors")
@Schema(allOf = { Equipment.class })
public class Armor extends Equipment {

    protected Armor() {}

    public Armor(final Equipment equipment) {
        this.setId(equipment.getId());
        this.setName(equipment.getName());
        this.setDescription(equipment.getDescription());
        this.setPrice(equipment.getPrice());
        this.setRestricted(equipment.isRestricted());
        this.setEncumbrance(equipment.getEncumbrance());
        this.setRarity(equipment.getRarity());
        this.setQualities(equipment.getQualities());
    }

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @Min(0)
    private int soak = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @Min(0)
    private int defense = 0;
}
