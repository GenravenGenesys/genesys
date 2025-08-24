package com.github.genraven.genesys.constants;

public enum EndpointRegistry {
    TALENTS_ALL(new TalentPath("/", CommonSegments.TALENTS)),
    TALENTS_CREATE(new TalentPath("/{name}", CommonSegments.TALENTS)),
    TALENTS_GET(new TalentPath("/{id}", CommonSegments.TALENTS)),
    TALENTS_UPDATE(new TalentPath("/{id}", CommonSegments.TALENTS)),

    CAMPAIGN_TALENTS_ALL(new TalentPath("/", CommonSegments.CAMPAIGN_TALENTS)),
    CAMPAIGN_TALENTS_ADD(new TalentPath("/", CommonSegments.CAMPAIGN_TALENTS)),
    CAMPAIGN_TALENTS_BY_TIER(new TalentPath("/tiers/{tier}", CommonSegments.CAMPAIGN_TALENTS));

    private final Paths path;

    EndpointRegistry(Paths path) {
        this.path = path;
    }

    public String uri() {
        return path.build();
    }
}