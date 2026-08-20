package com.github.genraven.genesys.service;

import com.github.genraven.genesys.configuration.GenesysTemplateCache;
import com.github.genraven.genesys.domain.equipment.ItemInstance;
import com.github.genraven.genesys.domain.equipment.ItemTemplate;
import com.github.genraven.genesys.domain.quality.EquipmentQuality;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CalculationService {

    @Autowired
    private GenesysTemplateCache cache;

    /**
     * Resolves the final weapon characteristics including any applied modifications.
     */
    public int calculateFinalWeaponDamage(ItemInstance instance, int actorCharacteristicBonus) {
        ItemTemplate baseTemplate = cache.getItem(instance.getTemplateId());
        int damage = 0;
        if (baseTemplate == null || baseTemplate.getWeaponStats() == null) return damage;

        if (baseTemplate.getWeaponStats().isBrawn()) {
            damage = damage + actorCharacteristicBonus;
        }

        damage = damage + baseTemplate.getWeaponStats().getDamage();

        return damage;
    }

    /**
     * Gathers all applicable item qualities (base + structural attachments).
     */
    public List<EquipmentQuality> resolveActiveQualities(ItemInstance instance) {
        List<EquipmentQuality> finalQualities = new ArrayList<>();
        ItemTemplate baseTemplate = cache.getItem(instance.getTemplateId());

        if (baseTemplate != null) {
            finalQualities.addAll(baseTemplate.getQualities());
        }

        return finalQualities;
    }
}
