package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.ActorSkill;
import com.github.genraven.genesys.domain.actor.npc.GroupSkill;
import com.github.genraven.genesys.domain.actor.npc.Minion;
import com.github.genraven.genesys.domain.actor.npc.Nemesis;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.service.actor.MinionService;
import com.github.genraven.genesys.service.actor.NemesisService;
import com.github.genraven.genesys.service.actor.RivalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;

import static com.github.genraven.genesys.constants.CommonConstants.ID;
import static com.github.genraven.genesys.constants.CommonConstants.NAME;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
@RequiredArgsConstructor
public class ActorHandler {

    private final RivalService rivalService;
    private final NemesisService nemesisService;
    private final MinionService minionService;

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
        return nemesisService.createNemesis(serverRequest.pathVariable("nemesisName"))
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

    public Mono<ServerResponse> updateNemesisSkill(final ServerRequest serverRequest) {
        final String id = serverRequest.pathVariable(ID);
        final Mono<ActorSkill> skillMono = serverRequest.bodyToMono(ActorSkill.class);
        return skillMono.flatMap(skill -> nemesisService.updateNemesisSkill(id, skill))
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
        final String id = serverRequest.pathVariable(ID);
        return rivalService.getRival(id)
                .flatMap(rival -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(rival)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> createRival(final ServerRequest serverRequest) {
        final String rivalName = serverRequest.pathVariable("rivalName");
        return rivalService.createRival(rivalName)
                .flatMap(rival -> ServerResponse.created(getURI(rival)).bodyValue(rival));
    }

    public Mono<ServerResponse> updateRival(final ServerRequest serverRequest) {
        final String id = serverRequest.pathVariable(ID);
        final Mono<Rival> rivalMono = serverRequest.bodyToMono(Rival.class);
        return rivalMono
                .flatMap(rival -> rivalService.updateRival(id, rival))
                .flatMap(rival -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(rival)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> updateRivalSkill(final ServerRequest serverRequest) {
        final String id = serverRequest.pathVariable(ID);
        final Mono<ActorSkill> skillMono = serverRequest.bodyToMono(ActorSkill.class);
        return skillMono.flatMap(skill -> rivalService.updateRivalSkill(id, skill))
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
        final String name = serverRequest.pathVariable(ID);
        return minionService.getMinion(name)
                .flatMap(minion -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(minion)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> createMinion(final ServerRequest serverRequest) {
        final String minionName = serverRequest.pathVariable("minionName");
        return minionService.createMinion(minionName)
                .flatMap(minion -> ServerResponse.created(getURI(minion)).bodyValue(minion));
    }

    public Mono<ServerResponse> updateMinion(final ServerRequest serverRequest) {
        final String id = serverRequest.pathVariable(ID);
        final Mono<Minion> minionMono = serverRequest.bodyToMono(Minion.class);
        return minionMono
                .flatMap(minion -> minionService.updateMinion(id, minion))
                .flatMap(minion -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(minion)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> updateMinionSkill(final ServerRequest serverRequest) {
        final String id = serverRequest.pathVariable(ID);
        final Mono<GroupSkill> skillMono = serverRequest.bodyToMono(GroupSkill.class);
        return skillMono.flatMap(skill -> minionService.updateMinionSkill(id, skill))
                .flatMap(minion -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(minion)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    private URI getURI(final Actor actor) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(actor.getName()).toUri();
    }
}