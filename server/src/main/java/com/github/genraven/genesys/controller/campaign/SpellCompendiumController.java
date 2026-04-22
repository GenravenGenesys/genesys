package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.domain.spell.Spell;
import com.github.genraven.genesys.service.SpellCompendiumService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/campaigns/{campaignId}/compendium/spells")
@Tag(name = "Spells", description = "Management of the campaign's custom spell library")
@RequiredArgsConstructor
public class SpellCompendiumController {

    private final SpellCompendiumService spellCompendiumService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get all spells", description = "Retrieves the full library of spells for this setting")
    public Flux<Spell> getSpells(@PathVariable final String campaignId) {
        return spellCompendiumService.findAllByCampaignId(campaignId);
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a new spell", description = "Adds a custom spell definition to the campaign library")
    public Mono<ResponseEntity<Spell>> createSpell(@PathVariable final String campaignId, @RequestBody final Spell newSpell) {
        return spellCompendiumService.addSpell(campaignId, newSpell)
                .map(saved -> ResponseEntity.status(HttpStatus.CREATED).body(saved));
    }

    @PatchMapping(value = "/{spellId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Update a spell", description = "Performs a partial update on a specific spell template")
    public Mono<ResponseEntity<Spell>> updateSpell(@PathVariable final String campaignId, @PathVariable final String spellId,
                                                   @RequestBody final Spell updatedSpell) {
        return spellCompendiumService.updateSpell(campaignId, spellId, updatedSpell)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
