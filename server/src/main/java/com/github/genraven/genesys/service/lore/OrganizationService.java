package com.github.genraven.genesys.service.lore;

import com.github.genraven.genesys.domain.lore.Lore;
import com.github.genraven.genesys.domain.lore.Organization;
import com.github.genraven.genesys.repository.lore.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class OrganizationService {

    private final OrganizationRepository organizationRepository;

    @Autowired
    public OrganizationService(final OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

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
            org.setSettings(organization.getSettings());
            org.setDisbanded(organization.getDisbanded());
            org.setFounded(organization.getFounded());
            org.setNickname(organization.getNickname());
            org.setMembersName(organization.getMembersName());
            org.setOrgType(organization.getOrgType());
            return org;
        }).flatMap(organizationRepository::save);
    }
}
