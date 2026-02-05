import React from "react";
import { Box } from "@mui/material";
import { TalentSlotCard } from "./TalentSlotCard";
import type {Talent} from "../../../../../../api/model";
import type {PyramidSlot} from "./PurchaseTalentTab.tsx";

interface TalentPyramidGridProps {
    pyramidSlots: PyramidSlot[];
    talents: Talent[];
    onAssignTalent: (row: number, column: number, talentId: string) => void;
    onRemoveTalent: (row: number, column: number) => void;
    availableXp: number;
    getTalentRank: (talentId: string) => number;
}

export const TalentPyramidGrid: React.FC<TalentPyramidGridProps> = ({
                                                                        pyramidSlots,
                                                                        talents,
                                                                        onAssignTalent,
                                                                        onRemoveTalent,
                                                                        availableXp,
                                                                        getTalentRank,
                                                                    }) => {
    // Get unique row numbers from pyramid slots
    const rows = Array.from(new Set(pyramidSlots.map(slot => slot.row))).sort((a, b) => a - b);

    // Check if slot is unlocked (all talents to the left in the same row must be assigned)
    const isSlotUnlocked = (row: number, column: number): boolean => {
        // First column of any row is always unlocked
        if (column === 1) return true;

        // Check if all talents to the left in this row are assigned
        for (let col = 1; col < column; col++) {
            const leftSlot = pyramidSlots.find(s => s.row === row && s.column === col);

            // If any slot to the left is not assigned, this slot is locked
            if (!leftSlot || !leftSlot.talentId) {
                return false;
            }
        }

        return true;
    };

    // Calculate effective cost for this slot
    const getSlotCost = (slot: PyramidSlot): number => {
        switch (slot.tier) {
            case 'First':
                return 5;
            case 'Second':
                return 10;
            case 'Third':
                return 15;
            case 'Fourth':
                return 20;
            case 'Fifth':
                return 25;
        }
    };

    return (
        <Box>
            {rows.map((row) => {
                const rowSlots = pyramidSlots.filter((s) => s.row === row);

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
                            const key = `${slot.row}-${slot.column}`;
                            const isUnlocked = isSlotUnlocked(slot.row, slot.column);
                            const talent = slot.talentId
                                ? talents.find((t) => t.id === slot.talentId)
                                : undefined;
                            const slotCost = getSlotCost(slot);
                            const canAfford = slotCost <= availableXp;

                            return (
                                <TalentSlotCard
                                    key={key}
                                    slot={slot}
                                    talent={talent}
                                    talents={talents}
                                    isUnlocked={isUnlocked}
                                    slotCost={slotCost}
                                    canAfford={canAfford}
                                    onAssignTalent={(talentId) =>
                                        onAssignTalent(slot.row, slot.column, talentId)
                                    }
                                    onRemoveTalent={() => onRemoveTalent(slot.row, slot.column)}
                                    pyramidSlots={pyramidSlots}
                                    getTalentRank={getTalentRank}
                                />
                            );
                        })}
                    </Box>
                );
            })}
        </Box>
    );
};
