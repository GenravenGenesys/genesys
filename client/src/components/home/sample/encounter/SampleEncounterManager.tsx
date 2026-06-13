import {useState} from "react";
import {
    Container,
    Typography,
    Button,
    Paper,
    Alert,
} from "@mui/material";
import {EncounterSetup} from "./components/EncounterSetup";
import {EncounterActive} from "./components/EncounterActive";
import type {
    Activation,
    Ability,
    Characteristics,
    DerivedStats,
    PlayerSkill,
    GenesysSymbolResults,
    RangeBand,
    CharacteristicType,
    SkillType,
    CostType,
    LimitType, Participant, StatusEffect,
} from "../../../../api/model";
import {
    useStartEncounter,
    useEndEncounter,
} from "../../../../api/generated/dice/dice";

export type EncounterType = "combat" | "social";
export type {RangeBand};

export interface EncounterStatusEffect {
    id: string;
    name: string;
    description: string;
    duration: "permanent" | "end-of-turn" | "end-of-round" | "end-of-encounter";
    appliedRound: number;
    icon?: string;
}

export interface ParticipantUI {
    id: string;
    name: string;
    type: "pc" | "npc";
    characteristics: Characteristics;
    derivedStats: DerivedStats;
    statusEffects: EncounterStatusEffect[];
    position?: {
        x: number;
        y: number;
    };
    imageUrl?: string;
    notes?: string;
    weapons?: Weapon[];
    abilities?: Ability[];
    skills?: PlayerSkill[];
}

export interface EncounterInitiativeSlot {
    id: string;
    slotType: "pc" | "npc";
    success: number;
    advantage: number;
    assignedParticipantId: string | null;
    rolledBy: string;
}

export interface Weapon {
    id: string;
    name: string;
    skill: string;
    damage: number;
    critical: number;
    range: RangeBand;
    qualities?: string[];
}

export interface EncounterAbility {
    id: string;
    name: string;
    description: string;
    activation: Activation;
}

export interface EncounterAction {
    id: string;
    name: string;
    description: string;
    category: "combat" | "skill" | "social" | "other";
    requiresDiceRoll?: boolean;
    quickAction?: boolean;
    /** weapon this action represents, if any */
    weapon?: Weapon;
}

export interface EncounterManeuver {
    id: string;
    name: string;
    description: string;
    category: "movement" | "interaction" | "combat" | "other";
}

export type {GenesysSymbolResults};

export interface TurnAction {
    id: string;
    slotId: string;
    round: number;
    participantId: string;
    actionTaken?: {
        actionId: string;
        actionName: string;
        details?: string;
        diceResult?: GenesysSymbolResults;
        advantageSpent?: string[];
        triumphSpent?: string[];
        targetId?: string;
        targetName?: string;
    };
    maneuversTaken: Array<{
        maneuverId: string;
        maneuverName: string;
        details?: string;
    }>;
    strainSpentForManeuver: number;
}

export interface CombatLogEntry {
    id: string;
    round: number;
    timestamp: Date;
    participantId: string;
    participantName: string;
    action: string;
    details?: string;
}

export interface EncounterRangeBand {
    participantId: string;
    targetId: string;
    range: RangeBand;
}

export type CoverType = "None" | "Soft" | "Hard";

export interface EncounterLocation {
    id: string;
    name: string;
    cover: CoverType;
    occupantIds: string[];
}

export interface EncounterState {
    id: string;
    name: string;
    type: EncounterType;
    status: "setup" | "active" | "completed";
    currentRound: number;
    currentSlotIndex: number;
    participants: Participant[];
    initiativeSlots: EncounterInitiativeSlot[];
    combatLog: CombatLogEntry[];
    turnActions: TurnAction[];
    rangeBands: EncounterRangeBand[];
    locations: EncounterLocation[];
}

