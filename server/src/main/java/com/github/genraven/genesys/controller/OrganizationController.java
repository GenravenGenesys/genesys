package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.domain.lore.Organization;
import com.github.genraven.genesys.service.lore.OrganizationService;
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
@RequestMapping("/api/lore/organizations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Organization Controller", description = "Endpoints for managing organizations")
public class OrganizationController extends AbstractController {
    
    private final OrganizationService organizationService;

    @GetMapping("/")
    @Operation(summary = "Get all organizations", description = "Retrieve a list of all organizations.")
    public Mono<ResponseEntity<List<Organization>>> getAllOrganizations() {
        return organizationService.getAllOrganizations()
            .collectList()
            .map(organizations -> {
                if (CollectionUtils.isEmpty(organizations)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(organizations);
            });
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get organization by id", description = "Retrieve a specific organization by its name.")
    public Mono<ResponseEntity<Organization>> getOrganization(@PathVariable final String id) {
        return organizationService.getOrganization(id)
            .map(organization -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(organization))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/{name}")
    @Operation(summary = "Create a new organization", description = "Create a new organization with the specified name.")
    public Mono<ResponseEntity<Organization>> createOrganization(@PathVariable final String name) {
        return organizationService.createOrganization(name)
            .map(organization -> ResponseEntity.created(getURI(organization.getName())).body(organization));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing organization", description = "Update the details of an existing organization.")
    public Mono<ResponseEntity<Organization>> updateOrganization(@PathVariable final String id, @RequestBody final Organization organization) {
        return organizationService.updateOrganization(id, organization)
            .map(org -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(org))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
