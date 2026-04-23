import {
    type AdversaryTemplate, type CampaignEncounter,
    CampaignEncounterStatus,
    CampaignEncounterType, CharacteristicType, EquipmentType, type ItemTemplate,
    type PlayerCharacter, type WeaponStats
} from "../api/model";
import type {
    CombatLogEntry,
    EncounterLocation,
    EncounterRangeBand,
    TurnAction
} from "../components/home/sample/test/TestEncounter.tsx";

const sampleArmor = {
    id: "1",
    name: "Padded",
    type: EquipmentType.Armor,
    rarity: 1,
    price: 50,
    description: "Padded",
    restricted: false,
    hardPoints: 0,
    encumbrance: 1,
    weaponStats: {} as WeaponStats,
    amount: 1,
    qualities: [],
    armorStats: {
        defense: {
            current: 0,
            base: 0
        },
        soak: {
            current: 1,
            base: 1
        }
    }
} as ItemTemplate;

const stormTrooperWeapon = {
    id: "st-w1",
    name: "E-11 Blaster Rifle",
    type: "Weapon" as any,
    description: "Standard-issue Imperial blaster rifle",
    price: 900,
    restricted: true,
    encumbrance: 4,
    hardPoints: 3,
    rarity: 4,
    qualities: [],
    amount: 1,
    weaponStats: {
        skill: {id: "ranged-heavy", name: "Ranged (Heavy)", characteristic: CharacteristicType.Agility, type: "Combat", initiative: false, summary: "", description: "", ranks: 0},
        damage: 9,
        critical: 3,
        range: "Medium" as any,
        brawn: false,
    },
    armorStats: {} as any,
} as ItemTemplate;

const stormTrooper: AdversaryTemplate = {
    id: "npc-1",
    name: "Stormtrooper",
    description: "Standard Imperial Stormtrooper",
    type: "Minion" as any,
    characteristics: {
        brawn: {current: 2, base: 2},
        agility: {current: 2, base: 2},
        intellect: {current: 2, base: 2},
        cunning: {current: 2, base: 2},
        willpower: {current: 2, base: 2},
        presence: {current: 1, base: 1},
    },
    derivedStats: {
        woundThreshold: {current: 0, total: 5},
        strainThreshold: {current: 0, total: 5},
        defense: {current: 0, base: 0},
        soak: {current: 5, base: 5},
    },
    equipment: {
        weapons: [stormTrooperWeapon],
        equippedArmor: sampleArmor,
        otherGear: []
    },
    motivations: [],
    skills: [],
    ratings: {combat: 0, social: 0, general: 0},
    size: 1,
}

const imperialOfficerWeapon = {
    id: "io-w1",
    name: "Imperial Blaster Pistol",
    type: "Weapon" as any,
    description: "Standard-issue officer sidearm",
    price: 400,
    restricted: true,
    encumbrance: 1,
    hardPoints: 3,
    rarity: 4,
    qualities: [{id: "q-stun", name: "Stun Setting", description: "", cost: 0, armor: false, weapon: true, stats: {} as any, ranks: 1}],
    amount: 1,
    weaponStats: {
        skill: {id: "ranged-light", name: "Ranged (Light)", characteristic: CharacteristicType.Agility, type: "Combat", initiative: false, summary: "", description: "", ranks: 0},
        damage: 6,
        critical: 3,
        range: "Medium" as any,
        brawn: false,
    },
    armorStats: {} as any,
} as ItemTemplate;

const eliteGuardPike = {
    id: "eg-w1",
    name: "Force Pike",
    type: "Weapon" as any,
    description: "Electrified polearm",
    price: 700,
    restricted: true,
    encumbrance: 3,
    hardPoints: 1,
    rarity: 5,
    qualities: [{id: "q-stun2", name: "Stun Setting", description: "", cost: 0, armor: false, weapon: true, stats: {} as any, ranks: 1}],
    amount: 1,
    weaponStats: {
        skill: {id: "melee", name: "Melee", characteristic: CharacteristicType.Brawn, type: "Combat", initiative: false, summary: "", description: "", ranks: 0},
        damage: 7,
        critical: 3,
        range: "Engaged" as any,
        brawn: false,
    },
    armorStats: {} as any,
} as ItemTemplate;

const eliteGuardBlaster = {
    id: "eg-w2",
    name: "Heavy Blaster Pistol",
    type: "Weapon" as any,
    description: "High-powered sidearm",
    price: 700,
    restricted: true,
    encumbrance: 2,
    hardPoints: 3,
    rarity: 6,
    qualities: [],
    amount: 1,
    weaponStats: {
        skill: {id: "ranged-light", name: "Ranged (Light)", characteristic: CharacteristicType.Agility, type: "Combat", initiative: false, summary: "", description: "", ranks: 0},
        damage: 7,
        critical: 3,
        range: "Medium" as any,
        brawn: false,
    },
    armorStats: {} as any,
} as ItemTemplate;

