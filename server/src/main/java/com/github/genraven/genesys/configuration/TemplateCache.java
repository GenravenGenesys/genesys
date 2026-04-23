package com.github.genraven.genesys.configuration;

import com.github.genraven.genesys.domain.actor.adversary.AdversaryTemplate;
import com.github.genraven.genesys.domain.equipment.ItemTemplate;
import com.github.genraven.genesys.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TemplateCache {

    @Autowired
    private CampaignRepository repository;

    private final Map<String, ItemTemplate> itemCache = new ConcurrentHashMap<>();
    private final Map<String, AdversaryTemplate> adversaryCache = new ConcurrentHashMap<>();

    private String activeCampaignId;

    public void loadCampaign(String campaignId) {
        this.activeCampaignId = campaignId;
        repository.findById(campaignId)
            .doOnNext(campaign -> {
                itemCache.clear();
                adversaryCache.clear();

                campaign.getCompendium().getItems().forEach(t -> itemCache.put(t.getId(), t));
                campaign.getCompendium().getAdversaries().forEach(e -> adversaryCache.put(e.getId(), e));

                System.out.println("Cache initialized for campaign: " + campaignId);
            })
            .subscribe();
    }

    public ItemTemplate getItem(String id) { return itemCache.get(id); }
    public AdversaryTemplate getAdversary(String id) { return adversaryCache.get(id); }
}
