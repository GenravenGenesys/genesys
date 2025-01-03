package com.github.genraven.genesys.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.github.genraven.genesys.domain.Activation;
import com.github.genraven.genesys.domain.talent.Talent;
import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.repository.CampaignRepository;
import com.github.genraven.genesys.repository.TalentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TalentServiceTest {

    @Mock
    private TalentRepository talentRepository;

    @Mock
    private CampaignRepository campaignRepository;

    @InjectMocks
    private TalentService talentService;

    private Campaign campaign;

    @BeforeEach
    void setUp() {
        campaign = new Campaign("test");
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllTalents() {
        Talent talent1 = new Talent("Talent1");
        Talent talent2 = new Talent("Talent2");
        when(talentRepository.findAll()).thenReturn(Flux.just(talent1, talent2));

        Flux<Talent> result = talentService.getAllTalents();

        StepVerifier.create(result)
                .expectNext(talent1)
                .expectNext(talent2)
                .verifyComplete();
    }

    @Test
    void getTalent() {
        Talent talent = new Talent("Talent1");
        when(talentRepository.findById("Talent1")).thenReturn(Mono.just(talent));

        Mono<Talent> result = talentService.getTalent("Talent1");

        StepVerifier.create(result)
                .expectNext(talent)
                .verifyComplete();
    }

    @Test
    void createTalent() {
        Talent talent = new Talent("Talent1");
        when(talentRepository.save(any(Talent.class))).thenReturn(Mono.just(talent));

        Mono<Talent> result = talentService.createTalent("Talent1");

        StepVerifier.create(result)
                .expectNext(talent)
                .verifyComplete();
    }

    @Test
    void updateTalent() {
        Talent existingTalent = new Talent("Talent1");
        Talent updatedTalent = new Talent("Talent1");
        updatedTalent.setActivation(Activation.PASSIVE);
        when(talentRepository.findById("Talent1")).thenReturn(Mono.just(existingTalent));
        when(talentRepository.save(any(Talent.class))).thenReturn(Mono.just(updatedTalent));

        Mono<Talent> result = talentService.updateTalent("Talent1", updatedTalent);

        StepVerifier.create(result)
                .expectNextMatches(talent -> Activation.PASSIVE.equals(talent.getActivation()))
                .verifyComplete();
    }

    @Test
    void getTalentsForCurrentCampaign() {
        campaign.setTalentIds(Arrays.asList("Talent1", "Talent2"));
        Talent talent1 = new Talent("Talent1");
        Talent talent2 = new Talent("Talent2");

        when(campaignRepository.findByCurrent(true)).thenReturn(Mono.just(campaign));
        when(talentRepository.findById("Talent1")).thenReturn(Mono.just(talent1));
        when(talentRepository.findById("Talent2")).thenReturn(Mono.just(talent2));

        Mono<List<Talent>> result = talentService.getTalentsForCurrentCampaign();

        StepVerifier.create(result)
                .expectNextMatches(talents -> talents.containsAll(Arrays.asList(talent1, talent2)))
                .verifyComplete();
    }

    @Test
    void addTalentToCurrentCampaign() {
        campaign.setTalentIds(new ArrayList<>(Arrays.asList("Talent1", "Talent2")));

        when(campaignRepository.findByCurrent(true)).thenReturn(Mono.just(campaign));
        when(campaignRepository.save(any(Campaign.class))).thenReturn(Mono.just(campaign));

        Mono<Campaign> result = talentService.addTalentToCurrentCampaign("Talent3");

        StepVerifier.create(result)
                .expectNextMatches(updatedCampaign -> updatedCampaign.getTalentIds().contains("Talent3"))
                .verifyComplete();
    }

    @Test
    void getTalentsForCurrentCampaignByTier() {
        campaign.setTalentIds(Arrays.asList("Talent1", "Talent2", "Talent3"));
        Talent talent1 = new Talent("Talent1");
        talent1.setTier(Talent.Tier.FIRST);
        Talent talent2 = new Talent("Talent2");
        talent2.setTier(Talent.Tier.SECOND);
        Talent talent3 = new Talent("Talent3");
        talent3.setTier(Talent.Tier.FIRST);

        when(campaignRepository.findByCurrent(true)).thenReturn(Mono.just(campaign));
        when(talentRepository.findById("Talent1")).thenReturn(Mono.just(talent1));
        when(talentRepository.findById("Talent2")).thenReturn(Mono.just(talent2));
        when(talentRepository.findById("Talent3")).thenReturn(Mono.just(talent3));

        Mono<List<Talent>> result = talentService.getTalentsForCurrentCampaignByTier(Talent.Tier.FIRST);

        StepVerifier.create(result)
                .expectNextMatches(talents -> talents.size() == 2 && talents.containsAll(Arrays.asList(talent1, talent3)))
                .verifyComplete();
    }
}

