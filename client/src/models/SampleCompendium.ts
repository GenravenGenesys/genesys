import {
    Activation,
    type AdversaryTemplate,
    AdversaryTemplateType,
    type Archetype,
    type Career,
    CharacteristicType,
    type CriticalInjury,
    Difficulty,
    EquipmentType,
    type ItemTemplate,
    type Quality,
    RangeBand,
    type Skill,
    SkillType,
    type Talent,
    Tier,
    CostType,
    LimitType,
    DiceType,
    CheckContext,
    Target,
} from "../api/model";
import {emptyItemTemplate, emptySkill} from "./Template.ts";

// ── Skills ───────────────────────────────────────────────────────────────────

export const sampleSkills: Skill[] = [
    {
        id: 'skill-athletics',
        name: 'Athletics',
        characteristic: CharacteristicType.Brawn,
        type: SkillType.General,
        initiative: false,
        summary: 'Physical exertion such as climbing, jumping, and swimming.',
        description: 'Used whenever a character attempts a feat of raw physical exertion.',
    },
    {
        id: 'skill-astrogation',
        name: 'Astrogation',
        characteristic: CharacteristicType.Intellect,
        type: SkillType.Knowledge,
        initiative: false,
        summary: 'Plotting courses through space.',
        description: 'Used when charting hyperspace lanes or navigating stellar cartography.',
    },
    {
        id: 'skill-deception',
        name: 'Deception',
        characteristic: CharacteristicType.Cunning,
        type: SkillType.Social,
        initiative: false,
        summary: 'Misleading or tricking others.',
        description: 'Covers lies, misdirection, and disguise attempts against other characters.',
    },
    {
        id: 'skill-ranged-heavy',
        name: 'Ranged (Heavy)',
        characteristic: CharacteristicType.Agility,
        type: SkillType.Combat,
        initiative: false,
        summary: 'Operating heavy ranged weapons such as blaster rifles.',
        description: 'Governs attacks made with large, two-handed ranged weapons.',
    },
    {
        id: 'skill-vigilance',
        name: 'Vigilance',
        characteristic: CharacteristicType.Willpower,
        type: SkillType.General,
        initiative: true,
        summary: 'Awareness and reaction speed.',
        description: 'Used to determine initiative order and to notice threats or hidden details.',
    },
];

// ── Archetypes ────────────────────────────────────────────────────────────────

export const sampleArchetypes: Archetype[] = [
    {
        id: 'archetype-human',
        name: 'Human',
        description: 'Adaptable and ambitious, humans are found across the galaxy in every walk of life.',
        brawn: 2,
        agility: 2,
        intellect: 2,
        cunning: 2,
        willpower: 2,
        presence: 2,
        wounds: 10,
        strain: 10,
        experience: 100,
        skills: [],
        abilities: [],
    },
    {
        id: 'archetype-android',
        name: 'Android',
        description: 'Synthetic beings of exceptional intellect, built to serve but capable of so much more.',
        brawn: 2,
        agility: 2,
        intellect: 3,
        cunning: 2,
        willpower: 1,
        presence: 2,
        wounds: 8,
        strain: 12,
        experience: 90,
        skills: [],
        abilities: [],
    },
    {
        id: 'archetype-nhali',
        name: "N'hali",
        description: 'A feral warrior species, physically imposing and deeply spiritual.',
        brawn: 3,
        agility: 2,
        intellect: 2,
        cunning: 2,
        willpower: 2,
        presence: 1,
        wounds: 12,
        strain: 8,
        experience: 90,
        skills: [],
        abilities: [],
    },
];

// ── Careers ───────────────────────────────────────────────────────────────────

const blasterSkill: Skill = {
    ...emptySkill,
    id: 'skill-ranged-heavy',
    name: 'Ranged (Heavy)',
    characteristic: CharacteristicType.Agility,
    type: SkillType.Combat,
};

const pilotingSkill: Skill = {
    ...emptySkill,
    id: 'skill-piloting',
    name: 'Piloting (Space)',
    characteristic: CharacteristicType.Agility,
    type: SkillType.General,
};

