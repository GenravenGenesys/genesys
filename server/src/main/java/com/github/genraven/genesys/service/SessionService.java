package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.campaign.CampaignSession;
import com.github.genraven.genesys.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class SessionService {

    private final SessionRepository sessionRepository;

    public Flux<CampaignSession> getAllCampaignSessions() {
        return sessionRepository.findAll();
    }

    public Mono<CampaignSession> getCampaignSession(final String id) {
        return sessionRepository.findById(id);
    }

    public Mono<CampaignSession> createCampaignSession(final CampaignSession session) {
        log.info("Creating new session with id: {}", session.getId());
        return sessionRepository.save(session);
    }
}
