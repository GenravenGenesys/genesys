package com.github.genraven.gradlejavaserver.domain.equipment;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "armors")
public class Armor extends Equipment {

    protected Armor() {}

    public Armor(final Equipment equipment) {
        this.setName(equipment.getName());
        this.setDescription(equipment.getDescription());
        this.setPrice(equipment.getPrice());
        this.setRestricted(equipment.isRestricted());
        this.setEncumbrance(equipment.getEncumbrance());
        this.setRarity(equipment.getRarity());
        this.setQualities(equipment.getQualities());
        this.setSettings(equipment.getSettings());
    }

    private int soak = 0;
    private int defense = 0;
}
