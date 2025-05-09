package com.github.genraven.genesys.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class RouterConfig {
    @Bean
    public RouterFunction<ServerResponse> routerFunction() {
        return RouterFunctions.route()
                .GET("/{path:^(?!api).*}", request ->
                        ServerResponse.ok().contentType(MediaType.TEXT_HTML)
                                .bodyValue(new ClassPathResource("/static/index.html"))
                )
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> staticResources() {
        return RouterFunctions.resources("/assets/**", new ClassPathResource("static/assets/"));
    }

}

