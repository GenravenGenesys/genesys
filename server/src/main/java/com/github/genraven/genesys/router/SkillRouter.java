package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.SkillHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class SkillRouter {

    @Bean
    public RouterFunction<ServerResponse> skillRouterMethod(final SkillHandler skillHandler) {
        return RouterFunctions.route()
                .nest(RequestPredicates.path("/api"), builder -> builder
                        .path("/skills", skillBuilder -> skillBuilder
                                .GET("/", skillHandler::getAllSkills)
                                .POST("/{name}", skillHandler::createSkill)
                                .GET("/{name}", skillHandler::getSkill)
                                .PUT("/{name}", skillHandler::updateSkill)
                        )
                        .path("campaigns/skills/", campaignSkillBuilder -> campaignSkillBuilder
                                .GET(skillHandler::getSkillsForCurrentCampaign)
                                .POST(skillHandler::addSkillToCurrentCampaign)
                        )
                )
                .build();
    }
}
