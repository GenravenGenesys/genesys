package com.github.genraven.genesys.controller.player;

import com.github.genraven.genesys.controller.AbstractController;
import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.actor.player.PlayerSkill;
import com.github.genraven.genesys.domain.context.player.*;
import com.github.genraven.genesys.domain.talent.Talent;
import com.github.genraven.genesys.exceptions.BaseException;
import com.github.genraven.genesys.service.actor.PlayerService;
import com.github.genraven.genesys.util.MapperUtil;
import com.github.genraven.genesys.validator.player.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Player Controller", description = "Endpoints for managing players")
public class PlayerController extends AbstractController {
    
    private final PlayerService playerService;
    private final PlayerCreationCareerUpdateContextValidator playerCreationCareerUpdateContextValidator;
    private final PlayerCreationCareerSkillUpdateContextValidator playerCreationCareerSkillUpdateContextValidator;
    private final PlayerCreationArchetypeUpdateContextValidator playerCreationArchetypeUpdateContextValidator;
    private final PlayerCreationSkillUpdateContextValidator playerCreationSkillUpdateContextValidator;
    private final PlayerCreationCharacteristicUpdateContextValidator playerCreationCharacteristicUpdateContextValidator;
    private final PlayerCreationTalentUpdateContextValidator playerCreationTalentUpdateContextValidator;
    private final PlayerCreationResetExperienceContextValidator playerCreationResetExperienceContextValidator;

