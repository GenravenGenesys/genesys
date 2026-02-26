package com.github.genraven.genesys.domain.equipment;

import com.github.genraven.genesys.domain.enums.RangeBand;
import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "weapons")
@Schema(allOf = { Equipment.class })
public class Weapon extends Equipment {

    protected Weapon() {}

    public Weapon(final Equipment equipment) {
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

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int damage = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Skill skill;

    @Min(1)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int critical = 3;

    @EnumValidator(enumClass = RangeBand.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private RangeBand range = RangeBand.ENGAGED;

    @NotNull
    private boolean brawn = false;

    @Min(1)
    @Max(2)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int hands = 1;
}
