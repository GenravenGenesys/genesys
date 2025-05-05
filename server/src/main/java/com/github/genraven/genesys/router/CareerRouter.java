package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.CareerHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class CareerRouter {
    @Bean
    public RouterFunction<ServerResponse> careerRouterMethod(final CareerHandler careerHandler) {
        return RouterFunctions.route()
                .nest(RequestPredicates.path("/api"), builder -> builder
                        .path("/careers", careerBuilder -> careerBuilder
                                .GET("/", careerHandler::getAllCareers)
                                .POST("/{name}", careerHandler::createCareer)
                                .GET("/{name}", careerHandler::getCareer)
                                .PUT("/{name}", careerHandler::updateCareer)
                        )
                )
                .build();
    }
}
