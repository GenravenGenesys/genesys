package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.QualityHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class QualityRouter {

    @Bean
    public RouterFunction<ServerResponse> qualityRouterMethod(final QualityHandler qualityHandler) {
        return RouterFunctions.route()
                .nest(RequestPredicates.path("/api"), builder -> builder
                        .path("/qualities", qualityBuilder -> qualityBuilder
                                .GET("/", qualityHandler::getAllQualities)
                                .GET("/{name}", qualityHandler::getQuality)
                                .POST("/{name}", qualityHandler::createQuality)
                                .PUT("/{name}", qualityHandler::updateQuality)
                        )
                )
                .build();
    }
}
