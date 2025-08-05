package com.github.genraven.genesys.handler.actor;

import java.util.List;
import java.util.Map;

import com.github.genraven.genesys.domain.context.player.PlayerCreationArchetypeUpdateContext;
import com.github.genraven.genesys.domain.context.player.PlayerCreationCareerUpdateContext;
import com.github.genraven.genesys.domain.context.player.PlayerCreationSkillUpdateContext;
import com.github.genraven.genesys.exceptions.BaseException;
import com.github.genraven.genesys.util.MapperUtil;
import com.github.genraven.genesys.validator.player.PlayerCreationArchetypeUpdateContextValidator;
import com.github.genraven.genesys.validator.player.PlayerCreationCareerUpdateContextValidator;
import com.github.genraven.genesys.validator.player.PlayerCreationCharacteristicUpdateContextValidator;
import com.github.genraven.genesys.validator.player.PlayerCreationSkillUpdateContextValidator;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.actor.player.PlayerSkill;
import com.github.genraven.genesys.domain.context.player.PlayerCreationCharacteristicUpdateContext;
import com.github.genraven.genesys.domain.talent.Talent;
import com.github.genraven.genesys.handler.BaseHandler;
import com.github.genraven.genesys.service.actor.PlayerService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

import static com.github.genraven.genesys.constants.CommonConstants.ID;
import static com.github.genraven.genesys.constants.CommonConstants.NAME;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
@RequiredArgsConstructor
public class PlayerHandler extends BaseHandler {

    private final PlayerService playerService;
    private final PlayerCreationCareerUpdateContextValidator playerCreationCareerUpdateContextValidator;
    private final PlayerCreationArchetypeUpdateContextValidator playerCreationArchetypeUpdateContextValidator;
    private final PlayerCreationSkillUpdateContextValidator playerCreationSkillUpdateContextValidator;
    private final PlayerCreationCharacteristicUpdateContextValidator playerCreationCharacteristicUpdateContextValidator;

    public Mono<ServerResponse> getAllPlayers(final ServerRequest serverRequest) {
        return playerService.getAllPlayers()
                .flatMap(MapperUtil::mapPlayerToResponse)
                .collectList()
                .flatMap(players -> {
                    if (players.isEmpty()) {
                        return ServerResponse.noContent().build();
                    }
                    return ServerResponse.ok()
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(fromValue(players));
                });
    }

