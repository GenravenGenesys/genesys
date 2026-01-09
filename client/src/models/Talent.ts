import {Activation, CostType, Difficulty, LimitType, RangeBand, type Talent, TalentTier} from "../api/model";
import {emptySkill} from "./Skill.ts";

export const emptyTalent = {
    id: '',
    name: '',
    description: '',
    summary: '',
    activation: Activation.Passive,
    tier: TalentTier.First,
    ranked: false,
    action: {
        skill: {...emptySkill, ranks: 0},
        difficulty: Difficulty.Easy,
        opposedSkill: {...emptySkill, ranks: 0},
        rangeBand: RangeBand.Engaged
    },
    cost: {
        type: CostType.None,
        amount: 0,
    },
    limit: {
        type: LimitType.None,
        limit: 0,
    },
    modifiers: [],
    talentRollModifiers: [],
    talentSkills: {
        potentialCareerSkills: [],
        potentialNonCareerSkills: [],
    },
    talentStats: {
        wounds: 0,
        strain: 0,
        soak: 0,
        defense: 0,
    },
    talentSkillCheck: {
        skill: {...emptySkill, ranks: 0},
        difficulty: Difficulty.Easy,
        opposedSkill: {...emptySkill, ranks: 0}
    },
} as Talent;