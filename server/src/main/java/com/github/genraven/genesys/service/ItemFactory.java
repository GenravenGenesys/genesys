package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.equipment.ItemInstance;
import com.github.genraven.genesys.domain.equipment.ItemTemplate;
import org.springframework.stereotype.Service;

@Service
public class ItemFactory {

    /**
     * Converts a static blueprint into a live, player-owned entity.
     */
    public ItemInstance createInstance(ItemTemplate template, int quantity) {
        ItemInstance instance = new ItemInstance();
        instance.setTemplateId(template.getId());
        instance.setQuantity(quantity);
        return instance;
    }
}
