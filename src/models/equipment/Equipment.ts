import Skill from "../actor/Skill";

export default interface Equipment {
    name: string
    description: string
    price: Price
    encumbrance: number
    slot: EquipmentSlot
    rarity: Rarity
}

export enum EquipmentSlot {
    Main='Main Hand',
    Off='Off Hand',
    Both='Both Hands',
    Body='Body'
}

export interface Price {
    value: number
    restricted: boolean
}

export interface Encumbrance {
    value: number
    worn: boolean
}

export interface Rarity {
    value: number
    modifier: number
}

export interface Armor extends Equipment {
    soak: number
    defense: number
}

export interface Weapon extends Equipment {
    damage: number
    skill: Skill
    critical: number
}

export enum EquipmentType {
    Armor='Armor',
    Weapon='Weapon',
    Gear='Gear'
}

export class DefaultArmor{
    static create():Armor {
        return {
            defense: 0,
            description: "",
            encumbrance: 0,
            name: "",
            price: {value: 0, restricted: false},
            rarity: {value: 0, modifier: 0},
            slot: EquipmentSlot.Body,
            soak: 0
        }
    }
}