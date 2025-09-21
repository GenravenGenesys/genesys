package com.github.genraven.genesys.domain.context.equipment;

import com.github.genraven.genesys.domain.equipment.Gear;
import jakarta.validation.Valid;

public record GearContext(@Valid Gear gear) {
}
