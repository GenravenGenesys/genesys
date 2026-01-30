import React from "react";
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper,
    Chip,
    Alert,
    Grid,
    IconButton,
    Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StarIcon from "@mui/icons-material/Star";
import {CharacteristicBadge} from "./CharacteristicBadge";

interface Skill {
    id: string;
    name: string;
    characteristic: string;
    description?: string;
    isCareer: boolean;
    startingRanks: number;
}

interface SkillXpSpenderProps {
    skills: Skill[];
    skillRanks: Record<string, number>;
    onRankChange: (skillId: string, newRank: number) => void;
    availableXp: number;
    characteristics: {
        brawn: number;
        agility: number;
        intellect: number;
        cunning: number;
        willpower: number;
        presence: number;
    };
}

const characteristicColors: Record<string, string> = {
    brawn: "#BF5222",
    agility: "#22BF82",
    intellect: "#2282BF",
    cunning: "#BF9D22",
    willpower: "#8222BF",
    presence: "#BF2282",
};

export const SkillXpSpender: React.FC<SkillXpSpenderProps> = ({
                                                                  skills,
                                                                  skillRanks,
                                                                  onRankChange,
                                                                  availableXp,
                                                                  characteristics,
                                                              }) => {
    // Group skills by characteristic
    const skillsByCharacteristic = skills.reduce((acc, skill) => {
        const char = skill.characteristic.toLowerCase();
        if (!acc[char]) acc[char] = [];
        acc[char].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    const calculateCost = (
        skill: Skill,
        fromRank: number,
        toRank: number
    ): number => {
        let cost = 0;
        for (let rank = fromRank + 1; rank <= toRank; rank++) {
            if (skill.isCareer) {
                cost += rank * 5;
            } else {
                cost += rank * 5 + 5;
            }
        }
        return cost;
    };

    const getTotalRank = (skill: Skill): number => {
        return skill.startingRanks + (skillRanks[skill.id] || 0);
    };

    const canIncrease = (skill: Skill): boolean => {
        const currentTotal = getTotalRank(skill);
        if (currentTotal >= 5) return false;

        const cost = calculateCost(skill, currentTotal, currentTotal + 1);
        return cost <= availableXp;
    };

    const canDecrease = (skill: Skill): boolean => {
        return (skillRanks[skill.id] || 0) > 0;
    };

    const handleIncrease = (skill: Skill) => {
        if (canIncrease(skill)) {
            const currentPurchased = skillRanks[skill.id] || 0;
            onRankChange(skill.id, currentPurchased + 1);
        }
    };

    const handleDecrease = (skill: Skill) => {
        if (canDecrease(skill)) {
            const currentPurchased = skillRanks[skill.id] || 0;
            onRankChange(skill.id, currentPurchased - 1);
        }
    };

    const getNextRankCost = (skill: Skill): number => {
        const currentTotal = getTotalRank(skill);
        return calculateCost(skill, currentTotal, currentTotal + 1);
    };

    return (
        <Box>
            <Alert severity="info" sx={{mb: 2}}>
                <Typography variant="body2">
                    <strong>Career Skills</strong> (marked with ⭐) cost less:
                    5/10/15/20/25 XP per rank
                    <br/>
                    <strong>Non-Career Skills</strong> cost more: 10/15/20/25/30 XP per
                    rank
                </Typography>
            </Alert>

            {/* Skills grouped by Characteristic */}
            {Object.entries(skillsByCharacteristic).map(([charName, charSkills]) => {
                const charValue =
                    characteristics[charName as keyof typeof characteristics];
                const skillsWithRanks = charSkills.filter(
                    (s) => getTotalRank(s) > 0
                ).length;

                return (
                    <Accordion key={charName} defaultExpanded={skillsWithRanks > 0}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    width: "100%",
                                }}
                            >
                                <Box sx={{minWidth: 80, transform: "scale(0.8)"}}>
                                    <CharacteristicBadge
                                        value={charValue}
                                        label={charName}
                                        color={characteristicColors[charName]}
                                    />
                                </Box>
                                <Box sx={{flexGrow: 1}}>
                                    <Typography variant="h6" sx={{textTransform: "capitalize"}}>
                                        {charName} Skills
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {charSkills.length} skills • {skillsWithRanks} trained
                                    </Typography>
                                </Box>
                            </Box>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Grid container spacing={2}>
                                {charSkills.map((skill) => {
                                    const totalRank = getTotalRank(skill);
                                    const purchasedRanks = skillRanks[skill.id] || 0;
                                    const nextCost = getNextRankCost(skill);

                                    return (
                                        <Grid size={{xs: 12}} key={skill.id}>
                                            <Paper
                                                variant="outlined"
                                                sx={{
                                                    p: 2,
                                                    backgroundColor: skill.isCareer
                                                        ? "success.light"
                                                        : "background.paper",
                                                    borderColor:
                                                        totalRank > 0 ? "primary.main" : "divider",
                                                    borderWidth: totalRank > 0 ? 2 : 1,
                                                }}
                                            >
                                                <Grid container spacing={2} alignItems="center">
                                                    {/* Skill Name & Career Badge */}
                                                    <Grid size={{xs: 12, sm: 4}}>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 1,
                                                            }}
                                                        >
                                                            <Typography variant="body1" fontWeight="bold">
                                                                {skill.name}
                                                            </Typography>
                                                            {skill.isCareer && (
                                                                <Tooltip title="Career Skill - Reduced Cost">
                                                                    <StarIcon
                                                                        sx={{color: "warning.main", fontSize: 20}}
                                                                    />
                                                                </Tooltip>
                                                            )}
                                                        </Box>
                                                        {skill.description && (
                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                {skill.description}
                                                            </Typography>
                                                        )}
                                                    </Grid>

                                                    {/* Current Ranks Display */}
                                                    <Grid size={{xs: 6, sm: 2}}>
                                                        <Box sx={{textAlign: "center"}}>
                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                Total Ranks
                                                            </Typography>
                                                            <Typography variant="h5" fontWeight="bold">
                                                                {totalRank}
                                                            </Typography>
                                                            {skill.startingRanks > 0 && (
                                                                <Typography
                                                                    variant="caption"
                                                                    color="text.secondary"
                                                                >
                                                                    ({skill.startingRanks} from archetype)
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    </Grid>

                                                    {/* Rank Controls */}
                                                    <Grid size={{xs: 6, sm: 3}}>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                gap: 1,
                                                            }}
                                                        >
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleDecrease(skill)}
                                                                disabled={!canDecrease(skill)}
                                                                color="error"
                                                            >
                                                                <RemoveIcon/>
                                                            </IconButton>

                                                            <Chip
                                                                label={purchasedRanks}
                                                                color={
                                                                    purchasedRanks > 0 ? "primary" : "default"
                                                                }
                                                                sx={{
                                                                    minWidth: 50,
                                                                    fontWeight: "bold",
                                                                    fontSize: "1rem",
                                                                }}
                                                            />

                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleIncrease(skill)}
                                                                disabled={!canIncrease(skill)}
                                                                color="success"
                                                            >
                                                                <AddIcon/>
                                                            </IconButton>
                                                        </Box>
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                            sx={{
                                                                display: "block",
                                                                textAlign: "center",
                                                                mt: 0.5,
                                                            }}
                                                        >
                                                            Purchased
                                                        </Typography>
                                                    </Grid>

                                                    {/* Cost Display */}
                                                    <Grid size={{xs: 12, sm: 3}}>
                                                        <Box sx={{textAlign: "center"}}>
                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                Next Rank Cost
                                                            </Typography>
                                                            <Typography
                                                                variant="h6"
                                                                fontWeight="bold"
                                                                color={
                                                                    canIncrease(skill)
                                                                        ? "primary.main"
                                                                        : "text.disabled"
                                                                }
                                                            >
                                                                {totalRank >= 5 ? "MAX" : `${nextCost} XP`}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Box>
    );
};
