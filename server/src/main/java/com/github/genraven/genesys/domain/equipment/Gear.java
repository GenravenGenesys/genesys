package com.github.genraven.genesys.domain.equipment;

import com.github.genraven.genesys.domain.RangeBand;
import com.github.genraven.genesys.domain.skill.Skill;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "gears")
@Schema(allOf = { Equipment.class })
public class Gear extends Equipment {

    protected Gear() {}

    public Gear(final Equipment equipment) {
        this.setId(equipment.getId());
        this.setName(equipment.getName());
        this.setDescription(equipment.getDescription());
        this.setPrice(equipment.getPrice());
        this.setRestricted(equipment.isRestricted());
        this.setEncumbrance(equipment.getEncumbrance());
        this.setRarity(equipment.getRarity());
        this.setModifiers(equipment.getModifiers());
        this.setQualities(equipment.getQualities());
    }

    private Skill skill;
    private int amount;
    private RangeBand range = RangeBand.ENGAGED;
}
