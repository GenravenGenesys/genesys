import type {Modifier} from "../api/model";

export default interface Quality {
    id: string
    name: string
    description: string
    cost: number
    armor: boolean
    weapon: boolean
    modifiers: Modifier[]
}

export interface EquipmentQuality extends Quality {
    ranks: number
}