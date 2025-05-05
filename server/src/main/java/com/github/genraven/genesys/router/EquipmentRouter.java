package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.EquipmentHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class EquipmentRouter {

    @Bean
    public RouterFunction<ServerResponse> equipmentRouterMethod(final EquipmentHandler equipmentHandler) {
        return RouterFunctions.route()
                .nest(RequestPredicates.path("/api"), builder -> builder
                        .path("/equipment/armors", armorBuilder -> armorBuilder
                                .GET("/", equipmentHandler::getAllArmors)
                                .POST("/{name}", equipmentHandler::createArmor)
                                .PUT("/{name}", equipmentHandler::updateArmor)
                                .GET("/{name}", equipmentHandler::getArmor)
                        )
                        .path("/equipment/weapons", weaponBuilder -> weaponBuilder
                                .GET("/", equipmentHandler::getAllWeapons)
                                .POST("/{name}", equipmentHandler::createWeapon)
                                .PUT("/{name}", equipmentHandler::updateWeapon)
                                .GET("/{name}", equipmentHandler::getWeapon)
                        )
                        .path("/equipment/gears", gearBuilder -> gearBuilder
                                .GET("/", equipmentHandler::getAllGears)
                                .POST("/{name}", equipmentHandler::createGear)
                                .PUT("/{name}", equipmentHandler::updateGear)
                                .GET("/{name}", equipmentHandler::getGear)
                        )
                )
                .build();
    }
}
