import {
    type AdversaryTemplate, type CampaignEncounter,
    CampaignEncounterStatus,
    CampaignEncounterType, CharacteristicType, EquipmentType, type ItemTemplate,
    type PlayerCharacter, type WeaponStats
} from "../api/model";
import type {
    CombatLogEntry,
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
        weapons: [],
        equippedArmor: sampleArmor,
        otherGear: []
    },
    motivations: [],
    skills: [],
    ratings: {combat: 0, social: 0, general: 0},
    size: 1,
}

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
        weapons: [],
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
        weapons: [],
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
            weapons: [],
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
            weapons: [],
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
            weapons: [],
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
};