const imperialOfficer: AdversaryTemplate = {
    id: "npc-2",
    name: "Imperial Officer",
    description: "Imperial Officer",
    type: "Rival" as any,
    characteristics: {
        brawn: {current: 2, base: 2},
        agility: {current: 2, base: 2},
        intellect: {current: 3, base: 3},
        cunning: {current: 3, base: 3},
        willpower: {current: 3, base: 3},
        presence: {current: 3, base: 3},
    },
    derivedStats: {
        woundThreshold: {current: 0, total: 10},
        strainThreshold: {current: 0, total: 10},
        defense: {current: 0, base: 0},
        soak: {current: 3, base: 3},
    },
    equipment: {
        weapons: [imperialOfficerWeapon],
        equippedArmor: sampleArmor,
        otherGear: []
    },
    motivations: [],
    skills: [],
    ratings: {combat: 0, social: 0, general: 0},
    size: 1,
}

const eliteGuard: AdversaryTemplate = {
    id: "npc-3",
    name: "Elite Guard",
    description: "Elite Imperial Guard",
    type: "Rival" as any,
    characteristics: {
        brawn: {current: 3, base: 3},
        agility: {current: 3, base: 3},
        intellect: {current: 2, base: 2},
        cunning: {current: 2, base: 2},
        willpower: {current: 3, base: 3},
        presence: {current: 2, base: 2},
    },
    derivedStats: {
        woundThreshold: {current: 0, total: 12},
        strainThreshold: {current: 0, total: 8},
        defense: {current: 0, base: 0},
        soak: {current: 4, base: 4},
    },
    equipment: {
        weapons: [eliteGuardPike, eliteGuardBlaster],
        equippedArmor: sampleArmor,
        otherGear: []
    },
    motivations: [],
    skills: [],
    ratings: {combat: 0, social: 0, general: 0},
    size: 1,
}

const mockAdversaries: AdversaryTemplate[] = [
    stormTrooper,
    imperialOfficer,
    eliteGuard,
];

const kaelWeapon1 = {
    id: "kael-w1",
    name: "Heavy Blaster Pistol",
    type: "Weapon" as any,
    description: "Modified heavy sidearm",
    price: 700,
    restricted: true,
    encumbrance: 2,
    hardPoints: 3,
    rarity: 6,
    qualities: [{id: "q-stun-k", name: "Stun Setting", description: "", cost: 0, armor: false, weapon: true, stats: {} as any, ranks: 1}],
    amount: 1,
    weaponStats: {
        skill: {id: "ranged-light", name: "Ranged (Light)", characteristic: CharacteristicType.Agility, type: "Combat", initiative: false, summary: "", description: "", ranks: 0},
        damage: 7,
        critical: 3,
        range: "Medium" as any,
        brawn: false,
    },
    armorStats: {} as any,
} as ItemTemplate;

const kaelWeapon2 = {
    id: "kael-w2",
    name: "Vibro-knife",
    type: "Weapon" as any,
    description: "Vibrating mono-edge blade",
    price: 250,
    restricted: false,
    encumbrance: 1,
    hardPoints: 0,
    rarity: 3,
    qualities: [{id: "q-pierce-k", name: "Pierce 2", description: "", cost: 0, armor: false, weapon: true, stats: {} as any, ranks: 2}],
    amount: 1,
    weaponStats: {
        skill: {id: "melee", name: "Melee", characteristic: CharacteristicType.Brawn, type: "Combat", initiative: false, summary: "", description: "", ranks: 0},
        damage: 4,
        critical: 3,
        range: "Engaged" as any,
        brawn: true,
    },
    armorStats: {} as any,
} as ItemTemplate;

const miraWeapon1 = {
    id: "mira-w1",
    name: "Holdout Blaster",
    type: "Weapon" as any,
    description: "Concealable short-range blaster",
    price: 200,
    restricted: true,
    encumbrance: 1,
    hardPoints: 0,
    rarity: 4,
    qualities: [{id: "q-stun-m", name: "Stun Setting", description: "", cost: 0, armor: false, weapon: true, stats: {} as any, ranks: 1}],
    amount: 1,
    weaponStats: {
        skill: {id: "ranged-light", name: "Ranged (Light)", characteristic: CharacteristicType.Agility, type: "Combat", initiative: false, summary: "", description: "", ranks: 0},
        damage: 5,
        critical: 4,
        range: "Short" as any,
        brawn: false,
    },
    armorStats: {} as any,
} as ItemTemplate;

const graxWeapon1 = {
    id: "grax-w1",
    name: "Vibro-axe",
    type: "Weapon" as any,
    description: "Heavy vibrating axe",
    price: 600,
    restricted: false,
    encumbrance: 4,
    hardPoints: 1,
    rarity: 5,
    qualities: [{id: "q-vicious-g", name: "Vicious 3", description: "", cost: 0, armor: false, weapon: true, stats: {} as any, ranks: 3}],
    amount: 1,
    weaponStats: {
        skill: {id: "melee", name: "Melee", characteristic: CharacteristicType.Brawn, type: "Combat", initiative: false, summary: "", description: "", ranks: 0},
        damage: 3,
        critical: 2,
        range: "Engaged" as any,
        brawn: true,
    },
    armorStats: {} as any,
} as ItemTemplate;

