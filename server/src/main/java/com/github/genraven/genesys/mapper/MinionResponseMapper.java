package com.github.genraven.genesys.mapper;

import com.github.genraven.genesys.domain.actor.ActorArmor;
import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.actor.Stats;
import com.github.genraven.genesys.domain.actor.npc.Minion;
import com.github.genraven.genesys.domain.equipment.Armor;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring")
public interface MinionResponseMapper {

    MinionResponseMapper INSTANCE = Mappers.getMapper(MinionResponseMapper.class);

    @Mapping(target = "wounds", ignore = true)
    @Mapping(target = "soak", ignore = true)
    @Mapping(target = "melee", ignore = true)
    @Mapping(target = "ranged", ignore = true)
    @Mapping(target = "errors", ignore = true)
    Minion mapMinionToMinionResponse(final Minion minion);

    @AfterMapping
    default void enrichFields(@MappingTarget Minion minionResponse, Minion minion) {
        getTotalSoak(minionResponse);
        getTotalMeleeDefense(minionResponse);
        getTotalRangedDefense(minionResponse);
        getTotalWounds(minionResponse, minion);
    }

    private void getTotalSoak(@MappingTarget Minion minionResponse) {
        int baseSoak = minionResponse.getBrawn().getCurrent();

        int talentBonus = Optional.ofNullable(minionResponse.getTalents())
            .orElse(List.of()).stream()
            .map(talent -> Optional.ofNullable(talent.getTalentStats())
                .map(stats -> {
                    int s = stats.getSoak();
                    return talent.isRanked() ? s * talent.getRanks() : s;
                }).orElse(0))
            .mapToInt(Integer::intValue)
            .sum();

        int armorBonus = Optional.ofNullable(minionResponse.getArmors())
            .orElse(List.of()).stream()
            .filter(actorArmor -> actorArmor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
            .map(Armor::getSoak).mapToInt(Integer::intValue).sum();

        minionResponse.setSoak(baseSoak + talentBonus + armorBonus);
    }

    private void getTotalMeleeDefense(@MappingTarget Minion minionResponse) {
        int talentBonus = Optional.ofNullable(minionResponse.getTalents())
            .orElse(List.of()).stream()
            .map(talent -> Optional.ofNullable(talent.getTalentStats())
                .map(stats -> {
                    int s = stats.getDefense();
                    return talent.isRanked() ? s * talent.getRanks() : s;
                }).orElse(0))
            .mapToInt(Integer::intValue)
            .sum();

        int armorBonus = Optional.ofNullable(minionResponse.getArmors())
            .orElse(List.of()).stream()
            .filter(actorArmor -> actorArmor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
            .map(Armor::getDefense).mapToInt(Integer::intValue).sum();

        minionResponse.setMelee(talentBonus + armorBonus);
    }

    private void getTotalRangedDefense(@MappingTarget Minion minionResponse) {
        int talentBonus = Optional.ofNullable(minionResponse.getTalents())
            .orElse(List.of()).stream()
            .map(talent -> Optional.ofNullable(talent.getTalentStats())
                .map(stats -> {
                    int s = stats.getDefense();
                    return talent.isRanked() ? s * talent.getRanks() : s;
                }).orElse(0))
            .mapToInt(Integer::intValue)
            .sum();

        int armorBonus = Optional.ofNullable(minionResponse.getArmors())
            .orElse(List.of()).stream()
            .filter(actorArmor -> actorArmor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
            .map(Armor::getDefense).mapToInt(Integer::intValue).sum();

        minionResponse.setRanged(talentBonus + armorBonus);
    }

    private void getTotalWounds(@MappingTarget Minion minionResponse, Minion minion) {
        int brawnWounds = Optional.ofNullable(minionResponse.getBrawn())
            .map(Characteristic::getCurrent)
            .orElse(0);

        int talentBonus = Optional.ofNullable(minionResponse.getTalents())
            .orElse(List.of()).stream()
            .map(talent -> Optional.ofNullable(talent.getTalentStats())
                .map(stats -> {
                    int s = stats.getWounds();
                    return talent.isRanked() ? s * talent.getRanks() : s;
                }).orElse(0))
            .mapToInt(Integer::intValue)
            .sum();

        int current = Optional.ofNullable(minion.getWounds())
            .map(Stats::getCurrent)
            .orElse(0);

        minionResponse.setWounds(new Stats(current, brawnWounds + talentBonus, Stats.Type.WOUNDS));
    }
}