export const sampleCareers: Career[] = [
    {
        id: 'career-soldier',
        name: 'Soldier',
        skills: [
            {...emptySkill, id: 'skill-athletics', name: 'Athletics', characteristic: CharacteristicType.Brawn, type: SkillType.General},
            blasterSkill,
            {...emptySkill, id: 'skill-melee', name: 'Melee', characteristic: CharacteristicType.Brawn, type: SkillType.Combat},
            {...emptySkill, id: 'skill-resilience', name: 'Resilience', characteristic: CharacteristicType.Brawn, type: SkillType.General},
            {...emptySkill, id: 'skill-survival', name: 'Survival', characteristic: CharacteristicType.Cunning, type: SkillType.General},
            {...emptySkill, id: 'skill-medicine', name: 'Medicine', characteristic: CharacteristicType.Intellect, type: SkillType.General},
            {...emptySkill, id: 'skill-vigilance', name: 'Vigilance', characteristic: CharacteristicType.Willpower, type: SkillType.General, initiative: true},
            {...emptySkill, id: 'skill-discipline', name: 'Discipline', characteristic: CharacteristicType.Willpower, type: SkillType.General},
        ],
    },
    {
        id: 'career-pilot',
        name: 'Pilot',
        skills: [
            pilotingSkill,
            {...emptySkill, id: 'skill-piloting-planetary', name: 'Piloting (Planetary)', characteristic: CharacteristicType.Agility, type: SkillType.General},
            blasterSkill,
            {...emptySkill, id: 'skill-astrogation', name: 'Astrogation', characteristic: CharacteristicType.Intellect, type: SkillType.Knowledge},
            {...emptySkill, id: 'skill-mechanics', name: 'Mechanics', characteristic: CharacteristicType.Intellect, type: SkillType.General},
            {...emptySkill, id: 'skill-perception', name: 'Perception', characteristic: CharacteristicType.Cunning, type: SkillType.General},
            {...emptySkill, id: 'skill-skulduggery', name: 'Skulduggery', characteristic: CharacteristicType.Cunning, type: SkillType.General},
            {...emptySkill, id: 'skill-streetwise', name: 'Streetwise', characteristic: CharacteristicType.Cunning, type: SkillType.Social},
        ],
    },
    {
        id: 'career-diplomat',
        name: 'Diplomat',
        skills: [
            {...emptySkill, id: 'skill-charm', name: 'Charm', characteristic: CharacteristicType.Presence, type: SkillType.Social},
            {...emptySkill, id: 'skill-deception', name: 'Deception', characteristic: CharacteristicType.Cunning, type: SkillType.Social},
            {...emptySkill, id: 'skill-leadership', name: 'Leadership', characteristic: CharacteristicType.Presence, type: SkillType.Social},
            {...emptySkill, id: 'skill-negotiation', name: 'Negotiation', characteristic: CharacteristicType.Presence, type: SkillType.Social},
            {...emptySkill, id: 'skill-knowledge-core', name: 'Knowledge (Core Worlds)', characteristic: CharacteristicType.Intellect, type: SkillType.Knowledge},
            {...emptySkill, id: 'skill-knowledge-lore', name: 'Knowledge (Lore)', characteristic: CharacteristicType.Intellect, type: SkillType.Knowledge},
            {...emptySkill, id: 'skill-perception', name: 'Perception', characteristic: CharacteristicType.Cunning, type: SkillType.General},
            {...emptySkill, id: 'skill-vigilance', name: 'Vigilance', characteristic: CharacteristicType.Willpower, type: SkillType.General, initiative: true},
        ],
    },
];

// ── Talents ───────────────────────────────────────────────────────────────────

const baseTalentFields = {
    cost: {type: CostType.None, amount: 0},
    limit: {type: LimitType.None, limit: 0},
    abilityModifiers: {
        diceModifiers: [],
        resultsModifiers: [],
        healEffects: [],
        environmentModifiers: [],
        freeMoveManeuver: false,
        criticalInjuryCountAsOne: false,
        moveStoryPoint: false,
    },
    talentRollModifiers: [],
    talentSkills: {potentialCareerSkills: []},
    statModifiers: {wounds: 0, strain: 0, soak: 0, defense: 0, encumbranceThreshold: 0},
    talentSkillCheck: {
        skill: {...emptySkill, ranks: 0},
        difficulty: Difficulty.Easy,
        opposedSkill: {...emptySkill, ranks: 0, group: false},
    },
    action: {
        skill: {...emptySkill, ranks: 0},
        difficulty: Difficulty.Easy,
        opposedSkill: {...emptySkill, ranks: 0},
        rangeBand: RangeBand.Engaged,
    },
};

