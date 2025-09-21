package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.equipment.Armor;
import com.github.genraven.genesys.domain.equipment.Gear;
import com.github.genraven.genesys.domain.equipment.Weapon;
import com.github.genraven.genesys.service.equipment.ArmorService;
import com.github.genraven.genesys.service.equipment.GearService;
import com.github.genraven.genesys.service.equipment.WeaponService;

import com.github.genraven.genesys.validator.equipment.GearValidator;
import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static com.github.genraven.genesys.constants.CommonConstants.NAME;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
@RequiredArgsConstructor
public class EquipmentHandler extends BaseHandler {

    private final ArmorService armorService;
    private final WeaponService weaponService;
    private final GearService gearService;
    private final GearValidator gearValidator;

    public Mono<ServerResponse> getAllArmors(final ServerRequest serverRequest) {
        return armorService.getAllArmors().collectList().flatMap(armors -> {
            if (armors.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(armors));
        });
    }

    public Mono<ServerResponse> createArmor(final ServerRequest serverRequest) {
        return armorService.createArmor(serverRequest.pathVariable(NAME))
                .flatMap(armor -> ServerResponse.created(getURI(armor.getName()))
                        .bodyValue(armor));
    }

    public Mono<ServerResponse> getArmor(final ServerRequest serverRequest) {
        return armorService.getArmor(serverRequest.pathVariable(NAME))
                .flatMap(armor -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(armor))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> updateArmor(final ServerRequest serverRequest) {
        return serverRequest.bodyToMono(Armor.class)
                .flatMap(gear -> armorService.updateArmor(serverRequest.pathVariable(NAME), gear))
                .flatMap(gear -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(gear))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> getAllWeapons(final ServerRequest serverRequest) {
        return weaponService.getAllWeapons().collectList().flatMap(weapons -> {
            if (weapons.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(weapons));
        });
    }

    public Mono<ServerResponse> createWeapon(final ServerRequest serverRequest) {
        return weaponService.createWeapon(serverRequest.pathVariable(NAME))
                .flatMap(weapon -> ServerResponse.created(getURI(weapon.getName()))
                        .bodyValue(weapon));
    }

    public Mono<ServerResponse> getWeapon(final ServerRequest serverRequest) {
        return weaponService.getWeapon(serverRequest.pathVariable(NAME))
                .flatMap(weapon -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(weapon))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> updateWeapon(final ServerRequest serverRequest) {
        return serverRequest.bodyToMono(Weapon.class)
                .flatMap(weapon -> weaponService.updateWeapon(serverRequest.pathVariable(NAME), weapon))
                .flatMap(weapon -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(weapon))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> getAllGears(final ServerRequest serverRequest) {
        return gearService.getAllGears().collectList().flatMap(gears -> {
            if (gears.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(gears));
        });
    }

    public Mono<ServerResponse> createGear(final ServerRequest serverRequest) {
        return gearService.createGear(serverRequest.pathVariable(NAME))
                .flatMap(gear -> ServerResponse.created(getURI(gear.getName()))
                        .bodyValue(gear));
    }

    public Mono<ServerResponse> getGear(final ServerRequest serverRequest) {
        return gearService.getGear(serverRequest.pathVariable(NAME))
                .flatMap(gear -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(gear))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> updateGear(final ServerRequest serverRequest) {
        return serverRequest.bodyToMono(Gear.class)
                .flatMap(gear -> gearService.updateGear(serverRequest.pathVariable(NAME), gear))
                .flatMap(gear -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(gear))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }
}
