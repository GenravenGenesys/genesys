import {
    Activation, type AdversaryTemplate, AdversaryTemplateType, type Archetype, type Attribute, type Career,
    CostType,
    Difficulty,
    type ItemTemplate, ItemTemplateType,
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

export const emptyItemTemplate = {
    id: '',
    name: '',
    description: '',
    type: ItemTemplateType.Weapon,
    price: 0,
    restricted: false,
    encumbrance: 0,
    rarity: 0,
    modifiers: [],
    qualities: [],
    amount: 0,
    weaponStats: {
        damage: 0,
        critical: 0,
        range: RangeBand.Engaged,
        brawn: false,
        skill: {...emptySkill, ranks: 0},
    },
    armorStats: {
        soak: {} as Attribute,
        defense: {} as Attribute,
    },
} as ItemTemplate;

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
    statModifiers: {
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
        brawn: {
            current: 1,
            base: 1
        },
        agility: {
            current: 1,
            base: 1
        },
        intellect: {
            current: 1,
            base: 1
        },
        cunning: {
            current: 1,
            base: 1
        },
        willpower: {
            current: 1,
            base: 1
        },
        presence: {
            current: 1,
            base: 1
        },
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
    },
    equipment: {
        weapons: [],
        equippedArmor: emptyItemTemplate,
        otherGear: []
    },
    skills: [],
    ratings: {
        combat: 1,
        social: 1,
        general: 1
    }
} as AdversaryTemplate;

export const emptyArchetype = {} as Archetype;

export const emptyCareer = {
    skills: [
        emptySkill,
        emptySkill,
        emptySkill,
        emptySkill,
        emptySkill,
        emptySkill,
        emptySkill,
        emptySkill,
    ] as Skill[]
} as Career;