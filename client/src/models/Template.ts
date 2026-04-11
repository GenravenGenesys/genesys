import {
    type Ability,
    type Action,
    ActionType,
    Activation,
    type AdversaryTemplate,
    AdversaryTemplateType,
    type Archetype,
    type ArchetypeSkill,
    type Career,
    CharacteristicType,
    CheckContext,
    Target,
    CostType,
    type CriticalInjury,
    Difficulty,
    DiceType,
    Duration,
    EquipmentType,
    type Incidental,
    type ItemTemplate,
    LimitType,
    type Maneuver,
    type PlayerCharacter,
    type PlayerSkill,
    type PlayerTalent,
    type Quality,
    type QualityStats,
    type Motivation,
    RangeBand,
    type Skill,
    SkillType,
    type Talent,
    Tier,
} from "../api/model";

export const emptySkill = {
    id: '',
    name: '',
    characteristic: CharacteristicType.Brawn,
    type: SkillType.General,
    initiative: false,
} as Skill;

export const emptyQuality = {
    id: '',
    name: '',
    description: '',
    cost: 2,
    armor: true,
    weapon: true,
    stats: {
        criticalInjury: 0,
        ignoreSoak: 0,
        damageOverTime: 0,
        areaDamage: 0,
        soak: 0,
        meleeDefense: 0,
        rangedDefense: 0,
        ensnare: false,
        stun: false,
        disorient: false,
        diceModifier: {
            diceType: DiceType.Boost,
            amount: 0,
            checkContext: CheckContext.All,
            checkTarget: Target.Self,
        },
        resultsModifier: {
            results: {success: 0, advantage: 0, triumph: 0, failure: 0, threat: 0, despair: 0},
            checkContext: CheckContext.All,
            checkTarget: Target.Self,
        },
    } as QualityStats,
} as Quality;

export const emptyItemTemplate = {
    id: '',
    name: '',
    description: '',
    type: EquipmentType.Weapon,
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
        soak: {
            base: 0,
            current: 0
        },
        defense: {
            base: 0,
            current: 0
        },
    },
} as ItemTemplate;

export const emptyTalent = {
    id: '',
    name: '',
    description: '',
    summary: '',
    activation: Activation.Passive,
    tier: Tier.First,
    ranked: false,
    cost: {
        type: CostType.None,
        amount: 0,
    },
    limit: {
        type: LimitType.None,
        limit: 0,
    },
    abilityModifiers: {
        diceModifiers: [],
        resultsModifiers: [],
        healEffects: [],
        environmentModifiers: [],
        freeMoveManeuver: false,
        criticalInjuryCountAsOne: false,
        moveStoryPoint: false,
    },
    diceModifiers: [],
    talentSkills: {
        potentialCareerSkills: [],
    },
    statModifiers: {
        wounds: 0,
        strain: 0,
        soak: 0,
        defense: 0,
        encumbranceThreshold: 0,
    },
    talentSkillCheck: {
        skill: {...emptySkill, ranks: 0},
        difficulty: Difficulty.Easy,
        opposedSkill: {...emptySkill, ranks: 0, group: false}
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
    },
    size: 1,
    motivations: [] as Motivation[]
} as AdversaryTemplate;

export const emptyArchetype = {
    id: '',
    name: '',
    description: '',
    brawn: 1,
    agility: 1,
    intellect: 1,
    cunning: 1,
    willpower: 1,
    presence: 1,
    wounds: 1,
    strain: 1,
    abilities: [],
    skills: [] as ArchetypeSkill[],
    experience: 0
} as Archetype;

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

export const emptyPlayerCharacter = {
    id: '',
    name: '',
    archetype: emptyArchetype,
    career: emptyCareer,
    description: '',
    background: '',
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
    skills: [] as PlayerSkill[],
    talents: [] as PlayerTalent[],
    equipment: {
        weapons: [] as ItemTemplate[],
        equippedArmor: emptyItemTemplate,
        otherGear: [] as ItemTemplate[]
    },
    motivations: [] as Motivation[],
    experience: {
        initial: 0,
        total: 0,
        available: 0
    },
} as PlayerCharacter;

export const emptyCriticalInjury = {
    id: '',
    name: '',
    description: '',
    severity: Difficulty.Easy,
    min: 0,
    max: 0,
} as CriticalInjury;

export const emptyAction = {
    type: ActionType.Skill_Check,
    opposed: false,
    difficulty: Difficulty.Easy,
    target: Target.Self,
    range: RangeBand.Engaged,
    damage: 0,
    brawnBonus: false,
    critical: 0,
    diceModifiers: [],
    resultsModifiers: [],
} as Action;

export const emptyIncidental = {
    diceModifiers: [],
    resultsModifiers: [],
    healEffects: [],
} as Incidental;

export const emptyManeuver = {
    target: Target.Self,
    duration: Duration.Scene,
    stackable: false,
    maxTargets: 1,
    rangeScalesWithRank: false,
    diceModifiers: [],
    resultsModifiers: [],
    defenseModifiers: [],
} as Maneuver;

export const emptyAbility = {
    name: '',
    description: '',
    activation: Activation.Passive,
    cost: {
        type: CostType.None,
        amount: 0,
    },
    limit: {
        type: LimitType.None,
        limit: 0,
    },
    statModifiers: {
        wounds: 0,
        strain: 0,
        soak: 0,
        defense: 0,
        encumbranceThreshold: 0,
    },
    abilityModifiers: {
        diceModifiers: [],
        resultsModifiers: [],
        healEffects: [],
        environmentModifiers: [],
        criticalInjuryCountAsOne: false,
        freeMoveManeuver: false,
        moveStoryPoint: false,
    },
} as Ability;