const graxWeapon2 = {
    id: "grax-w2",
    name: "Heavy Blaster Rifle",
    type: "Weapon" as any,
    description: "Large two-handed blaster",
    price: 1200,
    restricted: true,
    encumbrance: 6,
    hardPoints: 4,
    rarity: 7,
    qualities: [{id: "q-auto-g", name: "Auto-fire", description: "", cost: 0, armor: false, weapon: true, stats: {} as any, ranks: 1}],
    amount: 1,
    weaponStats: {
        skill: {id: "ranged-heavy", name: "Ranged (Heavy)", characteristic: CharacteristicType.Agility, type: "Combat", initiative: false, summary: "", description: "", ranks: 0},
        damage: 10,
        critical: 3,
        range: "Long" as any,
        brawn: false,
    },
    armorStats: {} as any,
} as ItemTemplate;

const mockPlayerCharacters: PlayerCharacter[] = [
    {
        id: "pc-1",
        name: "Kael Starwind",
        background: "Former smuggler turned hero",
        archetype: {} as any, // Mock
        career: {} as any, // Mock
        characteristics: {
            brawn: {current: 2, base: 2},
            agility: {current: 3, base: 3},
            intellect: {current: 3, base: 3},
            cunning: {current: 2, base: 2},
            willpower: {current: 2, base: 2},
            presence: {current: 3, base: 3},
        },
        derivedStats: {
            woundThreshold: {current: 0, total: 15},
            strainThreshold: {current: 0, total: 12},
            defense: {current: 2, base: 0},
            soak: {current: 4, base: 4},
        },
        equipment: {
            weapons: [kaelWeapon1, kaelWeapon2],
            equippedArmor: sampleArmor,
            otherGear: []
        },
        motivations: [],
        skills: [
            {
                id: "piloting-1", name: "Viligance", ranks: 2, characteristic: CharacteristicType.Willpower,
                type: "General",
                initiative: true,
                summary: "",
                description: ""
            },
            {
                id: "piloting-2", name: "Cool", ranks: 2, characteristic: CharacteristicType.Presence,
                type: "General",
                initiative: true,
                summary: "",
                description: ""
            }
        ],
        experience: {
            total: 100, available: 0,
            initial: 0
        },
        talents: [],
    },
    {
        id: "pc-2",
        name: "Mira Shadowstep",
        background: "Stealthy operative",
        archetype: {} as any,
        career: {} as any,
        characteristics: {
            brawn: {current: 2, base: 2},
            agility: {current: 4, base: 4},
            intellect: {current: 2, base: 2},
            cunning: {current: 3, base: 3},
            willpower: {current: 2, base: 2},
            presence: {current: 2, base: 2},
        },
        derivedStats: {
            woundThreshold: {current: 0, total: 12},
            strainThreshold: {current: 0, total: 14},
            defense: {current: 1, base: 0},
            soak: {current: 3, base: 3},
        },
        equipment: {
            weapons: [miraWeapon1],
            equippedArmor: sampleArmor,
            otherGear: []
        },
        motivations: [],
        skills: [],
        experience: {
            total: 100, available: 0,
            initial: 0
        },
        talents: [],
    },
    {
        id: "pc-3",
        name: "Grax the Mighty",
        background: "Warrior",
        archetype: {} as any,
        career: {} as any,
        characteristics: {
            brawn: {current: 4, base: 4},
            agility: {current: 2, base: 2},
            intellect: {current: 2, base: 2},
            cunning: {current: 2, base: 2},
            willpower: {current: 3, base: 3},
            presence: {current: 2, base: 2},
        },
        derivedStats: {
            woundThreshold: {current: 0, total: 18},
            strainThreshold: {current: 0, total: 10},
            defense: {current: 0, base: 0},
            soak: {current: 6, base: 6},
        },
        equipment: {
            weapons: [graxWeapon1, graxWeapon2],
            equippedArmor: sampleArmor,
            otherGear: []
        },
        motivations: [],
        skills: [],
        experience: {
            total: 100, available: 0,
            initial: 0
        },
        talents: [],
    },
];

export interface ExtendedCampaignEncounter extends CampaignEncounter {
    encounterId: string;
    currentRound: number;
    currentSlotIndex: number;
    combatLog: CombatLogEntry[];
    turnActions: TurnAction[];
    rangeBands: EncounterRangeBand[];
    locations: EncounterLocation[];
}

export const encounterTemplate: ExtendedCampaignEncounter = {
    encounterId: "t",
    name: "Battle at Echo Ridge",
    type: CampaignEncounterType.Combat,
    status: CampaignEncounterStatus.Building,
    party: {
        players: mockPlayerCharacters,
        adversaryTemplates: []
    },
    npcIds: mockAdversaries,
    initiativeOrder: [

    ],
    currentRound: 1,
    currentSlotIndex: 0,
    combatLog: [],
    turnActions: [],
    rangeBands: [],
    locations: [],
};