import {CharacteristicType} from '../character/Characteristic';
import Setting from "../Setting";

export default interface Skill {
    characteristic: CharacteristicType
    type: SkillType
    name: string
    settings: Setting[]
}

export enum SkillType {
    General = 'General',
    Magic = 'Magic',
    Social = 'Social',
    Combat = 'Combat',
    Knowledge = 'Knowledge'
}

export class DefaultSkill {

    static create(): Skill {
        return {
            characteristic: CharacteristicType.Agility,
            name: "",
            settings: [],
            type: SkillType.General
        }
    }
}