const availableActions: EncounterAction[] = [
    // Quick Actions (Combat)
    {
        id: "attack-ranged",
        name: "Ranged Attack",
        description: "Make a ranged combat check",
        category: "combat",
        requiresDiceRoll: true,
        quickAction: true,
    },
    {
        id: "attack-melee",
        name: "Melee Attack",
        description: "Make a melee combat check",
        category: "combat",
        requiresDiceRoll: true,
        quickAction: true,
    },
    {
        id: "attack-brawl",
        name: "Brawl Attack",
        description: "Make an unarmed combat check",
        category: "combat",
        requiresDiceRoll: true,
        quickAction: true,
    },

    // Other Combat Actions
    {
        id: "aim-action",
        name: "Aim (Action)",
        description: "Perform multiple Aim maneuvers as your action",
        category: "combat",
    },
    {
        id: "guard",
        name: "Guard",
        description: "Add setback to attacks against you until your next turn",
        category: "combat",
    },
    {
        id: "assist-action",
        name: "Assist (Action)",
        description: "Help an ally with their next check",
        category: "combat",
    },

    // Quick Actions (Skills)
    {
        id: "perception",
        name: "Perception Check",
        description: "Make a Perception check to notice details",
        category: "skill",
        requiresDiceRoll: true,
        quickAction: true,
    },
    {
        id: "athletics",
        name: "Athletics Check",
        description: "Make an Athletics check",
        category: "skill",
        requiresDiceRoll: true,
        quickAction: true,
    },
    {
        id: "stealth",
        name: "Stealth Check",
        description: "Make a Stealth check to hide",
        category: "skill",
        requiresDiceRoll: true,
        quickAction: true,
    },

    // Other Skill Actions
    {
        id: "skill-check",
        name: "Skill Check",
        description: "Make any skill check",
        category: "skill",
        requiresDiceRoll: true,
    },
    {
        id: "medicine",
        name: "Medicine Check",
        description: "Treat wounds or critical injuries",
        category: "skill",
        requiresDiceRoll: true,
    },
    {
        id: "mechanics",
        name: "Mechanics Check",
        description: "Repair or modify equipment",
        category: "skill",
        requiresDiceRoll: true,
    },

    // Quick Actions (Social)
    {
        id: "charm",
        name: "Charm",
        description: "Make a Charm check",
        category: "social",
        requiresDiceRoll: true,
        quickAction: true,
    },
    {
        id: "coercion",
        name: "Coercion",
        description: "Make a Coercion check",
        category: "social",
        requiresDiceRoll: true,
        quickAction: true,
    },

    // Other Social Actions
    {
        id: "deception",
        name: "Deception",
        description: "Make a Deception check",
        category: "social",
        requiresDiceRoll: true,
    },
    {
        id: "negotiation",
        name: "Negotiation",
        description: "Make a Negotiation check",
        category: "social",
        requiresDiceRoll: true,
    },
    {
        id: "leadership",
        name: "Leadership",
        description: "Make a Leadership check to inspire allies",
        category: "social",
        requiresDiceRoll: true,
    },

    // Other
    {
        id: "activate-ability",
        name: "Activate Ability",
        description: "Use a talent or special ability",
        category: "other",
    },
    {
        id: "custom",
        name: "Custom Action",
        description: "Describe a custom action",
        category: "other",
    },
];

const availableManeuvers: EncounterManeuver[] = [
    // Movement
    {
        id: "move",
        name: "Move",
        description: "Move from short to medium range, or medium to long range",
        category: "movement",
    },
    {
        id: "move-engaged",
        name: "Disengage",
        description: "Move from engaged to short range",
        category: "movement",
    },
    {
        id: "engage",
        name: "Engage",
        description: "Move from short range to engaged",
        category: "movement",
    },

    // Interaction
    {
        id: "interact",
        name: "Interact",
        description: "Open a door, flip a switch, pick up an item",
        category: "interaction",
    },
    {
        id: "draw-weapon",
        name: "Draw/Holster Weapon",
        description: "Ready or stow a weapon or item",
        category: "interaction",
    },

    // Combat
    {
        id: "aim-maneuver",
        name: "Aim",
        description: "Gain boost die on next combat check this turn",
        category: "combat",
    },
    {
        id: "take-cover",
        name: "Take Cover",
        description: "Gain ranged defense from available cover",
        category: "combat",
    },
    {
        id: "mount-dismount",
        name: "Mount/Dismount",
        description: "Get on or off a vehicle or mount",
        category: "combat",
    },
    {
        id: "prepare",
        name: "Prepare Item",
        description: "Ready a specific item for immediate use",
        category: "combat",
    },

    // Other
    {
        id: "recover",
        name: "Recover",
        description: "Catch your breath and recover strain",
        category: "other",
    },
    {
        id: "assist-maneuver",
        name: "Assist (Maneuver)",
        description: "Help an ally as a maneuver",
        category: "other",
    },
    {
        id: "drop-item",
        name: "Drop Item",
        description: "Drop a held item (incidental)",
        category: "other",
    },
    {
        id: "speak",
        name: "Speak/Gesture",
        description: "Communicate with others (incidental)",
        category: "other",
    },
    {
        id: "custom-maneuver",
        name: "Custom Maneuver",
        description: "Describe a custom maneuver",
        category: "other",
    },
];

