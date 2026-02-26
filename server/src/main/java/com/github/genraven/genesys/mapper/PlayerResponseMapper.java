//package com.github.genraven.genesys.mapper;
//
//import java.util.List;
//import java.util.Optional;
//
//import com.github.genraven.genesys.domain.actor.ActorArmor;
//import com.github.genraven.genesys.domain.actor.Characteristic;
//import com.github.genraven.genesys.domain.actor.player.Archetype;
//import org.mapstruct.AfterMapping;
//import org.mapstruct.Mapper;
//import org.mapstruct.Mapping;
//import org.mapstruct.MappingTarget;
//import org.mapstruct.factory.Mappers;
//
//import com.github.genraven.genesys.domain.actor.OldStats;
//import com.github.genraven.genesys.domain.actor.player.Player;
//import com.github.genraven.genesys.domain.equipment.Armor;
//
//@Mapper(componentModel = "spring")
//public interface PlayerResponseMapper {
//
//    PlayerResponseMapper INSTANCE = Mappers.getMapper(PlayerResponseMapper.class);
//
//    @Mapping(target = "strain", ignore = true)
//    @Mapping(target = "wounds", ignore = true)
//    @Mapping(target = "soak", ignore = true)
//    @Mapping(target = "melee", ignore = true)
//    @Mapping(target = "ranged", ignore = true)
//    @Mapping(target = "encumbrance", ignore = true)
//    @Mapping(target = "errors", ignore = true)
//    Player mapPlayerToPlayerResponse(final Player player);
//
//    @AfterMapping
//    default void enrichFields(@MappingTarget Player playerResponse, Player player) {
//        getTotalSoak(playerResponse);
//        getTotalEncumbrance(playerResponse);
//        getTotalMeleeDefense(playerResponse);
//        getTotalRangedDefense(playerResponse);
//        getTotalWounds(playerResponse, player);
//        getTotalStrain(playerResponse, player);
//    }
//
//    private void getTotalSoak(@MappingTarget Player playerResponse) {
//        int baseSoak = playerResponse.getBrawn().getCurrent();
//
//        int talentBonus = Optional.ofNullable(playerResponse.getTalents())
//            .orElse(List.of()).stream()
//            .map(talent -> Optional.ofNullable(talent.getStatModifiers())
//                .map(stats -> {
//                    int s = stats.getSoak();
//                    return talent.isRanked() ? s * talent.getRanks() : s;
//                }).orElse(0))
//            .mapToInt(Integer::intValue)
//            .sum();
//
//        int armorBonus = Optional.ofNullable(playerResponse.getArmors())
//            .orElse(List.of()).stream()
//            .filter(actorArmor -> actorArmor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
//            .map(Armor::getSoak).mapToInt(Integer::intValue).sum();
//
//        playerResponse.setSoak(baseSoak + talentBonus + armorBonus);
//    }
//
//    private void getTotalEncumbrance(@MappingTarget Player playerResponse) {
//        int encumbrance = Optional.ofNullable(playerResponse.getBrawn())
//                .map(characteristic -> characteristic.getCurrent() + 5).orElse(5);
//
//        playerResponse.setEncumbrance(encumbrance);
//    }
//
//    private void getTotalMeleeDefense(@MappingTarget Player playerResponse) {
//        int talentBonus = Optional.ofNullable(playerResponse.getTalents())
//            .orElse(List.of()).stream()
//            .map(talent -> Optional.ofNullable(talent.getStatModifiers())
//                .map(stats -> {
//                    int s = stats.getDefense();
//                    return talent.isRanked() ? s * talent.getRanks() : s;
//                }).orElse(0))
//            .mapToInt(Integer::intValue)
//            .sum();
//
//        int armorBonus = Optional.ofNullable(playerResponse.getArmors())
//            .orElse(List.of()).stream()
//            .filter(actorArmor -> actorArmor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
//            .map(Armor::getDefense).mapToInt(Integer::intValue).sum();
//
//        playerResponse.setMelee(talentBonus + armorBonus);
//    }
//
//    private void getTotalRangedDefense(@MappingTarget Player playerResponse) {
//        int talentBonus = Optional.ofNullable(playerResponse.getTalents())
//            .orElse(List.of()).stream()
//            .map(talent -> Optional.ofNullable(talent.getStatModifiers())
//                .map(stats -> {
//                    int s = stats.getDefense();
//                    return talent.isRanked() ? s * talent.getRanks() : s;
//                }).orElse(0))
//            .mapToInt(Integer::intValue)
//            .sum();
//
//        int armorBonus = Optional.ofNullable(playerResponse.getArmors())
//            .orElse(List.of()).stream()
//            .filter(actorArmor -> actorArmor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
//            .map(Armor::getDefense).mapToInt(Integer::intValue).sum();
//
//        playerResponse.setRanged(talentBonus + armorBonus);
//    }
//
//    private void getTotalWounds(@MappingTarget Player playerResponse, Player player) {
//        int archetypeWounds = Optional.ofNullable(playerResponse.getArchetype())
//            .map(Archetype::getWounds)
//            .orElse(0);
//
//        int brawnWounds = Optional.ofNullable(playerResponse.getBrawn())
//                .map(Characteristic::getCurrent)
//                .orElse(0);
//
//        int talentBonus = Optional.ofNullable(playerResponse.getTalents())
//            .orElse(List.of()).stream()
//            .map(talent -> Optional.ofNullable(talent.getStatModifiers())
//                .map(stats -> {
//                    int s = stats.getWounds();
//                    return talent.isRanked() ? s * talent.getRanks() : s;
//                }).orElse(0))
//            .mapToInt(Integer::intValue)
//            .sum();
//
//        int current = Optional.ofNullable(player.getWounds())
//            .map(OldStats::getCurrent)
//            .orElse(0);
//
//        playerResponse.setWounds(new OldStats(current, archetypeWounds + brawnWounds + talentBonus, OldStats.Type.WOUNDS));
//    }
//
//    private void getTotalStrain(@MappingTarget Player playerResponse, Player player) {
//        int archetypeStrain = Optional.ofNullable(playerResponse.getArchetype())
//            .map(Archetype::getStrain)
//            .orElse(0);
//
//        int willpowerStrain = Optional.ofNullable(playerResponse.getWillpower())
//                .map(Characteristic::getCurrent)
//                .orElse(0);
//
//        int talentBonus = Optional.ofNullable(playerResponse.getTalents())
//            .orElse(List.of()).stream()
//            .map(talent -> Optional.ofNullable(talent.getStatModifiers())
//                .map(stats -> {
//                    int s = stats.getStrain();
//                    return talent.isRanked() ? s * talent.getRanks() : s;
//                }).orElse(0))
//            .mapToInt(Integer::intValue)
//            .sum();
//
//        int current = Optional.ofNullable(player.getStrain())
//            .map(OldStats::getCurrent)
//            .orElse(0);
//
//        playerResponse.setStrain(new OldStats(current, archetypeStrain + willpowerStrain + talentBonus, OldStats.Type.STRAIN));
//    }
//}
