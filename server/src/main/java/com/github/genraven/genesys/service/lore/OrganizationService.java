package com.github.genraven.genesys.service.lore;

import com.github.genraven.genesys.domain.lore.Lore;
import com.github.genraven.genesys.domain.lore.Organization;
import com.github.genraven.genesys.repository.lore.OrganizationRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;

    public Flux<Organization> getAllOrganizations() {
        return organizationRepository.findAll();
    }

    public Mono<Organization> createOrganization(final String name) {
        return organizationRepository.save(new Organization(new Lore(name)));
    }

    public Mono<Organization> getOrganization(final String name) {
        return organizationRepository.findById(name);
    }

    public Mono<Organization> updateOrganization(final String name, final Organization organization) {
        return getOrganization(name).map(org -> {
            org.setDisbanded(organization.getDisbanded());
            org.setFounded(organization.getFounded());
            org.setNickname(organization.getNickname());
            org.setMembersName(organization.getMembersName());
            org.setOrgType(organization.getOrgType());
            org.setDescription(organization.getDescription());
            return org;
        }).flatMap(organizationRepository::save);
    }
}