const availableStatusEffects: Omit<EncounterStatusEffect, "id" | "appliedRound">[] = [
    {
        name: "Aimed",
        description: "Add boost die to next combat check",
        duration: "end-of-turn",
        icon: "",
    },
    {
        name: "Staggered",
        description: "Cannot perform actions, only maneuvers",
        duration: "end-of-turn",
        icon: "",
    },
    {
        name: "Stunned",
        description: "Cannot perform actions or maneuvers",
        duration: "end-of-turn",
        icon: "⚡",
    },
    {
        name: "Immobilized",
        description: "Cannot perform movement maneuvers",
        duration: "end-of-turn",
        icon: "",
    },
    {
        name: "Disoriented",
        description: "Add setback die to all checks",
        duration: "end-of-turn",
        icon: "",
    },
    {
        name: "Cover",
        description: "Increase ranged defense",
        duration: "end-of-turn",
        icon: "️",
    },
    {
        name: "Prone",
        description: "Add setback to ranged attacks, boost to melee defense",
        duration: "permanent",
        icon: "⬇️",
    },
    {
        name: "Engaged",
        description: "In melee range with an enemy",
        duration: "permanent",
        icon: "⚔️",
    },
    {
        name: "Inspired",
        description: "Upgrade ability die once on next check",
        duration: "end-of-turn",
        icon: "⭐",
    },
    {
        name: "Frightened",
        description: "Upgrade difficulty of all checks",
        duration: "end-of-encounter",
        icon: "",
    },
];

