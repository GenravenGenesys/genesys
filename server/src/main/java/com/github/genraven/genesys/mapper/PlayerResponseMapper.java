package com.github.genraven.genesys.mapper;

import java.util.List;
import java.util.Optional;

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
        int soak = playerResponse.getBrawn().getCurrent();
        soak += playerResponse.getTalents().stream()
                .filter(talent -> talent.getTalentStats().getSoak() > 0)
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getSoak() * talent.getRanks()
                        : talent.getTalentStats().getSoak())
                .sum();
        soak += playerResponse.getArmors().stream()
                .filter(armor -> armor.getSlot().equals(EquipmentSlot.BODY))
                .mapToInt(Armor::getSoak)
                .sum();
        playerResponse.setSoak(soak);
    }

    private void getTotalEncumbrance(@MappingTarget PlayerResponse playerResponse) {
        int encumbrance = playerResponse.getBrawn().getCurrent() + 5;
        playerResponse.setEncumbrance(encumbrance);
    }

    private void getTotalMeleeDefense(@MappingTarget PlayerResponse playerResponse) {
        int melee = 0;
        melee += playerResponse.getTalents().stream()
                .filter(talent -> talent.getTalentStats().getDefense() > 0)
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getDefense() * talent.getRanks()
                        : talent.getTalentStats().getDefense())
                .sum();
        melee += playerResponse.getArmors().stream()
                .filter(armor -> armor.getSlot().equals(EquipmentSlot.BODY))
                .mapToInt(Armor::getDefense).sum();
        playerResponse.setMelee(melee);
    }

    private void getTotalRangedDefense(@MappingTarget PlayerResponse playerResponse) {
        int ranged = 0;
        ranged += playerResponse.getTalents().stream()
                .filter(talent -> talent.getTalentStats().getDefense() > 0)
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getDefense() * talent.getRanks()
                        : talent.getTalentStats().getDefense())
                .sum();
        ranged += playerResponse.getArmors().stream()
                .filter(armor -> armor.getSlot().equals(EquipmentSlot.BODY))
                .mapToInt(Armor::getDefense)
                .sum();
        playerResponse.setRanged(ranged);
    }

    private void getTotalWounds(@MappingTarget PlayerResponse playerResponse, Player player) {
        int threshold = player.getArchetype().getWounds();
        threshold += playerResponse.getTalents().stream()
                .filter(talent -> talent.getTalentStats().getWounds() != 0)
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getWounds() * talent.getRanks()
                        : talent.getTalentStats().getWounds())
                .sum();
        playerResponse.setWounds(new Stats(playerResponse.getWounds().getCurrent(), threshold, Stats.Type.WOUNDS));
    }

    private void getTotalStrain(@MappingTarget PlayerResponse playerResponse, Player player) {
        int archetypeStrain = Optional.ofNullable(player.getArchetype())
                .map(a -> a.getStrain())
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

        int current = Optional.ofNullable(playerResponse.getStrain())
                .map(Stats::getCurrent)
                .orElse(0);

        playerResponse.setStrain(new Stats(current, archetypeStrain + talentBonus, Stats.Type.STRAIN));
    }
}
