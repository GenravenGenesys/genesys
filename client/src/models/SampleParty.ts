import type {ItemTemplate, Party, PlayerCharacter} from "../api/model";
import {emptyItemTemplate} from "./Template.ts";

export const AriaSwiftwind = {
    id: 'player1',
    name: 'Aria Swiftwind',
    background: "Aria Swiftwind, a cunning and agile rogue, grew up in the bustling city of Silverport. Orphaned at a young age, she learned to survive on the streets by honing her skills in stealth, lockpicking, and deception. With a quick wit and a silver tongue, Aria has made a name for herself as a skilled thief and information broker. Despite her roguish nature, she has a strong sense of loyalty to those she considers friends and will go to great lengths to protect them.",
    archetype: {
        id: 'rogue',
        name: 'Rogue',
        description: 'Masters of stealth and deception, rogues excel at sneaking, lockpicking, and finding hidden treasures.',
        brawn: 2,
        agility: 2,
        intellect: 2,
        cunning: 2,
        willpower: 2,
        presence: 2,
        wounds: 10,
        strain: 10,
        abilities: [],
        skills: [],
        experience: 100
    },
    career: {
        id: 'thief',
        name: 'Thief',
        description: 'Thieves are skilled in the art of stealing, lockpicking, and gathering information. They thrive in the shadows and are experts at getting in and out unnoticed.',
        skills: []
    },
    characteristics: {
        brawn: {
            current: 2,
            base: 2
        },
        agility: {
            current: 4,
            base: 4
        },
        intellect: {
            current: 3,
            base: 3
        },
        cunning: {
            current: 4,
            base: 4
        },
        willpower: {
            current: 2,
            base: 2
        },
        presence: {
            current: 3,
            base: 3
        },
    },
    derivedStats: {
        soak: {
            current: 2,
            base: 2
        },
        woundThreshold: {
            current: 0,
            total: 12,
        },
        strainThreshold: {
            current: 0,
            total: 12,
        },
        defense: {
            current: 1,
            base: 1
        }
    },
    equipment: {
        weapons: [] as ItemTemplate[],
        equippedArmor: emptyItemTemplate,
        otherGear: [] as ItemTemplate[]
    },
    skills: [],
    experience: {
        initial: 0,
        total: 100,
        available: 0
    },
    talents: []
} as PlayerCharacter;


export const sampleParty = {
    players: [
        AriaSwiftwind
    ]
} as Party;