const mockPlayers: Participant[] = [
    {
        id: "pc-1",
        name: "Kael Starwind",
        type: "pc",
        characteristics: {
            brawn:     {current: 3, base: 3},
            agility:   {current: 3, base: 3},
            intellect: {current: 2, base: 2},
            cunning:   {current: 2, base: 2},
            willpower: {current: 2, base: 2},
            presence:  {current: 3, base: 3},
        },
        derivedStats: {
            woundThreshold:  {current: 0, total: 15},
            strainThreshold: {current: 0, total: 12},
            melee:           {current: 1, base: 1},
            ranged:          {current: 2, base: 2},
            soak:            {current: 4, base: 4},
        },
        statusEffects: [],
        skills: [
            {
                id: "kael-cool", name: "Cool",
                characteristic: "Presence" as CharacteristicType,
                type: "Social" as SkillType,
                ranks: 3, initiative: true,
                summary: "Composure under pressure",
                description: "Used for initiative and remaining calm in dangerous situations.",
            },
            {
                id: "kael-vig", name: "Vigilance",
                characteristic: "Willpower" as CharacteristicType,
                type: "General" as SkillType,
                ranks: 2, initiative: true,
                summary: "Alertness and reaction speed",
                description: "Used for initiative and noticing immediate threats.",
            },
        ],
        weapons: [
            {id: "kael-w1", name: "Heavy Blaster Pistol", skill: "Ranged (Light)", damage: 7, critical: 3, range: "Medium", qualities: ["Stun Setting"]},
            {id: "kael-w2", name: "Vibro-knife", skill: "Melee", damage: 4, critical: 3, range: "Engaged", qualities: ["Pierce 2"]},
        ],
        abilities: [
            {
                name: "Quick Strike",
                description: "Add a boost die to any combat check against a target that has not yet acted this round.",
                activation: "Active (Incidental)" as Activation,
                cost: {type: "None" as CostType, amount: 0},
                limit: {type: "None" as LimitType, limit: 0},
                statModifiers: {wounds: 0, strain: 0, soak: 0, defense: 0, encumbranceThreshold: 0},
                abilityModifiers: {diceModifiers: [], resultsModifiers: [], healEffects: [], environmentModifiers: [], criticalInjuryCountAsOne: false, freeMoveManeuver: false, moveStoryPoint: false},
            },
            {
                name: "Dodge",
                description: "Suffer strain up to ranks in Dodge; reduce incoming attack damage by the same amount.",
                activation: "Active (Incidental, Out of Turn)" as Activation,
                cost: {type: "Strain" as CostType, amount: 1},
                limit: {type: "None" as LimitType, limit: 0},
                statModifiers: {wounds: 0, strain: 0, soak: 0, defense: 0, encumbranceThreshold: 0},
                abilityModifiers: {diceModifiers: [], resultsModifiers: [], healEffects: [], environmentModifiers: [], criticalInjuryCountAsOne: false, freeMoveManeuver: false, moveStoryPoint: false},
            },
        ],
    },
    {
        id: "pc-2",
        name: "Mira Shadowstep",
        type: "pc",
        characteristics: {
            brawn:     {current: 2, base: 2},
            agility:   {current: 3, base: 3},
            intellect: {current: 2, base: 2},
            cunning:   {current: 3, base: 3},
            willpower: {current: 2, base: 2},
            presence:  {current: 2, base: 2},
        },
        derivedStats: {
            woundThreshold:  {current: 0, total: 12},
            strainThreshold: {current: 0, total: 14},
            melee:           {current: 0, base: 0},
            ranged:          {current: 1, base: 1},
            soak:            {current: 3, base: 3},
        },
        statusEffects: [],
        skills: [
            {
                id: "mira-cool", name: "Cool",
                characteristic: "Presence" as CharacteristicType,
                type: "Social" as SkillType,
                ranks: 2, initiative: true,
                summary: "Composure under pressure",
                description: "Used for initiative and remaining calm in dangerous situations.",
            },
            {
                id: "mira-vig", name: "Vigilance",
                characteristic: "Willpower" as CharacteristicType,
                type: "General" as SkillType,
                ranks: 3, initiative: true,
                summary: "Alertness and reaction speed",
                description: "Used for initiative and noticing immediate threats.",
            },
        ],
        weapons: [
            {id: "mira-w1", name: "Holdout Blaster", skill: "Ranged (Light)", damage: 5, critical: 4, range: "Short", qualities: ["Stun Setting", "Concealable"]},
            {id: "mira-w2", name: "Throwing Knife", skill: "Ranged (Light)", damage: 3, critical: 3, range: "Short", qualities: ["Limited Ammo 1"]},
        ],
        abilities: [
            {
                name: "Sneak Attack",
                description: "Gain bonus Advantage on attack if the target is unaware or engaged with an ally.",
                activation: "Active (Incidental)" as Activation,
                cost: {type: "None" as CostType, amount: 0},
                limit: {type: "Per Round" as LimitType, limit: 1},
                statModifiers: {wounds: 0, strain: 0, soak: 0, defense: 0, encumbranceThreshold: 0},
                abilityModifiers: {diceModifiers: [], resultsModifiers: [], healEffects: [], environmentModifiers: [], criticalInjuryCountAsOne: false, freeMoveManeuver: false, moveStoryPoint: false},
            },
            {
                name: "Disengage",
                description: "Move from engaged to short range as a maneuver without triggering free attacks.",
                activation: "Active (Maneuver)" as Activation,
                cost: {type: "None" as CostType, amount: 0},
                limit: {type: "Per Round" as LimitType, limit: 1},
                statModifiers: {wounds: 0, strain: 0, soak: 0, defense: 0, encumbranceThreshold: 0},
                abilityModifiers: {diceModifiers: [], resultsModifiers: [], healEffects: [], environmentModifiers: [], criticalInjuryCountAsOne: false, freeMoveManeuver: false, moveStoryPoint: false},
            },
        ],
    },
    {
        id: "pc-3",
        name: "Grax the Mighty",
        type: "pc",
        characteristics: {
            brawn:     {current: 4, base: 4},
            agility:   {current: 2, base: 2},
            intellect: {current: 2, base: 2},
            cunning:   {current: 2, base: 2},
            willpower: {current: 2, base: 2},
            presence:  {current: 2, base: 2},
        },
        derivedStats: {
            woundThreshold:  {current: 0, total: 18},
            strainThreshold: {current: 0, total: 10},
            melee:           {current: 0, base: 0},
            ranged:          {current: 0, base: 0},
            soak:            {current: 6, base: 6},
        },
        statusEffects: [],
        skills: [
            {
                id: "grax-cool", name: "Cool",
                characteristic: "Presence" as CharacteristicType,
                type: "Social" as SkillType,
                ranks: 1, initiative: true,
                summary: "Composure under pressure",
                description: "Used for initiative and remaining calm in dangerous situations.",
            },
            {
                id: "grax-vig", name: "Vigilance",
                characteristic: "Willpower" as CharacteristicType,
                type: "General" as SkillType,
                ranks: 2, initiative: true,
                summary: "Alertness and reaction speed",
                description: "Used for initiative and noticing immediate threats.",
            },
        ],
        weapons: [
            {id: "grax-w1", name: "Vibro-axe", skill: "Melee", damage: 7, critical: 3, range: "Engaged", qualities: ["Sunder", "Vicious 3"]},
            {id: "grax-w2", name: "Heavy Blaster Rifle", skill: "Ranged (Heavy)", damage: 10, critical: 3, range: "Long", qualities: ["Auto-fire", "Cumbersome 3"]},
        ],
        abilities: [
            {
                name: "Knockdown",
                description: "Spend 2 Advantage after a successful hit to knock the target prone.",
                activation: "Active (Incidental)" as Activation,
                cost: {type: "None" as CostType, amount: 0},
                limit: {type: "None" as LimitType, limit: 0},
                statModifiers: {wounds: 0, strain: 0, soak: 0, defense: 0, encumbranceThreshold: 0},
                abilityModifiers: {diceModifiers: [], resultsModifiers: [], healEffects: [], environmentModifiers: [], criticalInjuryCountAsOne: false, freeMoveManeuver: false, moveStoryPoint: false},
            },
            {
                name: "Brace",
                description: "Remove up to two setback dice from the next check caused by environmental factors.",
                activation: "Active (Maneuver)" as Activation,
                cost: {type: "None" as CostType, amount: 0},
                limit: {type: "Per Round" as LimitType, limit: 1},
                statModifiers: {wounds: 0, strain: 0, soak: 0, defense: 0, encumbranceThreshold: 0},
                abilityModifiers: {diceModifiers: [], resultsModifiers: [], healEffects: [], environmentModifiers: [], criticalInjuryCountAsOne: false, freeMoveManeuver: false, moveStoryPoint: false},
            },
        ],
    },
];

