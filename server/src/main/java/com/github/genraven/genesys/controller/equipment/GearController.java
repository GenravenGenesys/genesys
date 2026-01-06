package com.github.genraven.genesys.controller.equipment;

import com.github.genraven.genesys.controller.AbstractController;
import com.github.genraven.genesys.domain.equipment.Gear;
import com.github.genraven.genesys.service.equipment.GearService;
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
@RequestMapping("/api/equipment/gears")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Gear Controller", description = "Endpoints for managing gear")
public class GearController extends AbstractController {

    private final GearService gearService;

    @GetMapping("/")
    @Operation(summary = "Get all gears", description = "Retrieve a list of all gears.")
    public Mono<ResponseEntity<List<Gear>>> getAllGears() {
        return gearService.getAllGears()
            .collectList()
            .map(gears -> {
                if (CollectionUtils.isEmpty(gears)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(gears);
            });
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get gear by id", description = "Retrieve a specific gear by its name.")
    public Mono<ResponseEntity<Gear>> getGear(@PathVariable final String id) {
        return gearService.getGear(id)
            .map(gear -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(gear))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/{name}")
    @Operation(summary = "Create a new gear", description = "Create a new gear with the specified name.")
    public Mono<ResponseEntity<Gear>> createGear(@PathVariable final String name) {
        return gearService.createGear(name)
            .map(gear -> ResponseEntity.created(getURI(gear.getName())).body(gear));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing gear", description = "Update the details of an existing gear.")
    public Mono<ResponseEntity<Gear>> updateGear(@PathVariable final String id, @RequestBody final Gear gear) {
        return gearService.updateGear(id, gear)
            .map(arm -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(arm))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
