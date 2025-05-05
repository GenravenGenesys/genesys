package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.SpellHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class SpellRouter {

    @Bean
    public RouterFunction<ServerResponse> spellRouterMethod(final SpellHandler spellHandler) {
        return RouterFunctions.route()
                .nest(RequestPredicates.path("/api"), builder -> builder
                        .path("/spells", spellBuilder -> spellBuilder
                                .GET("/", spellHandler::getAllSpells)
                                .POST("/{name}", spellHandler::createSpell)
                                .GET("/{name}", spellHandler::getSpell)
                                .PUT("/{name}", spellHandler::updateSpell)
                        )
                )
                .build();
    }
}
