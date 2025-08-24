package com.github.genraven.genesys.configuration;

import com.mongodb.lang.NonNull;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;
import org.springframework.data.mongodb.config.EnableReactiveMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.reactive.config.EnableWebFlux;

import java.time.Duration;
import java.util.List;

@Configuration
@EnableReactiveMongoRepositories(basePackages = "com.github.genraven.genesys.repository")
@EnableReactiveMongoAuditing
@RequiredArgsConstructor
@EnableWebFlux
public class Config extends AbstractReactiveMongoConfiguration {

    private final ApplicationProperties applicationProps;

    @Value("${spring.data.mongodb.uri}")
    private String connectionString;

    @Override
    public @NonNull MongoClient reactiveMongoClient() {
        return MongoClients.create(connectionString);
    }
    @Override
    protected @NonNull String getDatabaseName() {
        return "genesys";
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final var source = new UrlBasedCorsConfigurationSource();
        final var config = new CorsConfiguration();
        final var origins = List.of(applicationProps.clientOriginUrl());
        final var headers = List.of(HttpHeaders.AUTHORIZATION, HttpHeaders.CONTENT_TYPE);
        final var methods = List.of(HttpMethod.GET.name());
        final var maxAge = Duration.ofSeconds(86400);

        config.setAllowedOrigins(origins);
        config.setAllowedHeaders(headers);
        config.setAllowedMethods(methods);
        config.setMaxAge(maxAge);

        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public CorsWebFilter corsWebFilter() {
        final var configSource = this.corsConfigurationSource();

        return new CorsWebFilter(configSource);
    }
}
