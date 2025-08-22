package com.github.genraven.genesys.router;

import com.github.genraven.genesys.constants.CommonSegments;
import com.github.genraven.genesys.handler.TalentHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.*;

@Configuration
public class TalentRouter {

    @Bean
    public RouterFunction<ServerResponse> talentRouterMethod(final TalentHandler talentHandler) {
        return RouterFunctions.route()
                .nest(RequestPredicates.path(CommonSegments.API.build()), builder -> builder

                        // /api/talents
                        .nest(RequestPredicates.path(CommonSegments.TALENTS.build()), talentBuilder -> talentBuilder
                                .GET("/", talentHandler::getAllTalents)
                                .POST("/{name}", talentHandler::createTalent)
                                .GET("/{id}", talentHandler::getTalent)
                                .PUT("/{id}", talentHandler::updateTalent)
                        )

                        // /api/campaigns/talents
                        .nest(RequestPredicates.path(CommonSegments.CAMPAIGN_TALENTS.build()), campaignTalentBuilder -> campaignTalentBuilder
                                .GET("/", talentHandler::getTalentsForCurrentCampaign)
                                .POST("/", talentHandler::addTalentToCurrentCampaign)
                                .GET("/tiers/{tier}", talentHandler::getTalentsForCurrentCampaignByTier)
                        )
                )
                .build();
    }
}