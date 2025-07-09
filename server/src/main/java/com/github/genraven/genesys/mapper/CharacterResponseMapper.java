package com.github.genraven.genesys.mapper;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import com.github.genraven.genesys.domain.actor.Stats;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.equipment.Armor;
import com.github.genraven.genesys.domain.equipment.EquipmentSlot;
import com.github.genraven.genesys.domain.response.CharacterResponse;

@Mapper(componentModel = "spring")
public interface CharacterResponseMapper {
    
    CharacterResponseMapper INSTANCE = Mappers.getMapper(CharacterResponseMapper.class);

    @Mapping(target = "strain", ignore = true)
    @Mapping(target = "wounds", ignore = true)
    @Mapping(target = "soak", ignore = true)
    @Mapping(target = "size", ignore = true)
    @Mapping(target = "melee", ignore = true)
    @Mapping(target = "ranged", ignore = true)
    @Mapping(target = "encumbrance", ignore = true)
    @Mapping(target = "id", expression = "java(java.util.UUID.randomUUID().toString())")
    CharacterResponse mapPlayerToCharacter(final Player player);

    @AfterMapping
    default void enrichFields(@MappingTarget CharacterResponse character, Player player) {
        getTotalSoak(character);
        getTotalEncumbrance(character);
        getTotalMeleeDefense(character);
        getTotalRangedDefense(character);
        getTotalWounds(character, player);
        getTotalStrain(character, player);
    }

    private void getTotalSoak(@MappingTarget CharacterResponse character) {
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
    }

    private void getTotalEncumbrance(@MappingTarget CharacterResponse character) {
        int encumbrance = character.getBrawn().getCurrent() + 5;
        character.setEncumbrance(encumbrance);
    }

    private void getTotalMeleeDefense(@MappingTarget CharacterResponse character) {
        int melee = 0;
        melee += character.getTalents().stream()
                .filter(talent -> talent.getTalentStats().getDefense() > 0)
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getDefense() * talent.getRanks() : talent.getTalentStats().getDefense())
                .sum();
        melee += character.getArmors().stream()
                .filter(armor -> armor.getSlot().equals(EquipmentSlot.BODY))
                .mapToInt(Armor::getDefense).sum();
        character.setMelee(melee);
    }

    private void getTotalRangedDefense(@MappingTarget CharacterResponse character) {
        int ranged = 0;
        ranged += character.getTalents().stream()
                .filter(talent -> talent.getTalentStats().getDefense() > 0)
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getDefense() * talent.getRanks() : talent.getTalentStats().getDefense())
                .sum();
        ranged += character.getArmors().stream()
                .filter(armor -> armor.getSlot().equals(EquipmentSlot.BODY))
                .mapToInt(Armor::getDefense)
                .sum();
        character.setRanged(ranged);
    }

    private void getTotalWounds(@MappingTarget CharacterResponse character,Player player) {
        int threshold = player.getArchetype().getWounds();
        threshold += character.getTalents().stream()
                .filter(talent -> talent.getTalentStats().getWounds() != 0)
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getWounds() * talent.getRanks() : talent.getTalentStats().getWounds())
                .sum();
        character.setWounds(new Stats(character.getWounds().getCurrent(), threshold, Stats.Type.WOUNDS));
    }

    private void getTotalStrain(@MappingTarget CharacterResponse character, Player player) {
        int threshold = player.getArchetype().getStrain();
        threshold += character.getTalents().stream()
                .filter(talent -> talent.getTalentStats().getStrain() != 0)
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getStrain() * talent.getRanks() : talent.getTalentStats().getStrain())
                .sum();
        character.setStrain(new Stats(character.getStrain().getCurrent(), threshold, Stats.Type.STRAIN));
    }
}
