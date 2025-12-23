package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.service.CareerService;
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
@RequestMapping("/api/careers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Career Controller", description = "Endpoints for managing careers")
public class CareerController extends AbstractController {

    private final CareerService careerService;

    @GetMapping("/")
    @Operation(summary = "Get all careers", description = "Retrieve a list of all careers.")
    public Mono<ResponseEntity<List<Career>>> getAllCareers() {
        return careerService.getAllCareers()
            .collectList()
            .map(careers -> {
                if (CollectionUtils.isEmpty(careers)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(careers);
            });
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get career by id", description = "Retrieve a specific career by its name.")
    public Mono<ResponseEntity<Career>> getCareer(@PathVariable final String id) {
        return careerService.getCareer(id)
            .map(career -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(career))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/{name}")
    @Operation(summary = "Create a new career", description = "Create a new career with the specified name.")
    public Mono<ResponseEntity<Career>> createCareer(@PathVariable final String name) {
        return careerService.createCareer(name)
            .map(career -> ResponseEntity.created(getURI(career.getName())).body(career));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing career", description = "Update the details of an existing career.")
    public Mono<ResponseEntity<Career>> updateCareer(@PathVariable final String id, @RequestBody final Career career) {
        return careerService.updateCareer(id, career)
            .map(car -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(car))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
