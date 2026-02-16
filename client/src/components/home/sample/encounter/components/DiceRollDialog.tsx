import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Chip,
    Paper,
    Grid,
    Card,
    CardContent,
    Alert,
    Checkbox,
    Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type {DiceResult} from "../SampleEncounterManager.tsx";


interface DiceResultsDialogProps {
    open: boolean;
    diceResult: DiceResult;
    onClose: () => void;
    onSpendComplete: (advantageSpent: string[], triumphSpent: string[]) => void;
}

interface SpendOption {
    id: string;
    name: string;
    cost: number;
    costType: "advantage" | "triumph";
    description: string;
    category: "combat" | "utility" | "critical";
}

const advantageOptions: SpendOption[] = [
    // Combat Options
    {
        id: "recover-strain",
        name: "Recover 1 Strain",
        cost: 1,
        costType: "advantage",
        description: "Recover 1 strain per advantage spent",
        category: "combat",
    },
    {
        id: "add-boost",
        name: "Add Boost to Ally",
        cost: 1,
        costType: "advantage",
        description: "Next allied character adds boost die to their check",
        category: "combat",
    },
    {
        id: "notice-detail",
        name: "Notice Single Detail",
        cost: 1,
        costType: "advantage",
        description: "Notice a single important detail",
        category: "utility",
    },
    {
        id: "inflict-strain",
        name: "Inflict 1 Strain",
        cost: 2,
        costType: "advantage",
        description: "Target suffers 1 strain",
        category: "combat",
    },
    {
        id: "add-setback",
        name: "Add Setback to Enemy",
        cost: 2,
        costType: "advantage",
        description: "Target adds setback die to their next check",
        category: "combat",
    },
    {
        id: "grant-defense",
        name: "Grant Defense",
        cost: 2,
        costType: "advantage",
        description: "Increase melee or ranged defense by 1 until end of next turn",
        category: "combat",
    },
    {
        id: "free-maneuver",
        name: "Perform Free Maneuver",
        cost: 2,
        costType: "advantage",
        description: "Perform one free maneuver",
        category: "utility",
    },
    {
        id: "crit",
        name: "Activate Critical",
        cost: 3,
        costType: "advantage",
        description: "Activate weapon critical (combat checks only)",
        category: "critical",
    },

    // Additional Options
    {
        id: "upgrade-next",
        name: "Upgrade Next Check",
        cost: 3,
        costType: "advantage",
        description: "Upgrade ability of your next check",
        category: "utility",
    },
    {
        id: "disarm",
        name: "Disarm",
        cost: 2,
        costType: "advantage",
        description: "Target drops weapon or item",
        category: "combat",
    },
    {
        id: "pass-boost",
        name: "Pass Boost",
        cost: 1,
        costType: "advantage",
        description: "Pass boost die to another character",
        category: "utility",
    },
];

const triumphOptions: SpendOption[] = [
    {
        id: "auto-crit",
        name: "Automatic Critical",
        cost: 1,
        costType: "triumph",
        description: "Automatically trigger critical injury/hit",
        category: "critical",
    },
    {
        id: "destroy-weapon",
        name: "Destroy Weapon",
        cost: 1,
        costType: "triumph",
        description: "Destroy opponent's weapon or item",
        category: "combat",
    },
    {
        id: "upgrade-crit",
        name: "Upgrade Critical",
        cost: 1,
        costType: "triumph",
        description: "Upgrade next critical roll",
        category: "critical",
    },
    {
        id: "major-advantage",
        name: "Major Story Advantage",
        cost: 1,
        costType: "triumph",
        description: "Gain significant narrative advantage",
        category: "utility",
    },
    {
        id: "defeat-minion",
        name: "Defeat Minion Group",
        cost: 1,
        costType: "triumph",
        description: "Automatically defeat one minion in group",
        category: "combat",
    },
];

