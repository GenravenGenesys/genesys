//package com.github.genraven.genesys.mapper;
//
//import com.github.genraven.genesys.domain.actor.ActorArmor;
//import com.github.genraven.genesys.domain.actor.Characteristic;
//import com.github.genraven.genesys.domain.actor.OldStats;
//import com.github.genraven.genesys.domain.actor.npc.Nemesis;
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
//public interface NemesisResponseMapper {
//
//    NemesisResponseMapper INSTANCE = Mappers.getMapper(NemesisResponseMapper.class);
//
//    @Mapping(target = "wounds", ignore = true)
//    @Mapping(target = "strain", ignore = true)
//    @Mapping(target = "soak", ignore = true)
//    @Mapping(target = "melee", ignore = true)
//    @Mapping(target = "ranged", ignore = true)
//    @Mapping(target = "errors", ignore = true)
//    Nemesis mapNemesisToNemesisResponse(final Nemesis nemesis);
//
//    @AfterMapping
//    default void enrichFields(@MappingTarget Nemesis nemesisResponse, Nemesis nemesis) {
//        getTotalSoak(nemesisResponse);
//        getTotalMeleeDefense(nemesisResponse);
//        getTotalRangedDefense(nemesisResponse);
//        getTotalWounds(nemesisResponse, nemesis);
//        getTotalStrain(nemesisResponse, nemesis);
//    }
//
//    private void getTotalSoak(@MappingTarget Nemesis nemesisResponse) {
//        int baseSoak = nemesisResponse.getBrawn().getCurrent();
//
//        int talentBonus = Optional.ofNullable(nemesisResponse.getTalents())
//            .orElse(List.of()).stream()
//            .map(talent -> Optional.ofNullable(talent.getStatModifiers())
//                .map(stats -> {
//                    int s = stats.getSoak();
//                    return talent.isRanked() ? s * talent.getRanks() : s;
//                }).orElse(0))
//            .mapToInt(Integer::intValue)
//            .sum();
//
//        int armorBonus = Optional.ofNullable(nemesisResponse.getArmors())
//            .orElse(List.of()).stream()
//            .filter(actorArmor -> actorArmor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
//            .map(Armor::getSoak).mapToInt(Integer::intValue).sum();
//
//        nemesisResponse.setSoak(baseSoak + talentBonus + armorBonus);
//    }
//
//    private void getTotalMeleeDefense(@MappingTarget Nemesis nemesisResponse) {
//        int talentBonus = Optional.ofNullable(nemesisResponse.getTalents())
//            .orElse(List.of()).stream()
//            .map(talent -> Optional.ofNullable(talent.getStatModifiers())
//                .map(stats -> {
//                    int s = stats.getDefense();
//                    return talent.isRanked() ? s * talent.getRanks() : s;
//                }).orElse(0))
//            .mapToInt(Integer::intValue)
//            .sum();
//
//        int armorBonus = Optional.ofNullable(nemesisResponse.getArmors())
//            .orElse(List.of()).stream()
//            .filter(actorArmor -> actorArmor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
//            .map(Armor::getDefense).mapToInt(Integer::intValue).sum();
//
//        nemesisResponse.setMelee(talentBonus + armorBonus);
//    }
//
//    private void getTotalRangedDefense(@MappingTarget Nemesis nemesisResponse) {
//        int talentBonus = Optional.ofNullable(nemesisResponse.getTalents())
//            .orElse(List.of()).stream()
//            .map(talent -> Optional.ofNullable(talent.getStatModifiers())
//                .map(stats -> {
//                    int s = stats.getDefense();
//                    return talent.isRanked() ? s * talent.getRanks() : s;
//                }).orElse(0))
//            .mapToInt(Integer::intValue)
//            .sum();
//
//        int armorBonus = Optional.ofNullable(nemesisResponse.getArmors())
//            .orElse(List.of()).stream()
//            .filter(actorArmor -> actorArmor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
//            .map(Armor::getDefense).mapToInt(Integer::intValue).sum();
//
//        nemesisResponse.setRanged(talentBonus + armorBonus);
//    }
//
//    private void getTotalWounds(@MappingTarget Nemesis nemesisResponse, Nemesis nemesis) {
//        int brawnWounds = Optional.ofNullable(nemesisResponse.getBrawn())
//            .map(Characteristic::getCurrent)
//            .orElse(0);
//
//        int talentBonus = Optional.ofNullable(nemesisResponse.getTalents())
//            .orElse(List.of()).stream()
//            .map(talent -> Optional.ofNullable(talent.getStatModifiers())
//                .map(stats -> {
//                    int s = stats.getWounds();
//                    return talent.isRanked() ? s * talent.getRanks() : s;
//                }).orElse(0))
//            .mapToInt(Integer::intValue)
//            .sum();
//
//        int current = Optional.ofNullable(nemesis.getWounds())
//            .map(OldStats::getCurrent)
//            .orElse(0);
//
//        nemesisResponse.setWounds(new OldStats(current, brawnWounds + talentBonus, OldStats.Type.WOUNDS));
//    }
//
//    private void getTotalStrain(@MappingTarget Nemesis nemesisResponse, Nemesis nemesis) {
//        int willpowerStrain = Optional.ofNullable(nemesisResponse.getWillpower())
//            .map(Characteristic::getCurrent)
//            .orElse(0);
//
//        int talentBonus = Optional.ofNullable(nemesisResponse.getTalents())
//            .orElse(List.of()).stream()
//            .map(talent -> Optional.ofNullable(talent.getStatModifiers())
//                .map(stats -> {
//                    int s = stats.getStrain();
//                    return talent.isRanked() ? s * talent.getRanks() : s;
//                }).orElse(0))
//            .mapToInt(Integer::intValue)
//            .sum();
//
//        int current = Optional.ofNullable(nemesis.getStrain())
//            .map(OldStats::getCurrent)
//            .orElse(0);
//
//        nemesisResponse.setStrain(new OldStats(current, willpowerStrain + talentBonus, OldStats.Type.STRAIN));
//    }
//}