export const sampleTalents: Talent[] = [
    {
        ...baseTalentFields,
        id: 'talent-hard-headed',
        name: 'Hard Headed',
        activation: Activation.Passive,
        tier: Tier.First,
        ranked: false,
        summary: 'Ignore the first critical injury penalty.',
        description: 'When making a skill check, the character may ignore the effects of one Critical Injury.',
    },
    {
        ...baseTalentFields,
        id: 'talent-quick-strike',
        name: 'Quick Strike',
        activation: Activation.Passive,
        tier: Tier.First,
        ranked: true,
        summary: 'Add a Boost die when attacking an unengaged target.',
        description: 'The character adds a Boost die to combat checks made against targets who have not yet acted this encounter.',
    },
    {
        ...baseTalentFields,
        id: 'talent-side-step',
        name: 'Side Step',
        activation: Activation['Active_(Maneuver)'],
        tier: Tier.Second,
        ranked: true,
        summary: 'Suffer strain to upgrade difficulty of incoming attacks.',
        description: 'Once per round, the character may perform a Side Step maneuver, suffering 1 strain. Until the start of the next round, upgrade the difficulty of all combat checks targeting them once.',
    },
    {
        ...baseTalentFields,
        id: 'talent-natural-pilot',
        name: 'Natural Pilot',
        activation: Activation.Passive,
        tier: Tier.Third,
        ranked: false,
        summary: 'Once per session, reroll Piloting check.',
        description: 'Once per session, the character may reroll any one Piloting (Planetary) or Piloting (Space) check.',
    },
    {
        ...baseTalentFields,
        id: 'talent-inspiring-rhetoric',
        name: 'Inspiring Rhetoric',
        activation: Activation['Active_(Action)'],
        tier: Tier.Second,
        ranked: false,
        summary: 'Recover strain for each ally in short range.',
        description: 'The character makes an Average Leadership check. For each success, one ally within short range recovers 1 strain. For each Advantage, one ally within range may recover 1 additional strain.',
    },
];

// ── Equipment (Items) ─────────────────────────────────────────────────────────

const meleeWeaponSkill: Skill = {
    ...emptySkill,
    id: 'skill-melee',
    name: 'Melee',
    characteristic: CharacteristicType.Brawn,
    type: SkillType.Combat,
};

