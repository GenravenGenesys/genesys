//package com.github.genraven.genesys.mapper;
//
//import com.github.genraven.genesys.domain.actor.ActorArmor;
//import com.github.genraven.genesys.domain.actor.Characteristic;
//import com.github.genraven.genesys.domain.actor.OldStats;
//import com.github.genraven.genesys.domain.actor.npc.Rival;
//import com.github.genraven.genesys.domain.equipment.Armor;
//import org.mapstruct.AfterMapping;
//import org.mapstruct.Mapper;
//import org.mapstruct.Mapping;
//import org.mapstruct.MappingTarget;
//import org.mapstruct.factory.Mappers;
//
//import java.util.List;
//import java.util.Optional;
//
//@Mapper(componentModel = "spring")
//public interface RivalResponseMapper {
//
//    RivalResponseMapper INSTANCE = Mappers.getMapper(RivalResponseMapper.class);
//
//    @Mapping(target = "wounds", ignore = true)
//    @Mapping(target = "soak", ignore = true)
//    @Mapping(target = "melee", ignore = true)
//    @Mapping(target = "ranged", ignore = true)
//    @Mapping(target = "errors", ignore = true)
//    Rival mapRivalToRivalResponse(final Rival rival);
//
//    @AfterMapping
//    default void enrichFields(@MappingTarget Rival rivalResponse, Rival rival) {
//        getTotalSoak(rivalResponse);
//        getTotalMeleeDefense(rivalResponse);
//        getTotalRangedDefense(rivalResponse);
//        getTotalWounds(rivalResponse, rival);
//    }
//
//    private void getTotalSoak(@MappingTarget Rival rivalResponse) {
//        int baseSoak = rivalResponse.getBrawn().getCurrent();
//
//        int talentBonus = Optional.ofNullable(rivalResponse.getTalents())
//            .orElse(List.of()).stream()
//            .map(talent -> Optional.ofNullable(talent.getStatModifiers())
//                .map(stats -> {
//                    int s = stats.getSoak();
//                    return talent.isRanked() ? s * talent.getRanks() : s;
//                }).orElse(0))
//            .mapToInt(Integer::intValue)
//            .sum();
//
//        int armorBonus = Optional.ofNullable(rivalResponse.getArmors())
//            .orElse(List.of()).stream()
//            .filter(actorArmor -> actorArmor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
//            .map(Armor::getSoak).mapToInt(Integer::intValue).sum();
//
//        rivalResponse.setSoak(baseSoak + talentBonus + armorBonus);
//    }
//
//    private void getTotalMeleeDefense(@MappingTarget Rival rivalResponse) {
//        int talentBonus = Optional.ofNullable(rivalResponse.getTalents())
//            .orElse(List.of()).stream()
//            .map(talent -> Optional.ofNullable(talent.getStatModifiers())
//                .map(stats -> {
//                    int s = stats.getDefense();
//                    return talent.isRanked() ? s * talent.getRanks() : s;
//                }).orElse(0))
//            .mapToInt(Integer::intValue)
//            .sum();
//
//        int armorBonus = Optional.ofNullable(rivalResponse.getArmors())
//            .orElse(List.of()).stream()
//            .filter(actorArmor -> actorArmor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
//            .map(Armor::getDefense).mapToInt(Integer::intValue).sum();
//
//        rivalResponse.setMelee(talentBonus + armorBonus);
//    }
//
//    private void getTotalRangedDefense(@MappingTarget Rival rivalResponse) {
//        int talentBonus = Optional.ofNullable(rivalResponse.getTalents())
//            .orElse(List.of()).stream()
//            .map(talent -> Optional.ofNullable(talent.getStatModifiers())
//                .map(stats -> {
//                    int s = stats.getDefense();
//                    return talent.isRanked() ? s * talent.getRanks() : s;
//                }).orElse(0))
//            .mapToInt(Integer::intValue)
//            .sum();
//
//        int armorBonus = Optional.ofNullable(rivalResponse.getArmors())
//            .orElse(List.of()).stream()
//            .filter(actorArmor -> actorArmor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
//            .map(Armor::getDefense).mapToInt(Integer::intValue).sum();
//
//        rivalResponse.setRanged(talentBonus + armorBonus);
//    }
//
//    private void getTotalWounds(@MappingTarget Rival rivalResponse, Rival rival) {
//        int brawnWounds = Optional.ofNullable(rivalResponse.getBrawn())
//            .map(Characteristic::getCurrent)
//            .orElse(0);
//
//        int talentBonus = Optional.ofNullable(rivalResponse.getTalents())
//            .orElse(List.of()).stream()
//            .map(talent -> Optional.ofNullable(talent.getStatModifiers())
//                .map(stats -> {
//                    int s = stats.getWounds();
//                    return talent.isRanked() ? s * talent.getRanks() : s;
//                }).orElse(0))
//            .mapToInt(Integer::intValue)
//            .sum();
//
//        int current = Optional.ofNullable(rival.getWounds())
//            .map(OldStats::getCurrent)
//            .orElse(0);
//
//        rivalResponse.setWounds(new OldStats(current, brawnWounds + talentBonus, OldStats.Type.WOUNDS));
//    }
//}
