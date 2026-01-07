import {CharacteristicType, type Skill, SkillType} from "../api/model";

export const emptySkill = {
    id: '',
    name: '',
    characteristic: CharacteristicType.Brawn,
    type: SkillType.General,
    initiative: false,
} as Skill;