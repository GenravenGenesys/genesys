package com.github.genraven.genesys.router;

public final class ApiRoutes {
    private ApiRoutes() {}

    public static final String API = "/api";
    public static final String PLAYERS = "/players";
    public static final String CHARACTERS = "/characters";
    public static final String ID = "/{id}";
    public static final String NAME = "/{name}";

    public static final String PLAYER_BY_NAME = API + PLAYERS + "/{name}";

    public static final String CREATION = API + PLAYERS + "/creation";
    public static final String CAREERS = CREATION + "/{id}/careers/";
    public static final String CAREER_SKILLS = CAREERS + "skills/";
    public static final String CREATION_ARCHETYPES =  API + PLAYERS + CREATION + "/{id}/archetypes/";
    public static final String CREATION_CHARACTERISTICS =  API + PLAYERS + CREATION + "/{id}/characteristics/";
    public static final String SKILLS =  API + PLAYERS + CREATION + "/{id}/skills/";
    public static final String TALENTS =  API + PLAYERS + CREATION + "/{id}/talents/";

    public static final String CAMPAIGN_PLAYERS = API + "/campaigns/{name}/players/";
    public static final String CREATE_PLAYER = API + "/campaigns/{name}/players/{playerName}";

    public static final String CONVERT_PLAYERS = API;
}

