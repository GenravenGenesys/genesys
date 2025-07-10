package com.github.genraven.genesys;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(
    info = @Info(
        title = "Genesys API Documentation",
        version = "1.0",
        description = "Interactive API documentation"
    )
)
@SpringBootApplication(exclude={MongoAutoConfiguration.class})
public class GenesysApplication {

	public static void main(String[] args) {
		SpringApplication.run(GenesysApplication.class, args);
	}

}