export const sampleItems: ItemTemplate[] = [
    {
        ...emptyItemTemplate,
        id: 'item-heavy-blaster',
        name: 'Heavy Blaster Rifle',
        type: EquipmentType.Weapon,
        description: 'A powerful, military-grade blaster rifle capable of sustained fire in combat zones.',
        price: 1500,
        restricted: true,
        encumbrance: 6,
        rarity: 6,
        amount: 1,
        qualities: [],
        weaponStats: {
            skill: {...emptySkill, id: 'skill-ranged-heavy', name: 'Ranged (Heavy)', characteristic: CharacteristicType.Agility, type: SkillType.Combat},
            damage: 10,
            critical: 3,
            range: RangeBand.Long,
            brawn: false,
        },
        armorStats: {soak: {base: 0, current: 0}, defense: {base: 0, current: 0}},
    },
    {
        ...emptyItemTemplate,
        id: 'item-combat-knife',
        name: 'Combat Knife',
        type: EquipmentType.Weapon,
        description: 'A sturdy, balanced combat knife useful in close-quarters combat.',
        price: 25,
        restricted: false,
        encumbrance: 1,
        rarity: 1,
        amount: 1,
        qualities: [],
        weaponStats: {
            skill: meleeWeaponSkill,
            damage: 3,
            critical: 3,
            range: RangeBand.Engaged,
            brawn: true,
        },
        armorStats: {soak: {base: 0, current: 0}, defense: {base: 0, current: 0}},
    },
    {
        ...emptyItemTemplate,
        id: 'item-light-battle-armor',
        name: 'Light Battle Armor',
        type: EquipmentType.Armor,
        description: 'Standard-issue light armor providing moderate protection without hampering movement.',
        price: 500,
        restricted: false,
        encumbrance: 3,
        rarity: 3,
        amount: 1,
        qualities: [],
        weaponStats: {skill: {...emptySkill, ranks: 0}, damage: 0, critical: 5, range: RangeBand.Engaged, brawn: false},
        armorStats: {soak: {base: 2, current: 2}, defense: {base: 1, current: 1}},
    },
    {
        ...emptyItemTemplate,
        id: 'item-medpac',
        name: 'Medpac',
        type: EquipmentType.Gear,
        description: 'A compact first-aid kit loaded with bacta patches, stims, and diagnostic tools.',
        price: 100,
        restricted: false,
        encumbrance: 2,
        rarity: 2,
        amount: 1,
        qualities: [],
        weaponStats: {skill: {...emptySkill, ranks: 0}, damage: 0, critical: 5, range: RangeBand.Engaged, brawn: false},
        armorStats: {soak: {base: 0, current: 0}, defense: {base: 0, current: 0}},
    },
];

// ── Adversaries ───────────────────────────────────────────────────────────────

const baseCharacteristics = {
    brawn: {current: 2, base: 2},
    agility: {current: 2, base: 2},
    intellect: {current: 2, base: 2},
    cunning: {current: 2, base: 2},
    willpower: {current: 2, base: 2},
    presence: {current: 2, base: 2},
};

const baseDerivedStats = {
    soak: {current: 2, base: 2},
    woundThreshold: {current: 0, total: 10},
    strainThreshold: {current: 0, total: 10},
    defense: {current: 0, base: 0},
};

export const sampleAdversaries: AdversaryTemplate[] = [
    {
        id: 'adv-stormtrooper',
        name: 'Stormtrooper',
        description: 'Elite infantry of the Imperial order — disciplined, armored, and armed.',
        type: AdversaryTemplateType.Minion,
        characteristics: {
            ...baseCharacteristics,
            brawn: {current: 3, base: 3},
            agility: {current: 3, base: 3},
        },
        derivedStats: {
            ...baseDerivedStats,
            soak: {current: 4, base: 4},
            woundThreshold: {current: 0, total: 5},
        },
        equipment: {weapons: [], equippedArmor: emptyItemTemplate, otherGear: []},
        skills: [
            {id: 'skill-ranged-heavy', name: 'Ranged (Heavy)', characteristic: CharacteristicType.Agility, type: SkillType.Combat, initiative: false, ranks: 1, group: true},
        ],
        ratings: {combat: 2, social: 1, general: 1},
        size: 1,
        motivations: [],
    },
    {
        id: 'adv-local-thug',
        name: 'Local Thug',
        description: 'A hired muscle with more brawn than brains, loyal only to whoever is paying.',
        type: AdversaryTemplateType.Rival,
        characteristics: {
            ...baseCharacteristics,
            brawn: {current: 3, base: 3},
            cunning: {current: 1, base: 1},
        },
        derivedStats: {
            ...baseDerivedStats,
            soak: {current: 3, base: 3},
            woundThreshold: {current: 0, total: 14},
        },
        equipment: {weapons: [], equippedArmor: emptyItemTemplate, otherGear: []},
        skills: [
            {id: 'skill-melee', name: 'Melee', characteristic: CharacteristicType.Brawn, type: SkillType.Combat, initiative: false, ranks: 2, group: false},
            {id: 'skill-coercion', name: 'Coercion', characteristic: CharacteristicType.Willpower, type: SkillType.Social, initiative: false, ranks: 1, group: false},
        ],
        ratings: {combat: 2, social: 1, general: 1},
        size: 1,
        motivations: [],
    },
    {
        id: 'adv-sith-inquisitor',
        name: 'Sith Inquisitor',
        description: 'A dark-side wielder dispatched to hunt force-sensitive fugitives. Ruthless and relentless.',
        type: AdversaryTemplateType.Nemesis,
        characteristics: {
            brawn: {current: 3, base: 3},
            agility: {current: 3, base: 3},
            intellect: {current: 3, base: 3},
            cunning: {current: 3, base: 3},
            willpower: {current: 4, base: 4},
            presence: {current: 3, base: 3},
        },
        derivedStats: {
            soak: {current: 5, base: 5},
            woundThreshold: {current: 0, total: 22},
            strainThreshold: {current: 0, total: 20},
            defense: {current: 1, base: 1},
        },
        equipment: {weapons: [], equippedArmor: emptyItemTemplate, otherGear: []},
        skills: [
            {id: 'skill-lightsaber', name: 'Lightsaber', characteristic: CharacteristicType.Brawn, type: SkillType.Combat, initiative: false, ranks: 4, group: false},
            {id: 'skill-coercion', name: 'Coercion', characteristic: CharacteristicType.Willpower, type: SkillType.Social, initiative: false, ranks: 3, group: false},
            {id: 'skill-vigilance', name: 'Vigilance', characteristic: CharacteristicType.Willpower, type: SkillType.General, initiative: true, ranks: 3, group: false},
        ],
        ratings: {combat: 5, social: 3, general: 3},
        size: 1,
        motivations: [],
    },
];

