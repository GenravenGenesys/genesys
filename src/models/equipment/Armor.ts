import Equipment from "./Equipment";
import {Option} from "../../components/common/InputSelectField";

export interface Armor extends Equipment {
    armor_id: number
    soak: number
    defense: number
}

export interface ActorArmor extends Armor {
    slot: ArmorSlot
}

export enum ArmorSlot {
    Body = 'Body',
    None = 'None'
}

export const getArmorSlotOptions = (): Option[] => {
    return Object.values(ArmorSlot).map((value) => ({value}))
}