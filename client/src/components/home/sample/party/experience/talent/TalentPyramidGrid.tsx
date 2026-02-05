import React from "react";
import { Box } from "@mui/material";
import { TalentSlotCard } from "./TalentSlotCard";
import type {Talent} from "../../../../../../api/model";
import type {PyramidSlot, SlotAssignment} from "./PurchaseTalentTab.tsx";



interface TalentPyramidGridProps {
    pyramidStructure: PyramidSlot[];
    talents: Talent[];
    slotAssignments: Record<string, SlotAssignment>;
    onAssignTalent: (row: number, column: number, talentId: string) => void;
    onPurchase: (row: number, column: number) => void;
    onRefund: (row: number, column: number) => void;
    onClearSlot: (row: number, column: number) => void;
    availableXp: number;
    getSlotKey: (row: number, column: number) => string;
    getTalentRank: (talentId: string) => number;
}

export const TalentPyramidGrid: React.FC<TalentPyramidGridProps> = ({
                                                                        pyramidStructure,
                                                                        talents,
                                                                        slotAssignments,
                                                                        onAssignTalent,
                                                                        onPurchase,
                                                                        onRefund,
                                                                        onClearSlot,
                                                                        availableXp,
                                                                        getSlotKey,
                                                                        getTalentRank,
                                                                    }) => {
    // Get unique row numbers from pyramid structure
    const rows = Array.from(new Set(pyramidStructure.map(slot => slot.row))).sort((a, b) => a - b);

    // Check if slot is unlocked (has connection to purchased talents above)
    const isSlotUnlocked = (row: number, column: number): boolean => {
        if (row === 1) return true;

        const aboveRow = row - 1;
        const leftParentKey = getSlotKey(aboveRow, column);
        const rightParentKey = getSlotKey(aboveRow, column + 1);

        const leftParent = slotAssignments[leftParentKey];
        const rightParent = slotAssignments[rightParentKey];

        return leftParent?.purchased || false || rightParent?.purchased || false;
    };

    // Calculate effective cost for this slot
    const getSlotCost = (slot: PyramidSlot, talentId?: string): number => {
        if (!talentId) return 0;

        const talent = talents.find((t) => t.id === talentId);
        if (!talent) return 0;

        const tierCosts: Record<number, number> = { 1: 5, 2: 10, 3: 15, 4: 20, 5: 25 };

        // Convert TalentTier enum to numeric value
        const tierToNumber = (tier: typeof slot.tier): number => {
            const tierMap: Record<string, number> = {
                'First': 1,
                'Second': 2,
                'Third': 3,
                'Fourth': 4,
                'Fifth': 5
            };
            return tierMap[tier] || 1;
        };

        if (!talent.ranked) {
            return tierCosts[tierToNumber(slot.tier)];
        }

        // For ranked talents, calculate cost based on current rank
        const currentRank = getTalentRank(talentId);
        const baseTierNum = tierToNumber(talent.tier);
        const effectiveTier = Math.min(5, baseTierNum + currentRank);

        return tierCosts[effectiveTier];
    };

    return (
        <Box>
            {rows.map((row) => {
                const rowSlots = pyramidStructure.filter((s) => s.row === row);

                return (
                    <Box
                        key={row}
                        sx={{
                            display: "flex",
                            justifyContent: "left",
                            gap: 1,
                            mb: 1,
                        }}
                    >
                        {rowSlots.map((slot) => {
                            const key = getSlotKey(slot.row, slot.column);
                            const assignment = slotAssignments[key];
                            const isUnlocked = isSlotUnlocked(slot.row, slot.column);
                            const talent = assignment
                                ? talents.find((t) => t.id === assignment.talentId)
                                : undefined;
                            const currentRank = talent ? getTalentRank(talent.id) : 0;
                            const slotCost = getSlotCost(slot, assignment?.talentId);
                            const canAfford = slotCost <= availableXp;

                            return (
                                <TalentSlotCard
                                    key={key}
                                    slot={slot}
                                    assignment={assignment}
                                    talent={talent}
                                    talents={talents}
                                    isUnlocked={isUnlocked}
                                    currentRank={currentRank}
                                    slotCost={slotCost}
                                    canAfford={canAfford}
                                    onAssignTalent={(talentId) =>
                                        onAssignTalent(slot.row, slot.column, talentId)
                                    }
                                    onPurchase={() => onPurchase(slot.row, slot.column)}
                                    onRefund={() => onRefund(slot.row, slot.column)}
                                    onClearSlot={() => onClearSlot(slot.row, slot.column)}
                                />
                            );
                        })}
                    </Box>
                );
            })}
        </Box>
    );
};
