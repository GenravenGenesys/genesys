import {type Talent, Tier} from "../../../../../../api/model";
import {useState, useEffect, useMemo} from "react";
import CenteredCardHeader from "../../../../../common/card/header/CenteredCardHeader.tsx";
import {Card, CardContent} from "@mui/material";
import {TalentPyramidGrid} from "./TalentPyramidGrid.tsx";

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

        // Update talents record - increment rank for this talent
        const updatedTalents = {
            ...talents,
            [talentId]: (talents[talentId] || 0) + 1,
        };

        // Invoke callback with updated values
        onTalentSpend(column * 5, updatedTalents);
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
            // Update talents record - decrement rank for this talent
            const currentRank = talents[removedTalentId] || 0;
            const updatedTalents = { ...talents };

            if (currentRank > 1) {
                updatedTalents[removedTalentId] = currentRank - 1;
            } else {
                // Remove talent from record if rank would be 0
                delete updatedTalents[removedTalentId];
            }

            onTalentSpend(column * -5, updatedTalents);
        }
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
                    talents={campaignTalents}
                    onAssignTalent={handleAssignTalent}
                    onRemoveTalent={handleRemoveTalent}
                    availableXp={experience}
                    getTalentRank={getTalentRank}
                />
            </CardContent>
        </Card>
    );
}