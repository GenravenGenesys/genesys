package com.github.genraven.genesys.controller.equipment;

import com.github.genraven.genesys.controller.AbstractController;
import com.github.genraven.genesys.domain.equipment.Weapon;
import com.github.genraven.genesys.service.equipment.WeaponService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/equipment/weapons")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Weapon Controller", description = "Endpoints for managing weapon")
public class WeaponController extends AbstractController {
    
    private final WeaponService weaponService;

    @GetMapping("/")
    @Operation(summary = "Get all weapons", description = "Retrieve a list of all weapons.")
    public Mono<ResponseEntity<List<Weapon>>> getAllWeapons() {
        return weaponService.getAllWeapons()
            .collectList()
            .map(weapons -> {
                if (CollectionUtils.isEmpty(weapons)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(weapons);
            });
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get weapon by id", description = "Retrieve a specific weapon by its name.")
    public Mono<ResponseEntity<Weapon>> getWeapon(@PathVariable final String id) {
        return weaponService.getWeapon(id)
            .map(weapon -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(weapon))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/{name}")
    @Operation(summary = "Create a new weapon", description = "Create a new weapon with the specified name.")
    public Mono<ResponseEntity<Weapon>> createWeapon(@PathVariable final String name) {
        return weaponService.createWeapon(name)
            .map(weapon -> ResponseEntity.created(getURI(weapon.getName())).body(weapon));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing weapon", description = "Update the details of an existing weapon.")
    public Mono<ResponseEntity<Weapon>> updateWeapon(@PathVariable final String id, @RequestBody final Weapon weapon) {
        return weaponService.updateWeapon(id, weapon)
            .map(arm -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(arm))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
