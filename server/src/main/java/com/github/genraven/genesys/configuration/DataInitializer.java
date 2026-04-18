package com.github.genraven.genesys.configuration;

import com.github.genraven.genesys.domain.actor.Attribute;
import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.campaign.CampaignCompendium;
import com.github.genraven.genesys.domain.enums.EquipmentType;
import com.github.genraven.genesys.domain.equipment.ArmorStats;
import com.github.genraven.genesys.domain.equipment.ItemTemplate;
import com.github.genraven.genesys.repository.CampaignRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private final CampaignRepository campaignRepository;

    @Override
    public void run(final ApplicationArguments args) {
        campaignRepository.count()
            .filter(count -> count == 0)
            .flatMap(count -> {
                log.info("No campaigns found. Seeding default campaign with Brigandine armor.");

                final var soak = new Attribute(1, 1);
                final var defense = new Attribute(1, 1);
                final var armorStats = new ArmorStats();
                armorStats.setSoak(soak);
                armorStats.setDefense(defense);

                final var brigandine = ItemTemplate.builder()
                    .id(UUID.randomUUID().toString())
                    .name("Brigandine")
                    .type(EquipmentType.ARMOR)
                    .description("A coat of fabric or leather with small oblong steel plates riveted to the inside.")
                    .price(400)
                    .encumbrance(2)
                    .hardPoints(1)
                    .rarity(5)
                    .restricted(false)
                    .amount(1)
                    .qualities(new ArrayList<>())
                    .armorStats(armorStats)
                    .build();

                final var compendium = CampaignCompendium.builder()
                    .items(List.of(brigandine))
                    .build();

                final var campaign = Campaign.builder()
                    .name("Default Campaign")
                    .status(Campaign.Status.Building)
                    .compendium(compendium)
                    .build();

                return campaignRepository.save(campaign);
            })
            .subscribe(
                campaign -> log.info("Seeded default campaign '{}' with id '{}'", campaign.getName(), campaign.getId()),
                error -> log.error("Failed to seed default campaign", error)
            );
    }
}