    public Mono<ServerResponse> getPlayer(final ServerRequest serverRequest) {
        final String id = serverRequest.pathVariable(ID);
        return playerService.getPlayer(id)
                .flatMap(MapperUtil::mapPlayerToResponse)
                .flatMap(player -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(player)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> createPlayer(final ServerRequest serverRequest) {
        return playerService.createPlayer(serverRequest.pathVariable("playerName"))
                .flatMap(MapperUtil::mapPlayerToResponse)
                .flatMap(player -> ServerResponse.created(getURI(player.getName())).bodyValue(player));
    }

    public Mono<ServerResponse> updatePlayer(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<Player> playerMono = serverRequest.bodyToMono(Player.class);
        return playerMono
                .flatMap(player -> playerService.updatePlayer(name, player))
                .flatMap(MapperUtil::mapPlayerToResponse)
                .flatMap(player -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(player)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> updatePlayerCareer(final ServerRequest serverRequest) {
        final String id = serverRequest.pathVariable(ID);
        final Mono<Career> careerMono = serverRequest.bodyToMono(Career.class);
        return careerMono.zipWith(playerService.getPlayer(id))
                .map(tuple -> new PlayerCreationCareerUpdateContext(
                        tuple.getT2(),
                        tuple.getT1()
                ))
                .flatMap(playerCreationCareerUpdateContextValidator::validatePlayerCreationCareerUpdateContext)
                .flatMap(playerService::updatePlayerCareer)
                .flatMap(MapperUtil::mapPlayerToResponse)
                .flatMap(player -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(player)))
                .onErrorResume(BaseException.class, ex -> ServerResponse.status(ex.getStatusCode())
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(Map.of("errors", ex.getErrors()))));
    }

    public Mono<ServerResponse> updatePlayerCareerSkills(final ServerRequest serverRequest) {
        final String id = serverRequest.pathVariable(ID);
        final Mono<List<PlayerSkill>> skillsMono = serverRequest.bodyToMono(new ParameterizedTypeReference<>() {
        });
        return skillsMono
                .flatMap(skills -> playerService.updatePlayerCareerSkills(id, skills))
                .flatMap(MapperUtil::mapPlayerToResponse)
                .flatMap(player -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(player)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> updatePlayerArchetype(final ServerRequest serverRequest) {
        final String id = serverRequest.pathVariable(ID);
        final Mono<Archetype> archetypeMono = serverRequest.bodyToMono(Archetype.class);
        return archetypeMono.zipWith(playerService.getPlayer(id))
                .map(tuple -> new PlayerCreationArchetypeUpdateContext(
                        tuple.getT2(),
                        tuple.getT1()))
                .flatMap(playerCreationArchetypeUpdateContextValidator::validatePlayerCreationArchetypeUpdateContext)
                .flatMap(playerService::updatePlayerArchetype)
                .flatMap(MapperUtil::mapPlayerToResponse)
                .flatMap(player -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(player)))
                .onErrorResume(BaseException.class, ex -> ServerResponse.status(ex.getStatusCode())
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(Map.of("errors", ex.getErrors()))));
    }

    public Mono<ServerResponse> updatePlayerCharacteristic(ServerRequest request) {
        final String playerId = request.pathVariable(ID);
        final Mono<Characteristic> characteristicMono = request.bodyToMono(Characteristic.class);
        return characteristicMono.zipWith(playerService.getPlayer(playerId))
                .map(tuple -> new PlayerCreationCharacteristicUpdateContext(
                        tuple.getT2(),
                        tuple.getT1()))
                .flatMap(playerCreationCharacteristicUpdateContextValidator::validatePlayerCreationCharacteristicUpdateContext)
                .flatMap(playerService::updatePlayerCharacteristic)
                .flatMap(MapperUtil::mapPlayerToResponse)
                .flatMap(updatedPlayer -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(updatedPlayer)))
                .onErrorResume(BaseException.class, ex -> ServerResponse.status(ex.getStatusCode())
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(Map.of("errors", ex.getErrors()))));
    }

    public Mono<ServerResponse> updatePlayerSkill(final ServerRequest serverRequest) {
        final String playerId = serverRequest.pathVariable(ID);
        final Mono<PlayerSkill> playerSkillMono = serverRequest.bodyToMono(PlayerSkill.class);
        return playerSkillMono.zipWith(playerService.getPlayer(playerId))
                .map(tuple -> new PlayerCreationSkillUpdateContext(
                        tuple.getT2(),
                        tuple.getT1()))
                .flatMap(playerCreationSkillUpdateContextValidator::validatePlayerCreationSkillUpdateContext)
                .flatMap(playerService::updatePlayerSkill)
                .flatMap(MapperUtil::mapPlayerToResponse)
                .flatMap(updatedPlayer -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(updatedPlayer)))
                .onErrorResume(BaseException.class, ex -> ServerResponse.status(ex.getStatusCode())
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(Map.of("errors", ex.getErrors()))));
    }

    public Mono<ServerResponse> updatePlayerTalent(final ServerRequest serverRequest) {
        final String id = serverRequest.pathVariable(ID);
        final Mono<Talent> talentMono = serverRequest.bodyToMono(Talent.class);
        return talentMono
                .flatMap(talent -> playerService.updatePlayerTalent(id, talent))
                .flatMap(MapperUtil::mapPlayerToResponse)
                .flatMap(player -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(player)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }
}
