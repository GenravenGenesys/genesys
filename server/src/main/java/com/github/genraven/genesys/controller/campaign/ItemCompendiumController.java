package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.domain.equipment.ItemTemplate;
import com.github.genraven.genesys.service.ItemTemplateService;
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
@RequestMapping("/api/campaigns/{campaignId}/compendium/items")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Item Compendium", description = "Management of the campaign's custom equipment library (weapons, armor, gear)")
@RequiredArgsConstructor
public class ItemCompendiumController {

    private final ItemTemplateService itemTemplateService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get all item templates", description = "Retrieves the full library of equipment items for this setting")
    public Flux<ItemTemplate> getItems(@PathVariable final String campaignId) {
        return itemTemplateService.findAllByCampaignId(campaignId);
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a new item", description = "Adds a custom equipment item to the campaign library")
    public Mono<ResponseEntity<ItemTemplate>> createItem(@PathVariable final String campaignId, @RequestBody final ItemTemplate newItem) {
        return itemTemplateService.addItem(campaignId, newItem)
            .map(saved -> ResponseEntity.status(HttpStatus.CREATED).body(saved));
    }

    @PatchMapping(value = "/{itemId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Update an item", description = "Performs a partial update on a specific item template")
    public Mono<ResponseEntity<ItemTemplate>> updateItem(@PathVariable final String campaignId, @PathVariable final String itemId,
                                                          @RequestBody final ItemTemplate updatedItem) {
        return itemTemplateService.updateItem(campaignId, itemId, updatedItem)
            .map(ResponseEntity::ok)
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping(value = "/{itemId}")
    @Operation(summary = "Delete an item", description = "Removes an item template from the campaign library")
    public Mono<ResponseEntity<Void>> deleteItem(@PathVariable final String campaignId, @PathVariable final String itemId) {
        return itemTemplateService.deleteItem(campaignId, itemId)
            .then(Mono.just(ResponseEntity.noContent().<Void>build()));
    }
}
