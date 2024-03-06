package com.github.genraven.gradlejavaserver.router;

import com.github.genraven.gradlejavaserver.handler.TalentHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.*;

@Configuration
public class TalentRouter {

    @Bean
    public RouterFunction<ServerResponse> talentRouterMethod(final TalentHandler talentHandler) {
        return RouterFunctions.route()
                .path(TALENT_PATH, builder -> builder
                        .GET(SLASH, talentHandler::getAllTalents)
                        .POST(NAME_VARIABLE, talentHandler::createTalent)
                        .GET("/{name}", talentHandler::getTalent)
                        .PUT("/{name}", talentHandler::updateTalent))
                .build();
    }
}