// ── Qualities ─────────────────────────────────────────────────────────────────

const baseQualityStats = {
    criticalInjury: 0,
    ignoreSoak: 0,
    damageOverTime: 0,
    areaDamage: 0,
    soak: 0,
    meleeDefense: 0,
    rangedDefense: 0,
    ensnare: false,
    stun: false,
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
};

export const sampleQualities: Quality[] = [
    {
        id: 'quality-accurate',
        name: 'Accurate',
        description: 'Add a Boost die per rank to attacks made with this weapon.',
        cost: 1,
        armor: false,
        weapon: true,
        stats: {...baseQualityStats},
    },
    {
        id: 'quality-blast',
        name: 'Blast',
        description: 'On a successful hit, the weapon deals its damage rating to all characters within short range of the target.',
        cost: 5,
        armor: false,
        weapon: true,
        stats: {...baseQualityStats, areaDamage: 5},
    },
    {
        id: 'quality-reinforced',
        name: 'Reinforced',
        description: 'Armor with this quality provides additional soak.',
        cost: 3,
        armor: true,
        weapon: false,
        stats: {...baseQualityStats, soak: 1},
    },
    {
        id: 'quality-stun',
        name: 'Stun',
        description: 'Successful attacks with this weapon or armor may stun the target.',
        cost: 2,
        armor: true,
        weapon: true,
        stats: {...baseQualityStats, stun: true},
    },
];

// ── Critical Injuries ─────────────────────────────────────────────────────────

export const sampleCriticalInjuries: CriticalInjury[] = [
    {
        id: 'crit-stunned',
        name: 'Stunned',
        description: 'The target is momentarily dazed. They are disoriented until the end of their next turn.',
        severity: Difficulty.Easy,
        min: 1,
        max: 20,
    },
    {
        id: 'crit-strained-muscle',
        name: 'Strained Muscle',
        description: 'The character adds a Setback die to all Brawn and Agility checks until healed.',
        severity: Difficulty.Average,
        min: 21,
        max: 40,
    },
    {
        id: 'crit-blinded',
        name: 'Blinded',
        description: 'The character cannot see. They upgrade the difficulty of all checks relying on sight twice.',
        severity: Difficulty.Hard,
        min: 41,
        max: 60,
    },
    {
        id: 'crit-knocked-out',
        name: 'Knocked Out',
        description: 'The character is incapacitated for the remainder of the encounter.',
        severity: Difficulty.Daunting,
        min: 61,
        max: 80,
    },
    {
        id: 'crit-mortal-wound',
        name: 'Mortal Wound',
        description: 'The character is near death. If not stabilized at the end of the encounter, they die.',
        severity: Difficulty.Formidable,
        min: 81,
        max: 100,
    },
];
