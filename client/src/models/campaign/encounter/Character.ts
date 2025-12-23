import type {ActorType} from "../../actor/Actor.ts";
import type {
    Ability,
    ActorArmor,
    ActorSkill,
    ActorTalent,
    ActorWeapon,
    Characteristic, CriticalInjury,
    Stats, StatusEffect
} from "../../../api/model";
import type {ActorGear} from "../../equipment/Gear.ts";


export default interface Character {
    id: string
    name: string,
    type: ActorType,
    brawn: Characteristic,
    agility: Characteristic,
    intellect: Characteristic,
    cunning: Characteristic,
    willpower: Characteristic,
    presence: Characteristic,
    wounds: Stats,
    soak: number,
    melee: number,
    ranged: number,
    weapons: ActorWeapon[],
    armors: ActorArmor[],
    gear: ActorGear[],
    abilities: Ability[],
    talents: ActorTalent[],
    skills: ActorSkill[],
    injuries: CriticalInjury[],
    effects: StatusEffect[],
}