package com.github.genraven.genesys.util;

import java.util.NoSuchElementException;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.campaign.Session;

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

}
