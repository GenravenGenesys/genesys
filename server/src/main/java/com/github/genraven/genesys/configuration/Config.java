package com.github.genraven.genesys.configuration;

import com.mongodb.lang.NonNull;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;
import org.springframework.data.mongodb.config.EnableReactiveMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

@Configuration
@EnableReactiveMongoRepositories(basePackages = "com.github.genraven.genesys.repository")
@EnableReactiveMongoAuditing
public class Config extends AbstractReactiveMongoConfiguration {

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
}
