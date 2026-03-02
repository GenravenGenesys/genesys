package com.github.genraven.genesys;

import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@Log4j2
@OpenAPIDefinition(
    info = @Info(
        title = "Genesys API Documentation",
        version = "1.0",
        description = "Interactive API documentation"
    )
)
@SpringBootApplication(exclude={MongoAutoConfiguration.class})
@ConfigurationPropertiesScan
public class GenesysApplication {

	public static void main(final String[] args) {
		SpringApplication.run(GenesysApplication.class, args);
	}


}
