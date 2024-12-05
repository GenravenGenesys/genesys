import {CharacteristicType} from '../character/Characteristic';

export default interface Skill {
    id: string
    characteristic: CharacteristicType
    type: SkillType
    name: string
    initiative: boolean
};

export enum SkillType {
    General = 'General',
    Magic = 'Magic',
    Social = 'Social',
    Combat = 'Combat',
    Knowledge = 'Knowledge'
}