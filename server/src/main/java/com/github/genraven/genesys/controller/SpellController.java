package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.domain.spell.Spell;
import com.github.genraven.genesys.service.SpellService;
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
@RequestMapping("/api/spells")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Spell Controller", description = "Endpoints for managing spells")
public class SpellController extends AbstractController {

    private final SpellService spellService;

    @GetMapping("/")
    @Operation(summary = "Get all spells", description = "Retrieve a list of all spell words that can be used.")
    public Mono<ResponseEntity<List<Spell>>> getAllSpells() {
        return spellService.getAllSpells()
            .collectList()
            .map(spells -> {
                if (CollectionUtils.isEmpty(spells)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(spells);
            });
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get spell by id", description = "Retrieve a specific spell by its name.")
    public Mono<ResponseEntity<Spell>> getSpell(@PathVariable final String id) {
        return spellService.getSpell(id)
            .map(spell -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(spell))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/{name}")
    @Operation(summary = "Create a new spell", description = "Create a new spell with the specified name.")
    public Mono<ResponseEntity<Spell>> createSpell(@PathVariable final String name) {
        return spellService.createSpell(name)
            .map(spell -> ResponseEntity.created(getURI(spell.getName())).body(spell));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing spell", description = "Update the details of an existing spell.")
    public Mono<ResponseEntity<Spell>> updateSpell(@PathVariable final String id, @RequestBody final Spell spell) {
        return spellService.updateSpell(id, spell)
            .map(sp -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(sp))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
