import Skill from "../Skill";
import Ability from "../../Ability";

export default interface Archetype {
    id: string
    name: string
    description: string
    brawn: number
    agility: number
    intellect: number
    cunning: number
    willpower: number
    presence: number
    wounds: number
    strain: number
    experience: number
    skill: Skill
    abilities: Ability[]
}