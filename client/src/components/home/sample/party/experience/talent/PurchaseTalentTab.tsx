import {
    Activation,
    CostType,
    Difficulty,
    LimitType,
    RangeBand,
    type Talent,
    Tier
} from "../../../../../../api/model";
import {useState, useEffect, useMemo} from "react";
import CenteredCardHeader from "../../../../../common/card/header/CenteredCardHeader.tsx";
import {Card, CardContent} from "@mui/material";
import {TalentPyramidGrid} from "./TalentPyramidGrid.tsx";
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
    tier: Tier;
    talentId: string | null;
}

// Helper function to generate pyramid structure for a given row
const generateRowStructure = (row: number): PyramidSlot[] => {
    const slots: PyramidSlot[] = [];
    const numSlots = Math.min(row, 5); // Max 5 slots per row

    const tierMapping: Record<number, Tier> = {
        1: Tier.First,
        2: Tier.Second,
        3: Tier.Third,
        4: Tier.Fourth,
        5: Tier.Fifth,
    };

    for (let column = 1; column <= numSlots; column++) {
        slots.push({
            row,
            column,
            tier: tierMapping[column] || Tier.First,
            talentId: null,
        });
    }

    return slots;
};


const mockTalents: Talent[] = [
    // Tier 1 Talents
    {
        id: "grit",
        name: "Grit",
        tier: Tier.First,
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
        tier: Tier.First,
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
        tier: Tier.Second,
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
        tier: Tier.Second,
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
        tier: Tier.Second,
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
        tier: Tier.Third,
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
        tier: Tier.Third,
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
        tier: Tier.Fourth,
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
        tier: Tier.Fourth,
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
        tier: Tier.Fifth,
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
        tier: Tier.Fifth,
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

    // Compute initial pyramid structure from talents prop
    const initialPyramidSlots = useMemo(() => {
        const slots: PyramidSlot[] = [];

        const tierMapping: Record<number, Tier> = {
            1: Tier.First,
            2: Tier.Second,
            3: Tier.Third,
            4: Tier.Fourth,
            5: Tier.Fifth,
        };

        // Track which talents need to be placed and in which columns they can go
        // Each talent can only appear once per column
        interface TalentNeed {
            talentId: string;
            allowedColumns: Set<number>; // Columns where this talent can still be placed
        }

        const talentNeeds: TalentNeed[] = [];

        // Process talents and create entries for each rank
        Object.entries(talents).forEach(([talentId, ranks]) => {
            const count = ranks > 0 ? ranks : 1;

            // This talent needs to be placed 'count' times, each in a different column
            const allowedColumns = new Set<number>();
            for (let i = 1; i <= Math.min(count, 5); i++) {
                allowedColumns.add(i);
            }

            talentNeeds.push({
                talentId,
                allowedColumns,
            });
        });

        // Build pyramid by filling left-to-right, row-by-row
        let currentRow = 1;

        while (talentNeeds.some(need => need.allowedColumns.size > 0)) {
            const numSlotsInRow = Math.min(currentRow, 5);
            let slotsFilledInRow = 0;

            // Try to fill each column in this row from left to right
            for (let column = 1; column <= numSlotsInRow; column++) {
                // Find a talent that can be placed in this column
                const availableTalent = talentNeeds.find(need => need.allowedColumns.has(column));

                if (availableTalent) {
                    // Place this talent
                    slots.push({
                        row: currentRow,
                        column,
                        tier: tierMapping[column] || Tier.First,
                        talentId: availableTalent.talentId,
                    });

                    // Mark this column as used for this talent
                    availableTalent.allowedColumns.delete(column);
                    slotsFilledInRow++;
                } else {
                    // No talent available for this column, stop filling this row
                    // (must fill left-to-right with no gaps)
                    break;
                }
            }

            // If we didn't fill any slots, we're done
            if (slotsFilledInRow === 0) {
                break;
            }

            currentRow++;
        }

        // If no talents, at least create the first row
        if (slots.length === 0) {
            slots.push({
                row: 1,
                column: 1,
                tier: Tier.First,
                talentId: null,
            });
        }

        return slots;
    }, [talents]);

    const [pyramidSlots, setPyramidSlots] = useState<PyramidSlot[]>(initialPyramidSlots);

    // Helper to find a slot by row and column
    const findSlot = (row: number, column: number): PyramidSlot | undefined => {
        return pyramidSlots.find(s => s.row === row && s.column === column);
    };

    // Helper function to check if a row should be visible
    // Row 1 is always visible. Subsequent rows are visible if the first slot of the previous row is assigned.
    const isRowUnlocked = (row: number): boolean => {
        if (row === 1) return true;

        const previousRowFirstSlot = findSlot(row - 1, 1);

        return !!previousRowFirstSlot?.talentId;
    };

    // Generate dynamic pyramid structure based on unlocked rows
    useEffect(() => {
        let row = 1;
        const newSlots: PyramidSlot[] = [];

        // Keep adding rows as long as they are unlocked
        while (isRowUnlocked(row)) {
            // Check if this row already exists
            const rowExists = pyramidSlots.some(s => s.row === row);
            if (!rowExists) {
                newSlots.push(...generateRowStructure(row));
            }
            row++;
        }

        if (newSlots.length > 0) {
            setPyramidSlots(prev => [...prev, ...newSlots]);
        }
    }, [pyramidSlots]);


    const handleAssignTalent = (
        row: number,
        column: number,
        talentId: string
    ) => {
        setPyramidSlots(prev =>
            prev.map(slot =>
                slot.row === row && slot.column === column
                    ? { ...slot, talentId }
                    : slot
            )
        );

        // Calculate experience cost: column value * 5
        const experienceCost = column * 5;
        const newExperience = experience - experienceCost;

        // Update talents record - increment rank for this talent
        const updatedTalents = {
            ...talents,
            [talentId]: (talents[talentId] || 0) + 1,
        };

        // Invoke callback with updated values
        onTalentSpend(newExperience, updatedTalents);
    };

    const handleRemoveTalent = (row: number, column: number) => {
        // Get the talent being removed
        const slotToRemove = pyramidSlots.find(s => s.row === row && s.column === column);
        const removedTalentId = slotToRemove?.talentId;

        setPyramidSlots(prev =>
            prev.map(slot =>
                slot.row === row && slot.column === column
                    ? { ...slot, talentId: null }
                    : slot
            )
        );

        if (removedTalentId) {
            // Refund experience: column value * 5
            const experienceRefund = column * 5;
            const newExperience = experience + experienceRefund;

            // Update talents record - decrement rank for this talent
            const currentRank = talents[removedTalentId] || 0;
            const updatedTalents = { ...talents };

            if (currentRank > 1) {
                updatedTalents[removedTalentId] = currentRank - 1;
            } else {
                // Remove talent from record if rank would be 0
                delete updatedTalents[removedTalentId];
            }

            // Invoke callback with updated values
            onTalentSpend(newExperience, updatedTalents);
        }
    };

    const handleReset = () => {
        setPyramidSlots(prev =>
            prev.map(slot => ({ ...slot, talentId: null }))
        );
    };

    // Get current rank of a talent (count slots with this talent)
    const getTalentRank = (talentId: string): number => {
        return pyramidSlots.filter(slot => slot.talentId === talentId).length;
    };

    return (
        <Card>
            <CenteredCardHeader title={'Purchase Talents'}/>
            <CardContent>
                <TalentPyramidGrid
                    pyramidSlots={pyramidSlots}
                    talents={mockTalents}
                    onAssignTalent={handleAssignTalent}
                    onRemoveTalent={handleRemoveTalent}
                    availableXp={experience}
                    getTalentRank={getTalentRank}
                />
            </CardContent>
        </Card>
    );
}