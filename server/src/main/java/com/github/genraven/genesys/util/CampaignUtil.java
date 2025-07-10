package com.github.genraven.genesys.util;

import java.util.NoSuchElementException;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.campaign.Session;
import reactor.core.publisher.Mono;

public final class CampaignUtil {

    public static Session getSessionFromCampaign(final String name, final Campaign campaign) {
        if (campaign == null || campaign.getSessions() == null) {
            throw new IllegalArgumentException("Campaign or session list cannot be null");
        }

        return campaign.getSessions().stream()
                .filter(session -> name.equals(session.getName()))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Session '" + name + "' not found in campaign"));
    }

    public static Mono<Session> getMonoSessionFromCampaign(String name, Campaign campaign) {
        if (campaign == null || campaign.getSessions() == null) {
            return Mono.error(new IllegalArgumentException("Campaign or session list cannot be null"));
        }

        return campaign.getSessions().stream()
            .filter(session -> name.equals(session.getName()))
            .findFirst()
            .map(Mono::just)
            .orElseGet(() -> Mono.error(new NoSuchElementException("Session '" + name + "' not found in campaign")));
    }

}
