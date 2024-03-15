import StatusEffect from "./StatusEffect";
import Wounds from "./Wounds";
import {Characteristic} from "./Characteristic";
import {ActorWeapon} from "../equipment/Weapon";
import {ActorArmor} from "../equipment/Armor";

export default interface Character {
    brawn: Characteristic,
    agility: Characteristic,
    intellect: Characteristic,
    cunning: Characteristic,
    willpower: Characteristic,
    presence: Characteristic,
    wounds: Wounds
    weapons: ActorWeapon[]
    armors: ActorArmor[]
    disoriented: StatusEffect
    immobilized: StatusEffect
    staggered: StatusEffect
}