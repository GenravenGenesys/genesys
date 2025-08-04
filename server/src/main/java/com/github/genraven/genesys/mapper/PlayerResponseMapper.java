package com.github.genraven.genesys.mapper;

import java.util.List;
import java.util.Optional;

import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.domain.equipment.EquipmentQuality;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import com.github.genraven.genesys.domain.actor.Stats;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.equipment.Armor;
import com.github.genraven.genesys.domain.equipment.EquipmentSlot;
import com.github.genraven.genesys.domain.response.PlayerResponse;

@Mapper(componentModel = "spring")
public interface PlayerResponseMapper {

    PlayerResponseMapper INSTANCE = Mappers.getMapper(PlayerResponseMapper.class);

    @Mapping(target = "strain", ignore = true)
    @Mapping(target = "wounds", ignore = true)
    @Mapping(target = "soak", ignore = true)
    @Mapping(target = "melee", ignore = true)
    @Mapping(target = "ranged", ignore = true)
    @Mapping(target = "encumbrance", ignore = true)
    PlayerResponse mapPlayerToPlayerResponse(final Player player);

    @AfterMapping
    default void enrichFields(@MappingTarget PlayerResponse playerResponse, Player player) {
        getTotalSoak(playerResponse);
        getTotalEncumbrance(playerResponse);
        getTotalMeleeDefense(playerResponse);
        getTotalRangedDefense(playerResponse);
        getTotalWounds(playerResponse, player);
        getTotalStrain(playerResponse, player);
    }

    private void getTotalSoak(@MappingTarget PlayerResponse playerResponse) {
        int baseSoak = playerResponse.getBrawn().getCurrent();

        int talentBonus = Optional.ofNullable(playerResponse.getTalents())
            .orElse(List.of()).stream()
            .map(talent -> Optional.ofNullable(talent.getTalentStats())
                .map(stats -> {
                    int s = stats.getSoak();
                    return talent.isRanked() ? s * talent.getRanks() : s;
                }).orElse(0))
            .mapToInt(Integer::intValue)
            .sum();

        int armorBonus = Optional.ofNullable(playerResponse.getArmors())
            .orElse(List.of()).stream()
            .filter(actorArmor -> actorArmor.getSlot().equals(EquipmentSlot.BODY))
            .map(Armor::getSoak).mapToInt(Integer::intValue).sum();

        playerResponse.setSoak(baseSoak + talentBonus + armorBonus);
    }

    private void getTotalEncumbrance(@MappingTarget PlayerResponse playerResponse) {
        int encumbrance = playerResponse.getBrawn().getCurrent() + 5;
        playerResponse.setEncumbrance(encumbrance);
    }

    private void getTotalMeleeDefense(@MappingTarget PlayerResponse playerResponse) {
        int talentBonus = Optional.ofNullable(playerResponse.getTalents())
            .orElse(List.of()).stream()
            .map(talent -> Optional.ofNullable(talent.getTalentStats())
                .map(stats -> {
                    int s = stats.getDefense();
                    return talent.isRanked() ? s * talent.getRanks() : s;
                }).orElse(0))
            .mapToInt(Integer::intValue)
            .sum();

        int armorBonus = Optional.ofNullable(playerResponse.getArmors())
            .orElse(List.of()).stream()
            .filter(actorArmor -> actorArmor.getSlot().equals(EquipmentSlot.BODY))
            .map(Armor::getDefense).mapToInt(Integer::intValue).sum();

        playerResponse.setMelee(talentBonus + armorBonus);
    }

    private void getTotalRangedDefense(@MappingTarget PlayerResponse playerResponse) {
        int talentBonus = Optional.ofNullable(playerResponse.getTalents())
            .orElse(List.of()).stream()
            .map(talent -> Optional.ofNullable(talent.getTalentStats())
                .map(stats -> {
                    int s = stats.getDefense();
                    return talent.isRanked() ? s * talent.getRanks() : s;
                }).orElse(0))
            .mapToInt(Integer::intValue)
            .sum();

        int armorBonus = Optional.ofNullable(playerResponse.getArmors())
            .orElse(List.of()).stream()
            .filter(actorArmor -> actorArmor.getSlot().equals(EquipmentSlot.BODY))
            .map(Armor::getDefense).mapToInt(Integer::intValue).sum();

        playerResponse.setRanged(talentBonus + armorBonus);
    }

    private void getTotalWounds(@MappingTarget PlayerResponse playerResponse, Player player) {
        int archetypeWounds = Optional.ofNullable(playerResponse.getArchetype())
            .map(Archetype::getWounds)
            .orElse(0);

        int talentBonus = Optional.ofNullable(playerResponse.getTalents())
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

        playerResponse.setWounds(new Stats(current, archetypeWounds + talentBonus, Stats.Type.WOUNDS));
    }

    private void getTotalStrain(@MappingTarget PlayerResponse playerResponse, Player player) {
        int archetypeStrain = Optional.ofNullable(playerResponse.getArchetype())
            .map(Archetype::getStrain)
            .orElse(0);

        int talentBonus = Optional.ofNullable(playerResponse.getTalents())
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

        playerResponse.setStrain(new Stats(current, archetypeStrain + talentBonus, Stats.Type.STRAIN));
    }
}
