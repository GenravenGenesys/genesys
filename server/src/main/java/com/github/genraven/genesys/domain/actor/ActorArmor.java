package com.github.genraven.genesys.domain.actor;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.equipment.Armor;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@EqualsAndHashCode(callSuper = true)
@Data
public class ActorArmor extends Armor {

    protected ActorArmor() {}

    public ActorArmor(final Armor armor) {
        this.setId(armor.getId());
        this.setName(armor.getName());
        this.setDescription(armor.getDescription());
        this.setPrice(armor.getPrice());
        this.setRestricted(armor.isRestricted());
        this.setEncumbrance(armor.getEncumbrance());
        this.setRarity(armor.getRarity());
        this.setModifiers(armor.getModifiers());
        this.setQualities(armor.getQualities());
        this.setSoak(armor.getSoak());
        this.setDefense(armor.getDefense());
    }

    @EnumValidator(enumClass = ArmorSlot.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private ArmorSlot slot = ArmorSlot.BODY;

    @AllArgsConstructor
    @Getter
    public enum ArmorSlot {
        BODY("Body"),
        NONE("None");

        @JsonValue
        private final String label;
    }
}
