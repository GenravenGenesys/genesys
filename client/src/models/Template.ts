import {
    Activation, type AdversaryTemplate, AdversaryTemplateType,
    CostType,
    Difficulty,
    LimitType,
    RangeBand,
    type Skill,
    SkillType,
    type Talent,
    TalentTier
} from "../api/model";

export const emptySkill = {
    id: '',
    name: '',
    characteristic: {},
    type: SkillType.General,
    initiative: false,
} as Skill;

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

export const emptyAdversary = {
    id: '',
    name: '',
    description: '',
    type: AdversaryTemplateType.Nemesis,
    characteristics: {
        brawn: 0,
        agility: 0,
        intellect: 0,
        cunning: 0,
        willpower: 0,
        presence: 0,
    },
    derivedStats: {
        soak: {
            current: 0,
            base: 0
        },
        woundThreshold: {
            current: 0,
            total: 0,
        },
        strainThreshold: {
            current: 0,
            total: 0,
        },
        defense: {
            current: 0,
            base: 0
        },
    }
} as AdversaryTemplate;