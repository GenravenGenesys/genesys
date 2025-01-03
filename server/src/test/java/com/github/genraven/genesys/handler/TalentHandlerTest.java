package com.github.genraven.genesys.handler;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.github.genraven.genesys.domain.talent.Talent;
import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.service.TalentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.List;

public class TalentHandlerTest {

    @Mock
    private TalentService talentService;

    @InjectMocks
    private TalentHandler talentHandler;

    @Mock
    private ServerRequest serverRequest;

    private Campaign campaign;
    private Talent firstTierPassiveTalent;

    @BeforeEach
    void setUp() {
        campaign = new Campaign("test");
        firstTierPassiveTalent = new Talent("Talent1");
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllTalents_withContent() {
        Talent talent = new Talent("Talent1");
        when(talentService.getAllTalents()).thenReturn(Flux.just(talent));

        Mono<ServerResponse> response = talentHandler.getAllTalents(serverRequest);

        StepVerifier.create(response)
                .expectNextMatches(serverResponse -> serverResponse.statusCode().is2xxSuccessful())
                .verifyComplete();
    }

    @Test
    void getTalent_found() {
        Talent talent = new Talent("Talent1");
        when(talentService.getTalent(any())).thenReturn(Mono.just(talent));
        when(serverRequest.pathVariable("name")).thenReturn("Talent1");

        Mono<ServerResponse> response = talentHandler.getTalent(serverRequest);

        StepVerifier.create(response)
                .expectNextMatches(serverResponse -> serverResponse.statusCode().is2xxSuccessful())
                .verifyComplete();
    }

    @Test
    void createTalent() {
        Talent talent = new Talent("Talent1");
        when(talentService.createTalent(any())).thenReturn(Mono.just(talent));
        when(serverRequest.pathVariable("name")).thenReturn("Talent1");

        Mono<ServerResponse> response = talentHandler.createTalent(serverRequest);

        StepVerifier.create(response)
                .expectNextMatches(serverResponse -> serverResponse.statusCode().is2xxSuccessful())
                .verifyComplete();
    }

    @Test
    void updateTalent() {
        Talent talent = new Talent("Talent1");
        Mono<Talent> talentMono = Mono.just(talent);
        when(serverRequest.pathVariable("name")).thenReturn("Talent1");
        when(serverRequest.bodyToMono(Talent.class)).thenReturn(talentMono);
        when(talentService.updateTalent(any(), any())).thenReturn(Mono.just(talent));

        Mono<ServerResponse> response = talentHandler.updateTalent(serverRequest);

        StepVerifier.create(response)
                .expectNextMatches(serverResponse -> serverResponse.statusCode().is2xxSuccessful())
                .verifyComplete();
    }

    @Test
    void getTalentsForCurrentCampaign() {
        List<Talent> talents = List.of(new Talent("Talent1"), new Talent("Talent2"));
        when(talentService.getTalentsForCurrentCampaign()).thenReturn(Mono.just(talents));

        Mono<ServerResponse> response = talentHandler.getTalentsForCurrentCampaign(serverRequest);

        StepVerifier.create(response)
                .expectNextMatches(serverResponse -> serverResponse.statusCode().is2xxSuccessful())
                .verifyComplete();
    }

    @Test
    void addTalentToCurrentCampaign() {
        Talent talent = new Talent("Talent1");
        campaign.setTalentIds(List.of("Talent1"));
        when(serverRequest.bodyToMono(Talent.class)).thenReturn(Mono.just(talent));
        when(talentService.addTalentToCurrentCampaign(any())).thenReturn(Mono.just(campaign));

        Mono<ServerResponse> response = talentHandler.addTalentToCurrentCampaign(serverRequest);

        StepVerifier.create(response)
                .expectNextMatches(serverResponse -> serverResponse.statusCode().is2xxSuccessful())
                .verifyComplete();
    }

    @Test
    void getTalentsForCurrentCampaignByTier() {
        List<Talent> talents = List.of(new Talent("Talent1"), new Talent("Talent2"));
        when(serverRequest.pathVariable("tier")).thenReturn("First".toUpperCase());
        when(talentService.getTalentsForCurrentCampaignByTier(any())).thenReturn(Mono.just(talents));

        Mono<ServerResponse> response = talentHandler.getTalentsForCurrentCampaignByTier(serverRequest);

        StepVerifier.create(response)
                .expectNextMatches(serverResponse -> serverResponse.statusCode().is2xxSuccessful())
                .verifyComplete();
    }
}
