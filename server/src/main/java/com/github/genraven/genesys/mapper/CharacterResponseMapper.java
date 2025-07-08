package com.github.genraven.genesys.mapper;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.equipment.Armor;
import com.github.genraven.genesys.domain.equipment.EquipmentSlot;
import com.github.genraven.genesys.domain.response.CharacterResponse;

@Mapper(componentModel = "spring")
public interface CharacterResponseMapper {
    
    CharacterResponseMapper INSTANCE = Mappers.getMapper(CharacterResponseMapper.class);

    @Mapping(target = "soak", ignore = true)
    @Mapping(target = "size", ignore = true)
    @Mapping(target = "melee", ignore = true)
    @Mapping(target = "ranged", ignore = true)
    @Mapping(target = "encumbrance", ignore = true)
    CharacterResponse mapPlayerToCharacter(final Player player);

    @AfterMapping
    default void enrichFields(@MappingTarget CharacterResponse character) {
        int soak = character.getBrawn().getCurrent();
        soak += character.getTalents().stream()
                .filter(talent -> talent.getTalentStats().getSoak() > 0)
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getSoak() * talent.getRanks() : talent.getTalentStats().getSoak())
                .sum();
        soak += character.getArmors().stream()
                .filter(armor -> armor.getSlot().equals(EquipmentSlot.BODY))
                .mapToInt(Armor::getSoak)
                .sum();
        character.setSoak(soak);

        int encumbrance = character.getBrawn().getCurrent() + 5;
        character.setEncumbrance(encumbrance);
    }

}
