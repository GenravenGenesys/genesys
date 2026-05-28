package com.github.genraven.genesys.service;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class CombatResolutionService {

    public Mono<CombatLogEntry> executeCommit(ResolveChoicesRequest request) {
        CombatLogEntry log = new CombatLogEntry();
        log.setRollSessionId(request.getRollSessionId());

        // 1. Fetch live instances from active session state/cache
        // (Mocked lookups - pull real records from your active map state here)
        EnemyInstance target = new EnemyInstance();

        // 2. Loop through what the user spent their currency on
        for (ResolveChoicesRequest.SelectedChoice choice : request.getSelectedChoices()) {
            switch (choice.optionId) {
                case "activate_critical":
                    // Run your separate d100 critical roll loop
                    int viciousBonus = 10; // resolved from our previous prompt logic
                    int critRoll = (int)(Math.random() * 100) + (choice.activationCount * 10) + viciousBonus;

                    log.addNarrativeLine("Critical Injury triggered! Rolled " + critRoll + " on the Critical Table.");
                    // target.addCriticalInjury(critRoll);
                    break;

                case "activate_blast":
                    log.addNarrativeLine("Blast triggered! Adjacent targets take damage.");
                    break;

                case "add_boost_next_ally":
                    log.addNarrativeLine("Attacker spent 2 Advantage to pass a Boost Die to the next ally.");
                    // activeCampaignState.addGlobalModifier(ModifierType.BOOST_DICE, 1);
                    break;
            }
        }

        // 3. Deduct base wounds computed from Step 1 and updated by selections
        // target.setCurrentWounds(target.getCurrentWounds() - finalComputedWounds);

        log.setFinalSummary("Combat interactions successfully processed.");
        return Mono.just(log);
    }
}
