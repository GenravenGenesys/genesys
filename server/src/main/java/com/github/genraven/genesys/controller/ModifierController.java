package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.domain.modifier.Modifier;
import com.github.genraven.genesys.service.ModifierService;
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
@RequestMapping("/api/modifiers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Modifier Controller", description = "Endpoints for managing modifiers")
public class ModifierController {

    private final ModifierService modifierService;

    @GetMapping
    @Operation(summary = "Get all modifier type", description = "Retrieve a list of all modifiers that can be applied.")
    public Mono<ResponseEntity<List<Modifier.Type>>> getModifiers() {
        return modifierService.getModifiers()
            .collectList()
            .map(modifiers -> {
                if (CollectionUtils.isEmpty(modifiers)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(modifiers);
            });
    }
}
