package com.github.genraven.genesys.constants;

public class CommonSegments {
    public static final Paths API = new BasePath("/api", null);
    public static final Paths TALENTS = new BasePath("/talents", API);
    public static final Paths CAMPAIGN_TALENTS = new BasePath("/campaigns/talents", API);
}