const mockNPCs: Participant[] = [
    {
        id: "npc-1",
        name: "Stormtrooper",
        type: "npc",
        characteristics: {
            brawn:     {current: 3, base: 3},
            agility:   {current: 2, base: 2},
            intellect: {current: 2, base: 2},
            cunning:   {current: 2, base: 2},
            willpower: {current: 2, base: 2},
            presence:  {current: 2, base: 2},
        },
        derivedStats: {
            woundThreshold:  {current: 0, total: 5},
            strainThreshold: {current: 0, total: 5},
            melee:           {current: 0, base: 0},
            ranged:          {current: 0, base: 0},
            soak:            {current: 5, base: 5},
        },
        statusEffects: [],
        skills: [
            {
                id: "st-cool", name: "Cool",
                characteristic: "Presence" as CharacteristicType,
                type: "Social" as SkillType,
                ranks: 1, initiative: true,
                summary: "Composure under pressure",
                description: "Used for initiative and remaining calm in dangerous situations.",
            },
            {
                id: "st-vig", name: "Vigilance",
                characteristic: "Willpower" as CharacteristicType,
                type: "General" as SkillType,
                ranks: 1, initiative: true,
                summary: "Alertness and reaction speed",
                description: "Used for initiative and noticing immediate threats.",
            },
        ],
        weapons: [
            {id: "st-w1", name: "E-11 Blaster Rifle", skill: "Ranged (Heavy)", damage: 9, critical: 3, range: "Medium", qualities: ["Stun Setting"]},
        ],
        abilities: [
            {
                name: "Minion",
                description: "Operates as part of a minion group. Uses the group's combined skills.",
                activation: "Passive" as Activation,
                cost: {type: "None" as CostType, amount: 0},
                limit: {type: "None" as LimitType, limit: 0},
                statModifiers: {wounds: 0, strain: 0, soak: 0, defense: 0, encumbranceThreshold: 0},
                abilityModifiers: {diceModifiers: [], resultsModifiers: [], healEffects: [], environmentModifiers: [], criticalInjuryCountAsOne: false, freeMoveManeuver: false, moveStoryPoint: false},
            },
        ],
    },
    {
        id: "npc-2",
        name: "Imperial Officer",
        type: "npc",
        characteristics: {
            brawn:     {current: 2, base: 2},
            agility:   {current: 2, base: 2},
            intellect: {current: 3, base: 3},
            cunning:   {current: 2, base: 2},
            willpower: {current: 3, base: 3},
            presence:  {current: 3, base: 3},
        },
        derivedStats: {
            woundThreshold:  {current: 0, total: 10},
            strainThreshold: {current: 0, total: 10},
            melee:           {current: 0, base: 0},
            ranged:          {current: 0, base: 0},
            soak:            {current: 3, base: 3},
        },
        statusEffects: [],
        skills: [
            {
                id: "io-cool", name: "Cool",
                characteristic: "Presence" as CharacteristicType,
                type: "Social" as SkillType,
                ranks: 3, initiative: true,
                summary: "Composure under pressure",
                description: "Used for initiative and remaining calm in dangerous situations.",
            },
            {
                id: "io-vig", name: "Vigilance",
                characteristic: "Willpower" as CharacteristicType,
                type: "General" as SkillType,
                ranks: 2, initiative: true,
                summary: "Alertness and reaction speed",
                description: "Used for initiative and noticing immediate threats.",
            },
        ],
        weapons: [
            {id: "io-w1", name: "Imperial Blaster Pistol", skill: "Ranged (Light)", damage: 6, critical: 3, range: "Medium"},
        ],
        abilities: [
            {
                name: "Commanding Presence",
                description: "Once per round, spend 2 Advantage from a Discipline or Leadership check to give one ally within short range a free maneuver.",
                activation: "Active (Incidental)" as Activation,
                cost: {type: "None" as CostType, amount: 0},
                limit: {type: "Per Round" as LimitType, limit: 1},
                statModifiers: {wounds: 0, strain: 0, soak: 0, defense: 0, encumbranceThreshold: 0},
                abilityModifiers: {diceModifiers: [], resultsModifiers: [], healEffects: [], environmentModifiers: [], criticalInjuryCountAsOne: false, freeMoveManeuver: false, moveStoryPoint: false},
            },
        ],
    },
    {
        id: "npc-3",
        name: "Elite Guard",
        type: "npc",
        characteristics: {
            brawn:     {current: 3, base: 3},
            agility:   {current: 3, base: 3},
            intellect: {current: 2, base: 2},
            cunning:   {current: 2, base: 2},
            willpower: {current: 3, base: 3},
            presence:  {current: 2, base: 2},
        },
        derivedStats: {
            woundThreshold:  {current: 0, total: 12},
            strainThreshold: {current: 0, total: 8},
            melee:           {current: 1, base: 1},
            ranged:          {current: 0, base: 0},
            soak:            {current: 4, base: 4},
        },
        statusEffects: [],
        skills: [
            {
                id: "eg-cool", name: "Cool",
                characteristic: "Presence" as CharacteristicType,
                type: "Social" as SkillType,
                ranks: 2, initiative: true,
                summary: "Composure under pressure",
                description: "Used for initiative and remaining calm in dangerous situations.",
            },
            {
                id: "eg-vig", name: "Vigilance",
                characteristic: "Willpower" as CharacteristicType,
                type: "General" as SkillType,
                ranks: 3, initiative: true,
                summary: "Alertness and reaction speed",
                description: "Used for initiative and noticing immediate threats.",
            },
        ],
        weapons: [
            {id: "eg-w1", name: "Force Pike", skill: "Melee", damage: 7, critical: 3, range: "Engaged", qualities: ["Stun Setting", "Defensive 1"]},
            {id: "eg-w2", name: "Heavy Blaster Pistol", skill: "Ranged (Light)", damage: 7, critical: 3, range: "Medium"},
        ],
        abilities: [
            {
                name: "Adversary 1",
                description: "Upgrade the difficulty of checks targeting this character once.",
                activation: "Passive" as Activation,
                cost: {type: "None" as CostType, amount: 0},
                limit: {type: "None" as LimitType, limit: 0},
                statModifiers: {wounds: 0, strain: 0, soak: 0, defense: 0, encumbranceThreshold: 0},
                abilityModifiers: {diceModifiers: [], resultsModifiers: [], healEffects: [], environmentModifiers: [], criticalInjuryCountAsOne: false, freeMoveManeuver: false, moveStoryPoint: false},
            },
            {
                name: "Parry 2",
                description: "When hit by a melee attack, suffer 3 strain to reduce damage by 4.",
                activation: "Active (Incidental, Out of Turn)" as Activation,
                cost: {type: "Strain" as CostType, amount: 3},
                limit: {type: "None" as LimitType, limit: 0},
                statModifiers: {wounds: 0, strain: 0, soak: 0, defense: 0, encumbranceThreshold: 0},
                abilityModifiers: {diceModifiers: [], resultsModifiers: [], healEffects: [], environmentModifiers: [], criticalInjuryCountAsOne: false, freeMoveManeuver: false, moveStoryPoint: false},
            },
        ],
    },
];

