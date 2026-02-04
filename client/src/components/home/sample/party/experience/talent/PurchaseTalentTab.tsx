import {
    Activation,
    CostType,
    Difficulty,
    LimitType,
    RangeBand,
    type Talent,
    TalentTier
} from "../../../../../../api/model";
import {useState} from "react";
import CenteredCardHeader from "../../../../../common/card/header/CenteredCardHeader.tsx";
import {Card, CardContent} from "@mui/material";
import {TalentPyramidGrid} from "./TalentPyramidGrid.tsx";
import type {TalentDefinition} from "../../sample/TalentSampleApp.tsx";
import {emptySkill} from "../../../../../../models/Template.ts";

interface Props {
    campaignTalents: Talent[];
    talents: Record<string, number>;
    experience: number;
    onTalentSpend: (experience: number, talents: Record<string, number>) => void;
}

export interface PyramidSlot {
    row: number;
    column: number;
    tier: 1 | 2 | 3 | 4 | 5;
}

export interface SlotAssignment {
    row: number;
    column: number;
    talentId: string;
    purchased: boolean;
}

const pyramidStructure: PyramidSlot[] = [
    // Row 1: 1 slot - Tier 1
    {row: 1, column: 1, tier: 1},

    // Row 2: 2 slots - T1, T2
    {row: 2, column: 1, tier: 1},
    {row: 2, column: 2, tier: 2},

    // Row 3: 3 slots - T1, T2, T3
    {row: 3, column: 1, tier: 1},
    {row: 3, column: 2, tier: 2},
    {row: 3, column: 3, tier: 3},

    // Row 4: 4 slots - T1, T2, T3, T4
    {row: 4, column: 1, tier: 1},
    {row: 4, column: 2, tier: 2},
    {row: 4, column: 3, tier: 3},
    {row: 4, column: 4, tier: 4},

    // Row 5: 5 slots - T1, T2, T3, T4, T5
    {row: 5, column: 1, tier: 1},
    {row: 5, column: 2, tier: 2},
    {row: 5, column: 3, tier: 3},
    {row: 5, column: 4, tier: 4},
    {row: 5, column: 5, tier: 5},

    // Row 6: 5 slots - T1, T2, T3, T4, T5
    {row: 6, column: 1, tier: 1},
    {row: 6, column: 2, tier: 2},
    {row: 6, column: 3, tier: 3},
    {row: 6, column: 4, tier: 4},
    {row: 6, column: 5, tier: 5},
];

const mockTalents: Talent[] = [
    // Tier 1 Talents
    {
        id: "grit",
        name: "Grit",
        tier: TalentTier.First,
        ranked: true,
        activation: Activation.Passive,
        description: "Gain +1 strain threshold per rank",
        summary: "",
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
    },
    {
        id: "toughened",
        name: "Toughened",
        tier: TalentTier.First,
        ranked: false,
        activation: Activation.Passive,
        description: "Gain +2 wound threshold per rank",
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
        summary: '',
    },

    // Tier 2 Talents
    {
        id: "side-step",
        name: "Side Step",
        tier: TalentTier.Second,
        ranked: true,
        activation: Activation["Active_(Maneuver)"],
        description: "Suffer strain to upgrade difficulty of incoming ranged attack",
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
        summary: '',
    },
    {
        id: "lethal-blows",
        name: "Lethal Blows",
        tier: TalentTier.Second,
        ranked: true,
        activation: Activation.Passive,
        description: "Add +10 per rank to critical injury results",
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
        summary: '',
    },
    {
        id: "point-blank",
        name: "Point Blank",
        tier: TalentTier.Second,
        ranked: false,
        activation: Activation.Passive,
        description: "Add 1 damage per rank at short range or closer",
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
        summary: '',
    },

    // Tier 3 Talents
    {
        id: "dedication",
        name: "Dedication",
        tier: TalentTier.Third,
        ranked: true,
        activation: Activation.Passive,
        description: "Gain +1 to a single characteristic (max 6)",
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
        summary: '',
    },
    {
        id: "expert-tracker",
        name: "Expert Tracker",
        tier: TalentTier.Third,
        ranked: false,
        activation: Activation.Passive,
        description: "Remove setback from tracking checks",
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
        summary: '',
    },

    // Tier 4 Talents
    {
        id: "deadly-accuracy",
        name: "Deadly Accuracy",
        tier: TalentTier.Fourth,
        ranked: false,
        activation: Activation.Passive,
        description: "Use Agility instead of Brawn for ranged damage",
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
        summary: '',
    },
    {
        id: "defensive-stance",
        name: "Defensive Stance",
        tier: TalentTier.Fourth,
        ranked: true,
        activation: Activation["Active_(Maneuver)"],
        description: "Suffer setback to increase defense by ranks",
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
        summary: '',
    },

    // Tier 5 Talents
    {
        id: "true-aim",
        name: "True Aim",
        tier: TalentTier.Fifth,
        ranked: true,
        activation: Activation["Active_(Maneuver)"],
        description: "Upgrade ability or enemy difficulty for next ranged attack",
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
        summary: '',
    },
    {
        id: "improved-dodge",
        name: "Improved Dodge",
        tier: TalentTier.Fifth,
        ranked: false,
        activation: Activation["Active_(Incidental)"],
        description: "Spend Story Point to upgrade attack difficulty",
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
        summary: '',
    },
];

