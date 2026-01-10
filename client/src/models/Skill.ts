import {type Skill, SkillType} from "../api/model";

export const emptySkill = {
    id: '',
    name: '',
    characteristic: {},
    type: SkillType.General,
    initiative: false,
} as Skill;