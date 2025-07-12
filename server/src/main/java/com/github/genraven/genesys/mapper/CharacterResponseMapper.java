package com.github.genraven.genesys.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import com.github.genraven.genesys.domain.actor.Stats;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.actor.player.PlayerSkill;
import com.github.genraven.genesys.domain.equipment.Armor;
import com.github.genraven.genesys.domain.actor.ActorSkill;
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
    @Mapping(target = "skills", expression = "java(convertSkills(player.getSkills()))")
    @Mapping(target = "effects", expression = "java(new java.util.ArrayList())")
    @Mapping(target = "abilities", source = "player.archetype.abilities")
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

    default List<ActorSkill> convertSkills(final List<PlayerSkill> skills) {
        final List<ActorSkill> actorSkills = new ArrayList<>();
        skills.forEach(skill -> {
            actorSkills.add(new ActorSkill(skill));
        });
        return actorSkills;
    }

    private void getTotalSoak(@MappingTarget CharacterResponse character) {
        int soak = character.getBrawn().getCurrent();
        soak += character.getTalents().stream()
                .filter(talent -> talent.getTalentStats().getSoak() > 0)
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getSoak() * talent.getRanks()
                        : talent.getTalentStats().getSoak())
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
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getDefense() * talent.getRanks()
                        : talent.getTalentStats().getDefense())
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
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getDefense() * talent.getRanks()
                        : talent.getTalentStats().getDefense())
                .sum();
        ranged += character.getArmors().stream()
                .filter(armor -> armor.getSlot().equals(EquipmentSlot.BODY))
                .mapToInt(Armor::getDefense)
                .sum();
        character.setRanged(ranged);
    }

    private void getTotalWounds(@MappingTarget CharacterResponse character, Player player) {
        int threshold = player.getArchetype().getWounds();
        threshold += character.getTalents().stream()
                .filter(talent -> talent.getTalentStats().getWounds() != 0)
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getWounds() * talent.getRanks()
                        : talent.getTalentStats().getWounds())
                .sum();
        character.setWounds(new Stats(character.getWounds().getCurrent(), threshold, Stats.Type.WOUNDS));
    }

    private void getTotalStrain(@MappingTarget CharacterResponse character, Player player) {
        int archetypeStrain = Optional.ofNullable(player.getArchetype())
                .map(a -> a.getStrain())
                .orElse(0);

        int talentBonus = Optional.ofNullable(character.getTalents())
                .orElse(List.of()).stream()
                .map(talent -> Optional.ofNullable(talent.getTalentStats())
                        .map(stats -> {
                            int s = stats.getStrain();
                            return talent.isRanked() ? s * talent.getRanks() : s;
                        }).orElse(0))
                .mapToInt(Integer::intValue)
                .sum();

        int current = Optional.ofNullable(character.getStrain())
                .map(Stats::getCurrent)
                .orElse(0);

        character.setStrain(new Stats(current, archetypeStrain + talentBonus, Stats.Type.STRAIN));
    }
}
