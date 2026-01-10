package com.github.genraven.genesys.domain.equipment;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum EquipmentType {
    WEAPON("Weapon"),
    ARMOR("Armor"),
    GEAR("Gear");

    @JsonValue
    private final String label;
}