    @GetMapping("/{id}")
    @Operation(summary = "Get player by id", description = "Retrieve a specific player by its name.")
    public Mono<ResponseEntity<Player>> getPlayer(@PathVariable final String id) {
        return playerService.getPlayer(id)
            .flatMap(MapperUtil::mapPlayerToResponse)
            .map(player -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(player))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

//    @PostMapping("/{name}")
//    @Operation(summary = "Create a new player", description = "Create a new player with the specified name.")
//    public Mono<ResponseEntity<Player>> createPlayer(@PathVariable final String name) {
//        return playerService.createPlayer(name)
//            .flatMap(MapperUtil::mapPlayerToResponse)
//            .map(player -> ResponseEntity.created(getURI(player.getName())).body(player));
//    }

    @GetMapping("/")
    @Operation(summary = "Get all players", description = "Retrieve a list of all players.")
    public Mono<ResponseEntity<List<Player>>> getAllPlayers() {
        return playerService.getAllPlayers()
            .flatMap(MapperUtil::mapPlayerToResponse)
            .collectList()
            .map(players -> {
                if (CollectionUtils.isEmpty(players)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(players);
            });
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing player", description = "Update the details of an existing player.")
    public Mono<ResponseEntity<Player>> updatePlayer(@PathVariable final String id, @RequestBody final Player player) {
        return playerService.updatePlayer(id, player)
            .map(qual -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(qual))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PatchMapping("/creation/{id}/careers/")
    @Operation(summary = "Patches Player Career during Creation.", description = "Updates the Player Career during Creation.")
    public Mono<ResponseEntity<Player>> updatePlayerCareer(@PathVariable final String id, @RequestBody final Career career) {
        final Mono<Career> careerMono = Mono.just(career);
        return careerMono.zipWith(playerService.getPlayer(id))
            .map(tuple -> new PlayerCreationCareerUpdateContext(
                tuple.getT2(),
                tuple.getT1()
            ))
            .flatMap(playerCreationCareerUpdateContextValidator::validate)
            .flatMap(playerService::updatePlayerCareer)
            .flatMap(MapperUtil::mapPlayerToResponse)
            .map(player -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(player))
            .onErrorResume(BaseException.class, ex -> Mono.just(ResponseEntity.status(ex.getStatusCode())
                .contentType(MediaType.APPLICATION_JSON)
                .body(MapperUtil.mapErrorsToPlayerResponse(ex).block())));
    }

    @PatchMapping("/creation/{id}/careers/skills/")
    @Operation(summary = "Patches Player Career Skills during Creation.", description = "Updates the Player Career Skills during Creation.")
    public Mono<ResponseEntity<Player>> updatePlayerCareerSkills(@PathVariable final String id, @RequestBody final List<PlayerSkill> playerSkills) {
        final Mono<List<PlayerSkill>> skillsMono = Mono.just(playerSkills);
        return skillsMono.zipWith(playerService.getPlayer(id))
            .map(tuple -> new PlayerCreationCareerSkillUpdateContext(
                tuple.getT2(),
                tuple.getT1()))
            .flatMap(playerCreationCareerSkillUpdateContextValidator::validate)
            .flatMap(playerService::updatePlayerCareerSkills)
            .flatMap(MapperUtil::mapPlayerToResponse)
            .map(player -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(player))
            .onErrorResume(BaseException.class, ex -> Mono.just(ResponseEntity.status(ex.getStatusCode())
                .contentType(MediaType.APPLICATION_JSON)
                .body(MapperUtil.mapErrorsToPlayerResponse(ex).block())));
    }

//    @PatchMapping("/creation/{id}/archetypes/")
//    @Operation(summary = "Patches Player Archetypes during Creation.", description = "Updates the Player Archetype during Creation.")
//    public Mono<ResponseEntity<Player>> updatePlayerArchetype(@PathVariable final String id, @RequestBody final Archetype archetype) {
//        final Mono<Archetype> archetypeMono = Mono.just(archetype);
//        return archetypeMono.zipWith(playerService.getPlayer(id))
//            .map(tuple -> new PlayerCreationArchetypeUpdateContext(
//                tuple.getT2(),
//                tuple.getT1()))
//            .flatMap(playerCreationArchetypeUpdateContextValidator::validate)
//            .flatMap(playerService::updatePlayerArchetype)
//            .flatMap(MapperUtil::mapPlayerToResponse)
//            .map(player -> ResponseEntity.ok()
//                .contentType(MediaType.APPLICATION_JSON)
//                .body(player))
//            .onErrorResume(BaseException.class, ex -> Mono.just(ResponseEntity.status(ex.getStatusCode())
//                .contentType(MediaType.APPLICATION_JSON)
//                .body(MapperUtil.mapErrorsToPlayerResponse(ex).block())));
//    }
//
//    @PatchMapping("/creation/{id}/characteristics/")
//    @Operation(summary = "Patches Player Characteristics during Creation.", description = "Updates the Player Characteristics during Creation.")
//    public Mono<ResponseEntity<Player>> updatePlayerCharacteristic(@PathVariable final String id, @RequestBody final Characteristic characteristic) {
//        final Mono<Characteristic> characteristicMono = Mono.just(characteristic);
//        return characteristicMono.zipWith(playerService.getPlayer(id))
//            .map(tuple -> new PlayerCreationCharacteristicUpdateContext(
//                tuple.getT2(),
//                tuple.getT1()))
//            .flatMap(playerCreationCharacteristicUpdateContextValidator::validate)
//            .flatMap(playerService::updatePlayerCharacteristic)
//            .flatMap(MapperUtil::mapPlayerToResponse)
//            .map(updatedPlayer -> ResponseEntity.ok()
//                .contentType(MediaType.APPLICATION_JSON)
//                .body(updatedPlayer))
//            .onErrorResume(BaseException.class, ex -> Mono.just(ResponseEntity.status(ex.getStatusCode())
//                .contentType(MediaType.APPLICATION_JSON)
//                .body(MapperUtil.mapErrorsToPlayerResponse(ex).block())));
//    }

    @PatchMapping("/creation/{id}/skills/")
    @Operation(summary = "Patches Player Skills during Creation.", description = "Updates the Player Skills during Creation.")
    public Mono<ResponseEntity<Player>> updatePlayerSkill(@PathVariable final String id, @RequestBody final PlayerSkill playerSkill) {
        final Mono<PlayerSkill> playerSkillMono = Mono.just(playerSkill);
        return playerSkillMono.zipWith(playerService.getPlayer(id))
            .map(tuple -> new PlayerCreationSkillUpdateContext(
                tuple.getT2(),
                tuple.getT1()))
            .flatMap(playerCreationSkillUpdateContextValidator::validate)
            .flatMap(playerService::updatePlayerSkill)
            .flatMap(MapperUtil::mapPlayerToResponse)
            .map(updatedPlayer -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(updatedPlayer))
            .onErrorResume(BaseException.class, ex -> Mono.just(ResponseEntity.status(ex.getStatusCode())
                .contentType(MediaType.APPLICATION_JSON)
                .body(MapperUtil.mapErrorsToPlayerResponse(ex).block())));
    }

    @PatchMapping("/creation/{id}/talents/")
    @Operation(summary = "Patches Player Talents during Creation.", description = "Updates the Player Talents during Creation.")
    public Mono<ResponseEntity<Player>> updatePlayerTalent(@PathVariable final String id, @RequestBody final Talent talent) {
        final Mono<Talent> talentMono = Mono.just(talent);
        return talentMono.zipWith(playerService.getPlayer(id))
            .map(tuple -> new PlayerCreationTalentUpdateContext(
                tuple.getT2(),
                tuple.getT1()
            ))
            .flatMap(playerCreationTalentUpdateContextValidator::validate)
            .flatMap(playerService::updatePlayerTalent)
            .flatMap(MapperUtil::mapPlayerToResponse)
            .map(player -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(player))
            .onErrorResume(BaseException.class, ex -> Mono.just(ResponseEntity.status(ex.getStatusCode())
                .contentType(MediaType.APPLICATION_JSON)
                .body(MapperUtil.mapErrorsToPlayerResponse(ex).block())));
    }

//    @PostMapping("/creation/{id}/reset/")
//    @Operation(summary = "Resets Player Experience during Creation.", description = "Resets the Player Experience during Creation.")
//    public Mono<ResponseEntity<Player>> resetPlayerExperience(@PathVariable final String id) {
//        return playerService.getPlayer(id)
//            .map(PlayerCreationResetExperienceContext::new)
//            .flatMap(playerCreationResetExperienceContextValidator::validate)
//            .flatMap(playerService::resetPlayerExperience)
//            .flatMap(MapperUtil::mapPlayerToResponse)
//            .map(player -> ResponseEntity.ok()
//                .contentType(MediaType.APPLICATION_JSON)
//                .body(player))
//            .onErrorResume(BaseException.class, ex -> Mono.just(ResponseEntity.status(ex.getStatusCode())
//                .contentType(MediaType.APPLICATION_JSON)
//                .body(MapperUtil.mapErrorsToPlayerResponse(ex).block())));
//    }

    @PostMapping("/creation/{id}/lock/")
    @Operation(summary = "Locks Creation Experience Spending.", description = "Ends Player Character Creation and locks experience spending.")
    public Mono<ResponseEntity<Player>> lockPlayerCreation(@PathVariable final String id) {
        return playerService.getPlayer(id)
            .map(PlayerCreationLockContext::new)
            .flatMap(playerService::lockPlayerCreation)
            .flatMap(MapperUtil::mapPlayerToResponse)
            .map(player -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(player))
            .onErrorResume(BaseException.class, ex -> Mono.just(ResponseEntity.status(ex.getStatusCode())
                .contentType(MediaType.APPLICATION_JSON)
                .body(MapperUtil.mapErrorsToPlayerResponse(ex).block())));
    }
}
