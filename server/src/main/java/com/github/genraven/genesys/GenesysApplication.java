package com.github.genraven.genesys;

import io.github.cdimascio.dotenv.Dotenv;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

import static java.util.Arrays.stream;

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

    enum DotEnv {
        PORT,
        CLIENT_ORIGIN_URL,
        OKTA_OAUTH2_ISSUER,
        OKTA_OAUTH2_AUDIENCE
    }

	public static void main(final String[] args) {
        dotEnvSafeCheck();

		SpringApplication.run(GenesysApplication.class, args);
	}

    private static void dotEnvSafeCheck() {
        final var dotenv = Dotenv.configure()
            .ignoreIfMissing()
            .load();

        stream(DotEnv.values())
            .map(DotEnv::name)
            .filter(varName -> dotenv.get(varName, "").isEmpty())
            .findFirst()
            .ifPresent(varName -> {
                log.error("[Fatal] Missing or empty environment variable: {}", varName);

                System.exit(1);
            });
    }

}