export default function PurchaseTalentTab(props: Props) {
    const {campaignTalents, talents, experience, onTalentSpend} = props;
    const [slotAssignments, setSlotAssignments] = useState<
        Record<string, SlotAssignment>
    >({});
    const [startingXp] = useState(110);

    const getSlotKey = (row: number, column: number) => `${row}-${column}`;

    const handleAssignTalent = (
        row: number,
        column: number,
        talentId: string
    ) => {
        const key = getSlotKey(row, column);
        setSlotAssignments((prev) => ({
            ...prev,
            [key]: {row, column, talentId, purchased: false},
        }));
    };

    const handlePurchase = (row: number, column: number) => {
        const key = getSlotKey(row, column);
        setSlotAssignments((prev) => ({
            ...prev,
            [key]: {...prev[key], purchased: true},
        }));
    };

    const handleRefund = (row: number, column: number) => {
        const key = getSlotKey(row, column);
        setSlotAssignments((prev) => ({
            ...prev,
            [key]: {...prev[key], purchased: false},
        }));
    };

    const handleClearSlot = (row: number, column: number) => {
        const key = getSlotKey(row, column);
        setSlotAssignments((prev) => {
            const newState = {...prev};
            delete newState[key];
            return newState;
        });
    };

    const handleReset = () => {
        setSlotAssignments({});
    };

    // Calculate spent XP
    // const calculateSpentXp = (): number => {
    //     let spent = 0;
    //     const tierCosts = {1: 5, 2: 10, 3: 15, 4: 20, 5: 25};
    //
    //     Object.values(slotAssignments).forEach((assignment) => {
    //         if (assignment.purchased) {
    //             const talent = mockTalents.find((t) => t.id === assignment.talentId);
    //             if (talent) {
    //                 // Calculate effective cost based on talent rank
    //                 const currentRank = getTalentRank(assignment.talentId);
    //                 const effectiveTier = Math.min(
    //                     5,
    //                     talent.tier + currentRank - 1
    //                 ) as 1 | 2 | 3 | 4 | 5;
    //                 spent += tierCosts[effectiveTier];
    //             }
    //         }
    //     });
    //
    //     return spent;
    // };

    // Get current rank of a talent (count purchased slots with this talent)
    const getTalentRank = (talentId: string): number => {
        return Object.values(slotAssignments).filter(
            (a) => a.talentId === talentId && a.purchased
        ).length;
    };

    return (
        <Card>
            <CenteredCardHeader title={'Purchase Talents'}/>
            <CardContent>
                <TalentPyramidGrid
                    pyramidStructure={pyramidStructure}
                    talents={mockTalents}
                    slotAssignments={slotAssignments}
                    onAssignTalent={handleAssignTalent}
                    onPurchase={handlePurchase}
                    onRefund={handleRefund}
                    onClearSlot={handleClearSlot}
                    availableXp={experience}
                    getSlotKey={getSlotKey}
                    getTalentRank={getTalentRank}
                />
            </CardContent>
        </Card>
    );
}