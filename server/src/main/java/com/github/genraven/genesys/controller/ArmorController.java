package com.github.genraven.genesys.controller;
import com.github.genraven.genesys.domain.equipment.Armor;
import com.github.genraven.genesys.service.equipment.ArmorService;
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
@RequestMapping("/api/equipment/armor")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Armor Controller", description = "Endpoints for managing armor")
public class ArmorController extends AbstractController {

    private final ArmorService armorService;

    @GetMapping("/")
    @Operation(summary = "Get all armors", description = "Retrieve a list of all armors.")
    public Mono<ResponseEntity<List<Armor>>> getAllArmors() {
        return armorService.getAllArmors()
            .collectList()
            .map(armors -> {
                if (CollectionUtils.isEmpty(armors)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(armors);
            });
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get armor by id", description = "Retrieve a specific armor by its name.")
    public Mono<ResponseEntity<Armor>> getArmor(@PathVariable final String id) {
        return armorService.getArmor(id)
            .map(armor -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(armor))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/{name}")
    @Operation(summary = "Create a new armor", description = "Create a new armor with the specified name.")
    public Mono<ResponseEntity<Armor>> createArmor(@PathVariable final String name) {
        return armorService.createArmor(name)
            .map(armor -> ResponseEntity.created(getURI(armor.getName())).body(armor));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing armor", description = "Update the details of an existing armor.")
    public Mono<ResponseEntity<Armor>> updateArmor(@PathVariable final String id, @RequestBody final Armor armor) {
        return armorService.updateArmor(id, armor)
            .map(arm -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(arm))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
