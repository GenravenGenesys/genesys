import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
    CssBaseline,
    Container,
    Box,
    Typography,
    Button,
    Paper,
    Alert,
} from "@mui/material";
import {TalentPyramidGrid} from "./TalentPyramidGrid.tsx";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1B9CD8",
        },
    },
});

export interface TalentDefinition {
    id: string;
    name: string;
    baseTier: 1 | 2 | 3 | 4 | 5;
    ranked: boolean;
    maxRanks?: number;
    activation:
        | "Passive"
        | "Active (Action)"
        | "Active (Maneuver)"
        | "Active (Incidental)";
    description: string;
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

const mockTalents: TalentDefinition[] = [
    // Tier 1 Talents
    {
        id: "grit",
        name: "Grit",
        baseTier: 1,
        ranked: true,
        maxRanks: 5,
        activation: "Passive",
        description: "Gain +1 strain threshold per rank",
    },
    {
        id: "toughened",
        name: "Toughened",
        baseTier: 1,
        ranked: true,
        maxRanks: 5,
        activation: "Passive",
        description: "Gain +2 wound threshold per rank",
    },
    {
        id: "quick-draw",
        name: "Quick Draw",
        baseTier: 1,
        ranked: false,
        activation: "Active (Incidental)",
        description: "Draw or holster a weapon as an incidental",
    },
    {
        id: "rapid-recovery",
        name: "Rapid Recovery",
        baseTier: 1,
        ranked: false,
        activation: "Active (Incidental)",
        description: "Recover strain equal to ranks in Cool",
    },
    {
        id: "second-wind",
        name: "Second Wind",
        baseTier: 1,
        ranked: true,
        maxRanks: 3,
        activation: "Active (Incidental)",
        description: "Recover strain equal to ranks in this talent",
    },

    // Tier 2 Talents
    {
        id: "side-step",
        name: "Side Step",
        baseTier: 2,
        ranked: true,
        maxRanks: 3,
        activation: "Active (Maneuver)",
        description:
            "Suffer strain to upgrade difficulty of incoming ranged attack",
    },
    {
        id: "lethal-blows",
        name: "Lethal Blows",
        baseTier: 2,
        ranked: true,
        maxRanks: 3,
        activation: "Passive",
        description: "Add +10 per rank to critical injury results",
    },
    {
        id: "point-blank",
        name: "Point Blank",
        baseTier: 2,
        ranked: true,
        maxRanks: 3,
        activation: "Passive",
        description: "Add 1 damage per rank at short range or closer",
    },
    {
        id: "armor-master",
        name: "Armor Master",
        baseTier: 2,
        ranked: false,
        activation: "Passive",
        description: "Reduce encumbrance of worn armor by 3",
    },
    {
        id: "duelist",
        name: "Duelist",
        baseTier: 2,
        ranked: false,
        activation: "Passive",
        description:
            "Add boost to Melee and Brawl while engaged with single opponent",
    },

    // Tier 3 Talents
    {
        id: "dedication",
        name: "Dedication",
        baseTier: 3,
        ranked: true,
        maxRanks: 3,
        activation: "Passive",
        description: "Gain +1 to a single characteristic (max 6)",
    },
    {
        id: "expert-tracker",
        name: "Expert Tracker",
        baseTier: 3,
        ranked: false,
        activation: "Passive",
        description: "Remove setback from tracking checks",
    },
    {
        id: "stalker",
        name: "Stalker",
        baseTier: 3,
        ranked: true,
        maxRanks: 3,
        activation: "Passive",
        description: "Add boost to Stealth and Coordination checks",
    },
    {
        id: "natural-hunter",
        name: "Natural Hunter",
        baseTier: 3,
        ranked: false,
        activation: "Passive",
        description: "Once per session, reroll any Perception or Vigilance check",
    },

    // Tier 4 Talents
    {
        id: "deadly-accuracy",
        name: "Deadly Accuracy",
        baseTier: 4,
        ranked: false,
        activation: "Passive",
        description: "Use Agility instead of Brawn for ranged damage",
    },
    {
        id: "sniper-shot",
        name: "Sniper Shot",
        baseTier: 4,
        ranked: false,
        activation: "Active (Maneuver)",
        description: "Increase difficulty to deal +1 strain per rank",
    },
    {
        id: "defensive-stance",
        name: "Defensive Stance",
        baseTier: 4,
        ranked: true,
        maxRanks: 2,
        activation: "Active (Maneuver)",
        description: "Suffer setback to increase defense by ranks",
    },
    {
        id: "heroic-fortitude",
        name: "Heroic Fortitude",
        baseTier: 4,
        ranked: false,
        activation: "Active (Incidental)",
        description:
            "Spend Story Point to ignore Critical Injury until end of encounter",
    },

    // Tier 5 Talents
    {
        id: "true-aim",
        name: "True Aim",
        baseTier: 5,
        ranked: true,
        maxRanks: 2,
        activation: "Active (Maneuver)",
        description: "Upgrade ability or enemy difficulty for next ranged attack",
    },
    {
        id: "improved-dodge",
        name: "Improved Dodge",
        baseTier: 5,
        ranked: false,
        activation: "Active (Incidental)",
        description: "Spend Story Point to upgrade attack difficulty",
    },
    {
        id: "improved-side-step",
        name: "Improved Side Step",
        baseTier: 5,
        ranked: false,
        activation: "Passive",
        description: "Use Side Step against melee attacks",
    },
];

// Define the pyramid structure (empty slots)
const pyramidStructure: PyramidSlot[] = [
    // Row 1: 1 slot - Tier 1
    { row: 1, column: 1, tier: 1 },

    // Row 2: 2 slots - T1, T2
    { row: 2, column: 1, tier: 1 },
    { row: 2, column: 2, tier: 2 },

    // Row 3: 3 slots - T1, T2, T3
    { row: 3, column: 1, tier: 1 },
    { row: 3, column: 2, tier: 2 },
    { row: 3, column: 3, tier: 3 },

    // Row 4: 4 slots - T1, T2, T3, T4
    { row: 4, column: 1, tier: 1 },
    { row: 4, column: 2, tier: 2 },
    { row: 4, column: 3, tier: 3 },
    { row: 4, column: 4, tier: 4 },

    // Row 5: 5 slots - T1, T2, T3, T4, T5
    { row: 5, column: 1, tier: 1 },
    { row: 5, column: 2, tier: 2 },
    { row: 5, column: 3, tier: 3 },
    { row: 5, column: 4, tier: 4 },
    { row: 5, column: 5, tier: 5 },

    // Row 6: 5 slots - T1, T2, T3, T4, T5
    { row: 6, column: 1, tier: 1 },
    { row: 6, column: 2, tier: 2 },
    { row: 6, column: 3, tier: 3 },
    { row: 6, column: 4, tier: 4 },
    { row: 6, column: 5, tier: 5 },
];

function TalentSampleApp() {
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
            [key]: { row, column, talentId, purchased: false },
        }));
    };

    const handlePurchase = (row: number, column: number) => {
        const key = getSlotKey(row, column);
        setSlotAssignments((prev) => ({
            ...prev,
            [key]: { ...prev[key], purchased: true },
        }));
    };

    const handleRefund = (row: number, column: number) => {
        const key = getSlotKey(row, column);
        setSlotAssignments((prev) => ({
            ...prev,
            [key]: { ...prev[key], purchased: false },
        }));
    };

    const handleClearSlot = (row: number, column: number) => {
        const key = getSlotKey(row, column);
        setSlotAssignments((prev) => {
            const newState = { ...prev };
            delete newState[key];
            return newState;
        });
    };

    const handleReset = () => {
        setSlotAssignments({});
    };

    // Calculate spent XP
    const calculateSpentXp = (): number => {
        let spent = 0;
        const tierCosts = { 1: 5, 2: 10, 3: 15, 4: 20, 5: 25 };

        Object.values(slotAssignments).forEach((assignment) => {
            if (assignment.purchased) {
                const talent = mockTalents.find((t) => t.id === assignment.talentId);
                if (talent) {
                    // Calculate effective cost based on talent rank
                    const currentRank = getTalentRank(assignment.talentId);
                    const effectiveTier = Math.min(
                        5,
                        talent.baseTier + currentRank - 1
                    ) as 1 | 2 | 3 | 4 | 5;
                    spent += tierCosts[effectiveTier];
                }
            }
        });

        return spent;
    };

    // Get current rank of a talent (count purchased slots with this talent)
    const getTalentRank = (talentId: string): number => {
        return Object.values(slotAssignments).filter(
            (a) => a.talentId === talentId && a.purchased
        ).length;
    };

    const spentXp = calculateSpentXp();
    const availableXp = startingXp - spentXp;

    const purchasedCount = Object.values(slotAssignments).filter(
        (a) => a.purchased
    ).length;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h3" gutterBottom align="center" sx={{ mb: 2 }}>
                    Talent Pyramid
                </Typography>

                <Typography
                    variant="body1"
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Assign any talent of the correct tier to each slot, then purchase to
                    unlock
                </Typography>

                {/* Summary Box */}
                <Paper sx={{ p: 3, mb: 3, backgroundColor: "grey.50" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h4" fontWeight="bold" color="primary">
                                {availableXp}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Available XP
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h4" fontWeight="bold">
                                {spentXp}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Spent XP
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h4" fontWeight="bold">
                                {purchasedCount}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Talents Purchased
                            </Typography>
                        </Box>

                        <Button variant="outlined" onClick={handleReset}>
                            Reset All
                        </Button>
                    </Box>
                </Paper>

                {availableXp < 0 && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        <Typography variant="body2">
                            You've overspent by {Math.abs(availableXp)} XP! Refund some
                            talents.
                        </Typography>
                    </Alert>
                )}

                <Alert severity="info" sx={{ mb: 3 }}>
                    <Typography variant="body2">
                        <strong>How to Build Your Pyramid:</strong>
                        <br />
                        1. Click empty slots to choose a talent of that tier
                        <br />
                        2. Purchase the talent to unlock it (costs XP)
                        <br />
                        3. Slots must connect from the top down
                        <br />
                        4. <strong>Ranked talents:</strong> Place the same talent in
                        multiple slots. Each rank costs the next tier up.
                        <br />
                        &nbsp;&nbsp;&nbsp;Example: Grit (T1) Rank 1 = 5 XP, Rank 2 = 10 XP
                        (T2 cost), Rank 3 = 15 XP (T3 cost)
                    </Typography>
                </Alert>

                <TalentPyramidGrid
                    pyramidStructure={pyramidStructure}
                    talents={mockTalents}
                    slotAssignments={slotAssignments}
                    onAssignTalent={handleAssignTalent}
                    onPurchase={handlePurchase}
                    onRefund={handleRefund}
                    onClearSlot={handleClearSlot}
                    availableXp={availableXp}
                    getSlotKey={getSlotKey}
                    getTalentRank={getTalentRank}
                />
            </Container>
        </ThemeProvider>
    );
}

export default TalentSampleApp;
