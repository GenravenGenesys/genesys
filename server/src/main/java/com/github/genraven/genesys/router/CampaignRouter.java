package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.CampaignHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class CampaignRouter {

    @Bean
    public RouterFunction<ServerResponse> campaignRouterMethod(final CampaignHandler campaignHandler) {
        return RouterFunctions.route()
                .nest(RequestPredicates.path("/api"), builder -> builder
                        .path("/campaigns", campaignBuilder -> campaignBuilder
                                .GET("/", campaignHandler::getAllCampaigns)
                                .POST("/", campaignHandler::createCampaign)
                                .GET("/{id}", campaignHandler::getCampaign)
                                .PUT("/{id}", campaignHandler::updateCampaign)
                        )
                        .path("/current", currentBuilder -> currentBuilder
                                .PUT(campaignHandler::setCurrentCampaign)
                                .GET(campaignHandler::getCurrentCampaign)
                        )
                )
                .build();
    }
}
