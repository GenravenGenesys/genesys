package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.domain.lore.Lore;
import com.github.genraven.genesys.service.lore.LoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/lore")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Lore Controller", description = "Endpoints for managing lore")
public class LoreController {

    private final LoreService loreService;

    @GetMapping("/")
    @Operation(summary = "Get all lore", description = "Retrieve a list of all lore.")
    public Mono<ResponseEntity<List<Lore>>> getAllLore() {
        return loreService.getAllLore()
            .collectList()
            .map(lores -> {
                if (CollectionUtils.isEmpty(lores)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(lores);
            });
    }
}
