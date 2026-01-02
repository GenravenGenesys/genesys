import type {CharacteristicType, SkillType} from "../../api/model";

export default interface Skill {
    id: string
    characteristic: CharacteristicType
    type:
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