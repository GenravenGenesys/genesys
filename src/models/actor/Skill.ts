import {CharacteristicType} from './Characteristics';

export default interface Skill {
    characteristic: CharacteristicType
    active: boolean
    type: SkillType
    name: string
    settings: string[]
}

export enum SkillType {
    General = 'General',
    Magic = 'Magic',
    Social = 'Social',
    Combat = 'Combat',
    Knowledge = 'Knowledge'
}