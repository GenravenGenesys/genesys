package com.github.genraven.genesys.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.actor.player.Archetype;
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
    default void enrichFields(@MappingTarget CharacterResponse characterResponse, Player player) {
        getTotalSoak(characterResponse);
        getTotalEncumbrance(characterResponse);
        getTotalMeleeDefense(characterResponse);
        getTotalRangedDefense(characterResponse);
        getTotalWounds(characterResponse, player);
        getTotalStrain(characterResponse, player);
    }

    default List<ActorSkill> convertSkills(final List<PlayerSkill> skills) {
        final List<ActorSkill> actorSkills = new ArrayList<>();
        skills.forEach(skill -> {
            actorSkills.add(new ActorSkill(skill));
        });
        return actorSkills;
    }

    private void getTotalSoak(@MappingTarget CharacterResponse characterResponse) {
        int baseSoak = characterResponse.getBrawn().getCurrent();

        int talentBonus = Optional.ofNullable(characterResponse.getTalents())
                .orElse(List.of()).stream()
                .map(talent -> Optional.ofNullable(talent.getTalentStats())
                        .map(stats -> {
                            int s = stats.getSoak();
                            return talent.isRanked() ? s * talent.getRanks() : s;
                        }).orElse(0))
                .mapToInt(Integer::intValue)
                .sum();

        int armorBonus = Optional.ofNullable(characterResponse.getArmors())
                .orElse(List.of()).stream()
                .filter(actorArmor -> actorArmor.getSlot().equals(EquipmentSlot.BODY))
                .map(Armor::getSoak).mapToInt(Integer::intValue).sum();

        characterResponse.setSoak(baseSoak + talentBonus + armorBonus);
    }

    private void getTotalEncumbrance(@MappingTarget CharacterResponse characterResponse) {
        int encumbrance = Optional.ofNullable(characterResponse.getBrawn())
                .map(characteristic -> characteristic.getCurrent() + 5).orElse(5);

        characterResponse.setEncumbrance(encumbrance);
    }

    private void getTotalMeleeDefense(@MappingTarget CharacterResponse characterResponse) {
        int talentBonus = Optional.ofNullable(characterResponse.getTalents())
                .orElse(List.of()).stream()
                .map(talent -> Optional.ofNullable(talent.getTalentStats())
                        .map(stats -> {
                            int s = stats.getDefense();
                            return talent.isRanked() ? s * talent.getRanks() : s;
                        }).orElse(0))
                .mapToInt(Integer::intValue)
                .sum();

        int armorBonus = Optional.ofNullable(characterResponse.getArmors())
                .orElse(List.of()).stream()
                .filter(actorArmor -> actorArmor.getSlot().equals(EquipmentSlot.BODY))
                .map(Armor::getDefense).mapToInt(Integer::intValue).sum();

        characterResponse.setMelee(talentBonus + armorBonus);
    }

    private void getTotalRangedDefense(@MappingTarget CharacterResponse characterResponse) {
        int talentBonus = Optional.ofNullable(characterResponse.getTalents())
                .orElse(List.of()).stream()
                .map(talent -> Optional.ofNullable(talent.getTalentStats())
                        .map(stats -> {
                            int s = stats.getDefense();
                            return talent.isRanked() ? s * talent.getRanks() : s;
                        }).orElse(0))
                .mapToInt(Integer::intValue)
                .sum();

        int armorBonus = Optional.ofNullable(characterResponse.getArmors())
                .orElse(List.of()).stream()
                .filter(actorArmor -> actorArmor.getSlot().equals(EquipmentSlot.BODY))
                .map(Armor::getDefense).mapToInt(Integer::intValue).sum();

        characterResponse.setRanged(talentBonus + armorBonus);
    }

    private void getTotalWounds(@MappingTarget CharacterResponse characterResponse, Player player) {
        int archetypeWounds = Optional.ofNullable(player.getArchetype())
                .map(Archetype::getWounds)
                .orElse(0);

        int brawnWounds = Optional.ofNullable(characterResponse.getBrawn())
                .map(Characteristic::getCurrent)
                .orElse(0);

        int talentBonus = Optional.ofNullable(characterResponse.getTalents())
                .orElse(List.of()).stream()
                .map(talent -> Optional.ofNullable(talent.getTalentStats())
                        .map(stats -> {
                            int s = stats.getWounds();
                            return talent.isRanked() ? s * talent.getRanks() : s;
                        }).orElse(0))
                .mapToInt(Integer::intValue)
                .sum();

        int current = Optional.ofNullable(player.getWounds())
                .map(Stats::getCurrent)
                .orElse(0);

        characterResponse.setWounds(new Stats(current, archetypeWounds + brawnWounds + talentBonus, Stats.Type.WOUNDS));
    }

    private void getTotalStrain(@MappingTarget CharacterResponse characterResponse, Player player) {
        int archetypeStrain = Optional.ofNullable(player.getArchetype())
                .map(Archetype::getStrain)
                .orElse(0);

        int willpowerStrain = Optional.ofNullable(characterResponse.getWillpower())
                .map(Characteristic::getCurrent)
                .orElse(0);

        int talentBonus = Optional.ofNullable(characterResponse.getTalents())
                .orElse(List.of()).stream()
                .map(talent -> Optional.ofNullable(talent.getTalentStats())
                        .map(stats -> {
                            int s = stats.getStrain();
                            return talent.isRanked() ? s * talent.getRanks() : s;
                        }).orElse(0))
                .mapToInt(Integer::intValue)
                .sum();

        int current = Optional.ofNullable(player.getStrain())
                .map(Stats::getCurrent)
                .orElse(0);

        characterResponse.setStrain(new Stats(current, archetypeStrain + willpowerStrain+ talentBonus, Stats.Type.STRAIN));
    }
}
