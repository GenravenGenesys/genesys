package com.github.genraven.genesys.domain.equipment;

import lombok.Data;

@Data
public class CombatEffects {
    private int criticalInjuryBonus = 0;
    private int ignoreSoak = 0;
    private int areaDamage = 0;

    private int soak = 0;
    private int meleeDefense = 0;
    private int rangedDefense = 0;

    private boolean ensnare = false;
    private boolean stun = false;
    private boolean disorient = false;
}
