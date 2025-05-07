package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.LoreHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class LoreRouter {

    @Bean
    public RouterFunction<ServerResponse> loreRouterMethod(final LoreHandler loreHandler) {
        return RouterFunctions.route()
                .nest(RequestPredicates.path("/api"), builder -> builder
                        .path("/campaigns/{id}/lore", loreBuilder -> loreBuilder
                                .GET("/", loreHandler::getAllLore)
                        )
                        .path("/campaigns/{id}/lore/organizations", organizationBuilder -> organizationBuilder
                                .GET("/", loreHandler::getAllOrganizations)
                                .POST("/{name}", loreHandler::createOrganization)
                                .PUT("/{name}", loreHandler::updateOrganization)
                                .GET("/{name}", loreHandler::getOrganization)
                        )
                )
                .build();
    }
}