export const DiceResultsDialog: React.FC<DiceResultsDialogProps> = ({
                                                                        open,
                                                                        diceResult,
                                                                        onClose,
                                                                        onSpendComplete,
                                                                    }) => {
    const [selectedAdvantage, setSelectedAdvantage] = useState<string[]>([]);
    const [selectedTriumph, setSelectedTriumph] = useState<string[]>([]);

    const netSuccess =
        diceResult.success +
        diceResult.triumph -
        diceResult.failure -
        diceResult.despair;
    const netAdvantage = diceResult.advantage - diceResult.threat;
    const isSuccess = netSuccess > 0;

    const advantageSpent = selectedAdvantage.reduce((total, id) => {
        const option = advantageOptions.find((o) => o.id === id);
        return total + (option?.cost || 0);
    }, 0);

    const triumphSpent = selectedTriumph.length;
    const remainingAdvantage = netAdvantage - advantageSpent;
    const remainingTriumph = diceResult.triumph - triumphSpent;

    const handleToggleAdvantage = (optionId: string) => {
        const option = advantageOptions.find((o) => o.id === optionId);
        if (!option) return;

        if (selectedAdvantage.includes(optionId)) {
            setSelectedAdvantage(selectedAdvantage.filter((id) => id !== optionId));
        } else {
            if (remainingAdvantage >= option.cost) {
                setSelectedAdvantage([...selectedAdvantage, optionId]);
            }
        }
    };

    const handleToggleTriumph = (optionId: string) => {
        if (selectedTriumph.includes(optionId)) {
            setSelectedTriumph(selectedTriumph.filter((id) => id !== optionId));
        } else {
            if (remainingTriumph > 0) {
                setSelectedTriumph([...selectedTriumph, optionId]);
            }
        }
    };

    const handleComplete = () => {
        const advantageSpentNames = selectedAdvantage.map(
            (id) => advantageOptions.find((o) => o.id === id)?.name || ""
        );
        const triumphSpentNames = selectedTriumph.map(
            (id) => triumphOptions.find((o) => o.id === id)?.name || ""
        );

        onSpendComplete(advantageSpentNames, triumphSpentNames);
        setSelectedAdvantage([]);
        setSelectedTriumph([]);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Dice Results: {isSuccess ? "✓ SUCCESS" : "✗ FAILURE"}
            </DialogTitle>

            <DialogContent>
                {/* Results Summary */}
                <Paper
                    sx={{
                        p: 2,
                        mb: 3,
                        backgroundColor: isSuccess ? "success.light" : "error.light",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, sm: 6}} sx={{mt: 4}}>
                            <Typography variant="body2" color="text.secondary">
                                Net Success
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                                {netSuccess}
                            </Typography>
                        </Grid>
                        <Grid size={{xs: 12, sm: 6}} sx={{mt: 4}}>
                            <Typography variant="body2" color="text.secondary">
                                Net Advantage
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                                {netAdvantage}
                            </Typography>
                        </Grid>
                        {diceResult.triumph > 0 && (
                            <Grid size={{xs: 12, sm: 6}} sx={{mt: 4}}>
                                <Typography variant="body2" color="text.secondary">
                                    Triumph
                                </Typography>
                                <Typography variant="h4" fontWeight="bold" color="success.main">
                                    {diceResult.triumph}
                                </Typography>
                            </Grid>
                        )}
                        {diceResult.despair > 0 && (
                            <Grid size={{xs: 12, sm: 6}} sx={{mt: 4}}>
                                <Typography variant="body2" color="text.secondary">
                                    Despair
                                </Typography>
                                <Typography variant="h4" fontWeight="bold" color="error.main">
                                    {diceResult.despair}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Paper>

                {/* Spending Tracker */}
                <Box sx={{ mb: 3, display: "flex", gap: 2, justifyContent: "center" }}>
                    <Chip
                        label={`Advantage: ${remainingAdvantage} / ${netAdvantage} remaining`}
                        color={remainingAdvantage === 0 ? "success" : "info"}
                        sx={{ fontSize: "1rem", px: 2 }}
                    />
                    {diceResult.triumph > 0 && (
                        <Chip
                            label={`Triumph: ${remainingTriumph} / ${diceResult.triumph} remaining`}
                            color={remainingTriumph === 0 ? "success" : "warning"}
                            sx={{ fontSize: "1rem", px: 2 }}
                        />
                    )}
                </Box>

                {/* Spend Advantage */}
                {netAdvantage > 0 && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Spend Advantage
                        </Typography>

                        {["combat", "utility", "critical"].map((category) => {
                            const categoryOptions = advantageOptions.filter(
                                (o) => o.category === category
                            );

                            return (
                                <Box key={category} sx={{ mb: 2 }}>
                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                        sx={{ textTransform: "capitalize", mb: 1 }}
                                    >
                                        {category} Options
                                    </Typography>
                                    <Grid container spacing={1}>
                                        {categoryOptions.map((option) => {
                                            const isSelected = selectedAdvantage.includes(option.id);
                                            const canAfford =
                                                remainingAdvantage >= option.cost || isSelected;

                                            return (
                                                <Grid size={{xs: 12, sm: 6}} sx={{mt: 4}}>
                                                    <Card
                                                        variant="outlined"
                                                        sx={{
                                                            cursor: canAfford ? "pointer" : "not-allowed",
                                                            opacity: canAfford ? 1 : 0.5,
                                                            backgroundColor: isSelected
                                                                ? "action.selected"
                                                                : "inherit",
                                                            border: isSelected ? 2 : 1,
                                                            borderColor: isSelected
                                                                ? "primary.main"
                                                                : "divider",
                                                        }}
                                                        onClick={() =>
                                                            canAfford && handleToggleAdvantage(option.id)
                                                        }
                                                    >
                                                        <CardContent sx={{ p: 1.5 }}>
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "flex-start",
                                                                    gap: 1,
                                                                }}
                                                            >
                                                                <Checkbox
                                                                    checked={isSelected}
                                                                    disabled={!canAfford}
                                                                    size="small"
                                                                />
                                                                <Box sx={{ flexGrow: 1 }}>
                                                                    <Box
                                                                        sx={{
                                                                            display: "flex",
                                                                            justifyContent: "space-between",
                                                                            alignItems: "center",
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            variant="body2"
                                                                            fontWeight="bold"
                                                                        >
                                                                            {option.name}
                                                                        </Typography>
                                                                        <Chip
                                                                            label={`${option.cost} ADV`}
                                                                            size="small"
                                                                            color={isSelected ? "primary" : "default"}
                                                                        />
                                                                    </Box>
                                                                    <Typography
                                                                        variant="caption"
                                                                        color="text.secondary"
                                                                    >
                                                                        {option.description}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </Box>
                            );
                        })}
                    </Box>
                )}

                {/* Spend Triumph */}
                {diceResult.triumph > 0 && (
                    <Box>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Spend Triumph
                        </Typography>

                        <Grid container spacing={1}>
                            {triumphOptions.map((option) => {
                                const isSelected = selectedTriumph.includes(option.id);
                                const canAfford = remainingTriumph > 0 || isSelected;

                                return (
                                    <Grid size={{xs: 12, md: 6}} sx={{mt: 4}}>
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                cursor: canAfford ? "pointer" : "not-allowed",
                                                opacity: canAfford ? 1 : 0.5,
                                                backgroundColor: isSelected
                                                    ? "warning.light"
                                                    : "inherit",
                                                border: isSelected ? 2 : 1,
                                                borderColor: isSelected ? "warning.main" : "divider",
                                            }}
                                            onClick={() =>
                                                canAfford && handleToggleTriumph(option.id)
                                            }
                                        >
                                            <CardContent sx={{ p: 1.5 }}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "flex-start",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Checkbox
                                                        checked={isSelected}
                                                        disabled={!canAfford}
                                                        size="small"
                                                    />
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <Typography variant="body2" fontWeight="bold">
                                                                {option.name}
                                                            </Typography>
                                                            <Chip
                                                                label="1 TRIUMPH"
                                                                size="small"
                                                                color={isSelected ? "warning" : "default"}
                                                            />
                                                        </Box>
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            {option.description}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                )}

                {/* Despair Warning */}
                {diceResult.despair > 0 && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        <Typography variant="body2" fontWeight="bold">
                            Despair rolled! The GM can trigger a terrible complication.
                        </Typography>
                        <Typography variant="caption">
                            Examples: Weapon malfunction, ally falls, enemy reinforcements
                            arrive
                        </Typography>
                    </Alert>
                )}

                {/* Selected Summary */}
                {(selectedAdvantage.length > 0 || selectedTriumph.length > 0) && (
                    <Paper sx={{ p: 2, mt: 2, backgroundColor: "info.light" }}>
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                            Selected Effects:
                        </Typography>
                        {selectedAdvantage.map((id) => {
                            const option = advantageOptions.find((o) => o.id === id);
                            return (
                                <Chip
                                    key={id}
                                    label={`${option?.name} (${option?.cost} ADV)`}
                                    size="small"
                                    sx={{ mr: 0.5, mb: 0.5 }}
                                    color="primary"
                                />
                            );
                        })}
                        {selectedTriumph.map((id) => {
                            const option = triumphOptions.find((o) => o.id === id);
                            return (
                                <Chip
                                    key={id}
                                    label={option?.name}
                                    size="small"
                                    sx={{ mr: 0.5, mb: 0.5 }}
                                    color="warning"
                                />
                            );
                        })}
                    </Paper>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleComplete}
                    startIcon={<CheckCircleIcon />}
                >
                    Confirm & Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
};