const encounterStateTemplate: EncounterState = {
    id: "enc-1",
    name: "Battle at Echo Ridge",
    type: "combat",
    status: "setup",
    currentRound: 1,
    currentSlotIndex: 0,
    participants: [...mockNPCs, ...mockPlayers],
    initiativeSlots: [],
    combatLog: [],
    turnActions: [],
    rangeBands: [],
    locations: [],
};

function SampleEncounterManager() {
    const [encounter, setEncounter] = useState<EncounterState>(encounterStateTemplate);
    const [encounterApiError, setEncounterApiError] = useState<string | null>(null);
    const [participantsRegistered, setParticipantsRegistered] = useState(false);

    const startEncounterMutation = useStartEncounter();
    const endEncounterMutation = useEndEncounter();

    const handleAddParticipant = (participant: Participant) => {
        setEncounter((prev) => ({
            ...prev,
            participants: [...prev.participants, participant],
        }));
    };

    const handleRemoveParticipant = (participantId: string) => {
        setEncounter((prev) => ({
            ...prev,
            participants: prev.participants.filter((p) => p.id !== participantId),
            initiativeSlots: prev.initiativeSlots.filter(
                (s) => s.rolledBy !== participantId
            ),
            rangeBands: prev.rangeBands.filter(
                (r) => r.participantId !== participantId && r.targetId !== participantId
            ),
        }));
    };

    const handleUpdateParticipant = (
        participantId: string,
        updates: Partial<Participant>
    ) => {
        setEncounter((prev) => ({
            ...prev,
            participants: prev.participants.map((p) =>
                p.id === participantId ? {...p, ...updates} : p
            ),
        }));
    };

    const handleAddInitiativeSlot = (
        slot: Omit<EncounterInitiativeSlot, "id" | "assignedParticipantId">
    ) => {
        const newSlot: EncounterInitiativeSlot = {
            ...slot,
            id: `slot-${Date.now()}-${Math.random()}`,
            assignedParticipantId: null,
        };

        setEncounter((prev) => {
            const allSlots = [...prev.initiativeSlots, newSlot].sort((a, b) => {
                if (b.success !== a.success) {
                    return b.success - a.success;
                }
                return b.advantage - a.advantage;
            });

            return {
                ...prev,
                initiativeSlots: allSlots,
            };
        });
    };

    const handleRemoveInitiativeSlot = (slotId: string) => {
        setEncounter((prev) => ({
            ...prev,
            initiativeSlots: prev.initiativeSlots.filter((s) => s.id !== slotId),
        }));
    };

    const handleAssignSlot = (slotId: string, participantId: string | null) => {
        setEncounter((prev) => ({
            ...prev,
            initiativeSlots: prev.initiativeSlots.map((s) =>
                s.id === slotId ? {...s, assignedParticipantId: participantId} : s
            ),
        }));
    };

    /** Phase 1 of setup: register all participants with the server so initiative
     *  rolls (which require a registered encounter) can be made. */
    const handleRegisterParticipants = async () => {
        setEncounterApiError(null);
        try {
            await startEncounterMutation.mutateAsync({ data: encounter.participants });
            setParticipantsRegistered(true);
        } catch {
            setEncounterApiError("Failed to register participants with the server. Check your connection and try again.");
        }
    };

    /** Phase 2 of setup: all initiative rolls are done — begin the encounter. */
    const handleStartEncounter = () => {
        setEncounter((prev) => ({
            ...prev,
            status: "active",
            currentRound: 1,
            currentSlotIndex: 0,
        }));
    };

    const handleNextSlot = () => {
        setEncounter((prev) => {
            const nextIndex = prev.currentSlotIndex + 1;

            if (nextIndex >= prev.initiativeSlots.length) {
                // New round - clear slot assignments and clean up end-of-round effects
                return {
                    ...prev,
                    currentRound: prev.currentRound + 1,
                    currentSlotIndex: 0,
                    initiativeSlots: prev.initiativeSlots.map((s) => ({
                        ...s,
                        assignedParticipantId: null,
                    })),
                    participants: prev.participants.map((p) => ({
                        ...p,
                        statusEffects: p.statusEffects.filter(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (e: any) => e.duration !== "end-of-round"
                        ),
                    })),
                };
            }

            return {
                ...prev,
                currentSlotIndex: nextIndex,
            };
        });
    };

    const handlePreviousSlot = () => {
        setEncounter((prev) => {
            if (prev.currentSlotIndex > 0) {
                return {
                    ...prev,
                    currentSlotIndex: prev.currentSlotIndex - 1,
                };
            }
            return prev;
        });
    };

    const handleRecordTurnAction = (turnAction: TurnAction) => {
        setEncounter((prev) => ({
            ...prev,
            turnActions: [...prev.turnActions, turnAction],
        }));

        const participant = encounter.participants.find(
            (p) => p.id === turnAction.participantId
        );
        if (participant) {
            if (turnAction.actionTaken) {
                handleAddLogEntry({
                    round: encounter.currentRound,
                    participantId: participant.id,
                    participantName: participant.name,
                    action: `Action: ${turnAction.actionTaken.actionName}`,
                    details: turnAction.actionTaken.details,
                });
            }

            turnAction.maneuversTaken.forEach((maneuver) => {
                handleAddLogEntry({
                    round: encounter.currentRound,
                    participantId: participant.id,
                    participantName: participant.name,
                    action: `Maneuver: ${maneuver.maneuverName}`,
                    details: maneuver.details,
                });
            });

            if (turnAction.strainSpentForManeuver > 0) {
                handleAddLogEntry({
                    round: encounter.currentRound,
                    participantId: participant.id,
                    participantName: participant.name,
                    action: `Suffered ${turnAction.strainSpentForManeuver} strain for additional maneuver`,
                });
            }
        }
    };

    const handleAddLogEntry = (
        entry: Omit<CombatLogEntry, "id" | "timestamp">
    ) => {
        const newEntry: CombatLogEntry = {
            ...entry,
            id: `log-${Date.now()}`,
            timestamp: new Date(),
        };

        setEncounter((prev) => ({
            ...prev,
            combatLog: [newEntry, ...prev.combatLog],
        }));
    };

    const handleUpdateRange = (
        participantId: string,
        targetId: string,
        range: RangeBand
    ) => {
        setEncounter((prev) => {
            const existingIndex = prev.rangeBands.findIndex(
                (r) => r.participantId === participantId && r.targetId === targetId
            );

            let newRangeBands: EncounterRangeBand[];
            if (existingIndex >= 0) {
                newRangeBands = [...prev.rangeBands];
                newRangeBands[existingIndex] = {participantId, targetId, range};
            } else {
                newRangeBands = [
                    ...prev.rangeBands,
                    {participantId, targetId, range},
                ];
            }

            return {
                ...prev,
                rangeBands: newRangeBands,
            };
        });
    };

    const handleEndEncounter = async () => {
        setEncounterApiError(null);
        try {
            await endEncounterMutation.mutateAsync();
        } catch {
            // Non-fatal: log the error but still mark encounter as completed locally
            setEncounterApiError("Failed to close encounter on the server — encounter marked complete locally.");
        }
        setEncounter((prev) => ({
            ...prev,
            status: "completed",
        }));
    };

    const handleAddLocation = (loc: EncounterLocation) => {
        setEncounter((prev) => ({...prev, locations: [...prev.locations, loc]}));
    };

    const handleRemoveLocation = (id: string) => {
        setEncounter((prev) => ({
            ...prev,
            locations: prev.locations.filter((l) => l.id !== id),
            rangeBands: prev.rangeBands.filter(
                (r) => r.participantId !== id && r.targetId !== id
            ),
        }));
    };

    const handleUpdateLocation = (id: string, updates: Partial<EncounterLocation>) => {
        setEncounter((prev) => ({
            ...prev,
            locations: prev.locations.map((l) => l.id === id ? {...l, ...updates} : l),
        }));
    };

    const handleReset = () => {
        setEncounter(encounterStateTemplate);
        setEncounterApiError(null);
        setParticipantsRegistered(false);
        startEncounterMutation.reset();
        endEncounterMutation.reset();
    };

    return (
        <Container maxWidth="xl" sx={{py: 4}}>
            <Typography variant="h3" gutterBottom align="center" sx={{mb: 2}}>
                {encounter.name}
            </Typography>

            {encounterApiError && (
                <Alert severity="error" sx={{mb: 2}} onClose={() => setEncounterApiError(null)}>
                    {encounterApiError}
                </Alert>
            )}

            {encounter.status === "setup" && (
                <EncounterSetup
                    encounter={encounter}
                    availablePlayers={mockPlayers}
                    availableNPCs={mockNPCs}
                    onAddParticipant={handleAddParticipant}
                    onRemoveParticipant={handleRemoveParticipant}
                    onAddInitiativeSlot={handleAddInitiativeSlot}
                    onRemoveInitiativeSlot={handleRemoveInitiativeSlot}
                    onUpdateRange={handleUpdateRange}
                    onRegisterParticipants={handleRegisterParticipants}
                    isRegistering={startEncounterMutation.isPending}
                    participantsRegistered={participantsRegistered}
                    onStartEncounter={handleStartEncounter}
                    locations={encounter.locations}
                    onAddLocation={handleAddLocation}
                    onRemoveLocation={handleRemoveLocation}
                    onUpdateLocation={handleUpdateLocation}
                />
            )}

            {encounter.status === "active" && (
                <EncounterActive
                    encounter={encounter}
                    availableActions={availableActions}
                    availableManeuvers={availableManeuvers}
                    availableStatusEffects={availableStatusEffects}
                    onUpdateParticipant={handleUpdateParticipant}
                    onAssignSlot={handleAssignSlot}
                    onRecordTurnAction={handleRecordTurnAction}
                    onUpdateRange={handleUpdateRange}
                    onNextSlot={handleNextSlot}
                    onPreviousSlot={handlePreviousSlot}
                    onAddLogEntry={handleAddLogEntry}
                    onEndEncounter={handleEndEncounter}
                    isEnding={endEncounterMutation.isPending}
                    onUpdateLocation={handleUpdateLocation}
                />
            )}

            {encounter.status === "completed" && (
                <Paper sx={{p: 4, textAlign: "center"}}>
                    <Typography variant="h4" gutterBottom>
                        Encounter Complete!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{mb: 3}}>
                        {encounter.name} has ended after {encounter.currentRound} rounds
                    </Typography>
                    <Button variant="contained" onClick={handleReset} size="large">
                        Start New Encounter
                    </Button>
                </Paper>
            )}
        </Container>
    );
}

export default SampleEncounterManager;
