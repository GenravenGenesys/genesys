package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.talent.Talent;
import com.github.genraven.genesys.service.TalentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;

import static com.github.genraven.genesys.constants.CommonConstants.NAME;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
@RequiredArgsConstructor
public class TalentHandler {

    private final TalentService talentService;

    public Mono<ServerResponse> getAllTalents(final ServerRequest serverRequest) {
        return talentService.getAllTalents().collectList().flatMap(talents -> {
            if(talents.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(talents));
        });
    }

    public Mono<ServerResponse> getTalent(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return talentService.getTalent(name)
                .flatMap(talent -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(talent))
                    .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createTalent(final ServerRequest serverRequest) {
        return talentService.createTalent(serverRequest.pathVariable(NAME))
                .flatMap(talent -> ServerResponse.created(getURI(talent)).bodyValue(talent));
    }

    public Mono<ServerResponse> updateTalent(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<Talent> talentMono = serverRequest.bodyToMono(Talent.class);
        return talentMono
                .flatMap(talent -> talentService.updateTalent(name, talent))
                .flatMap(talent -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(talent))
                .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> getTalentsForCurrentCampaign(final ServerRequest serverRequest) {
        return talentService.getTalentsForCurrentCampaign()
                .flatMap(talents -> ServerResponse.ok().bodyValue(talents))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> addTalentToCurrentCampaign(final ServerRequest request) {
        return request.bodyToMono(Talent.class)
                .flatMap(talent -> talentService.addTalentToCurrentCampaign(talent.getId()))
                .flatMap(updatedCampaign -> ServerResponse.ok().bodyValue(updatedCampaign))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> getTalentsForCurrentCampaignByTier(final ServerRequest request) {
        final Talent.Tier tierEnum = Talent.Tier.valueOf(request.pathVariable("tier").toUpperCase());
        return talentService.getTalentsForCurrentCampaignByTier(tierEnum)
                .flatMap(talents -> ServerResponse.ok().bodyValue(talents))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    private URI getURI(final Talent talent) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(talent.getName()).toUri();
    }
}
