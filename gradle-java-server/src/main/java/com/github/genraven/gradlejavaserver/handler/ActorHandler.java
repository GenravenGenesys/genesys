package com.github.genraven.gradlejavaserver.handler;

import com.github.genraven.gradlejavaserver.domain.actor.Actor;
import com.github.genraven.gradlejavaserver.domain.actor.npc.MinionActor;
import com.github.genraven.gradlejavaserver.domain.actor.npc.Nemesis;
import com.github.genraven.gradlejavaserver.domain.actor.npc.Rival;
import com.github.genraven.gradlejavaserver.domain.actor.player.Player;
import com.github.genraven.gradlejavaserver.service.actor.MinionService;
import com.github.genraven.gradlejavaserver.service.actor.NemesisService;
import com.github.genraven.gradlejavaserver.service.actor.PlayerService;
import com.github.genraven.gradlejavaserver.service.actor.RivalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;

import static com.github.genraven.gradlejavaserver.constants.CommonConstants.NAME;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
public class ActorHandler {

    private final PlayerService playerService;
    private final RivalService rivalService;
    private final NemesisService nemesisService;
    private final MinionService minionService;

    @Autowired
    public ActorHandler(final PlayerService playerService, final NemesisService nemesisService,
                        final RivalService rivalService, final MinionService minionService) {
        this.playerService = playerService;
        this.nemesisService = nemesisService;
        this.rivalService = rivalService;
        this.minionService = minionService;
    }

    public Mono<ServerResponse> getAllPlayers(final ServerRequest serverRequest) {
        return playerService.getAllPlayers().collectList().flatMap(players -> {
            if (players.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(players));
        });
    }

    public Mono<ServerResponse> getPlayer(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return playerService.getPlayer(name)
                .flatMap(player -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(player)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> createPlayer(final ServerRequest serverRequest) {
        return playerService.createPlayer(serverRequest.pathVariable(NAME))
                .flatMap(player -> ServerResponse.created(getURI(player)).bodyValue(player));
    }

    public Mono<ServerResponse> updatePlayer(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<Player> playerMono = serverRequest.bodyToMono(Player.class);
        return playerMono
                .flatMap(player -> playerService.updatePlayer(name, player))
                .flatMap(player -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(player)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> getAllNemeses(final ServerRequest serverRequest) {
        return nemesisService.getAllNemeses().collectList().flatMap(nemeses -> {
            if (nemeses.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(nemeses));
        });
    }

    public Mono<ServerResponse> getNemesis(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return nemesisService.getNemesis(name)
                .flatMap(nemesis -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(nemesis)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> createNemesis(final ServerRequest serverRequest) {
        return nemesisService.createNemesis(serverRequest.pathVariable("name"))
                .flatMap(nemesis -> ServerResponse.created(getURI(nemesis)).bodyValue(nemesis));
    }

    public Mono<ServerResponse> updateNemesis(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<Nemesis> nemesisMono = serverRequest.bodyToMono(Nemesis.class);
        return nemesisMono
                .flatMap(nemesis -> nemesisService.updateNemesis(name, nemesis))
                .flatMap(nemesis -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(nemesis)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> getAllRivals(final ServerRequest serverRequest) {
        return rivalService.getAllRivals().collectList().flatMap(rivals -> {
            if (rivals.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(rivals));
        });
    }

    public Mono<ServerResponse> getRival(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return rivalService.getRival(name)
                .flatMap(rival -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(rival)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> createRival(final ServerRequest serverRequest) {
        return rivalService.createRival(serverRequest.pathVariable("name"))
                .flatMap(rival -> ServerResponse.created(getURI(rival)).bodyValue(rival));
    }

    public Mono<ServerResponse> updateRival(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<Rival> rivalMono = serverRequest.bodyToMono(Rival.class);
        return rivalMono
                .flatMap(rival -> rivalService.updateRival(name, rival))
                .flatMap(rival -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(rival)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> getAllMinions(final ServerRequest serverRequest) {
        return minionService.getAllMinions().collectList().flatMap(minions -> {
            if (minions.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(minions));
        });
    }

    public Mono<ServerResponse> getMinion(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return minionService.getMinion(name)
                .flatMap(minionActor -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(minionActor)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> createMinion(final ServerRequest serverRequest) {
        return minionService.createMinion(serverRequest.pathVariable("name"))
                .flatMap(minionActor -> ServerResponse.created(getURI(minionActor)).bodyValue(minionActor));
    }

    public Mono<ServerResponse> updateMinion(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<MinionActor> minionMono = serverRequest.bodyToMono(MinionActor.class);
        return minionMono
                .flatMap(minionActor -> minionService.updateMinion(name, minionActor))
                .flatMap(minionActor -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(minionActor)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    private URI getURI(final Actor actor) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(actor.getName()).toUri();
    }
}
