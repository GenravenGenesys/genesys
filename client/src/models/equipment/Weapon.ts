import Equipment from "./Equipment";
import {Option} from "../../components/common/InputSelectField";
import type {RangeBand, Skill} from "../../api/model";

export interface Weapon extends Equipment {
    damage: number
    skill: Skill
    critical: number
    range: RangeBand
    brawn: boolean
    hands: number
}

export interface ActorWeapon extends Weapon {
    slot: WeaponSlot
}

export enum WeaponSlot {
    Main = 'Main Hand',
    Off = 'Off Hand',
    Both = 'Both Hands',
    None = 'None'
}

export const getWeaponSlotOptions = (weapon: ActorWeapon): Option[] => {
    if (weapon.hands === 2) {
        return Object.values(WeaponSlot).filter((slot) => slot === WeaponSlot.Both || slot === WeaponSlot.None).map((value) => ({value}))
    } else {
        return Object.values(WeaponSlot).filter((slot) => slot === WeaponSlot.Main || slot === WeaponSlot.Off || slot === WeaponSlot.None).map((value) => ({value}))
    }
}