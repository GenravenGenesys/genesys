package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.service.CampaignService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static com.github.genraven.genesys.constants.CommonConstants.NAME;
import static com.github.genraven.genesys.constants.CommonConstants.ID;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
@RequiredArgsConstructor
public class CampaignHandler {

    private final CampaignService campaignService;

    public Mono<ServerResponse> getAllCampaigns(final ServerRequest serverRequest) {
        return campaignService.getAllCampaigns().collectList().flatMap(campaigns -> {
            if(campaigns.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(campaigns));
        });
    }

    public Mono<ServerResponse> getCampaign(final ServerRequest serverRequest) {
        final String id = serverRequest.pathVariable(ID);
        return campaignService.getCampaign(id)
                .flatMap(campaign -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(campaign))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }
}
