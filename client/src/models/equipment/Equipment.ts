import type {EquipmentQuality, Modifier} from "../../api/model";

export default interface Equipment {
    id: string
    name: string
    description: string
    price: number
    restricted: boolean
    encumbrance: number
    rarity: number
    modifiers: Modifier[]
    qualities: EquipmentQuality[]
}

export enum EquipmentType {
    Armor = 'Armor',
    Weapon = 'Weapon',
    Gear = 'Gear'
}