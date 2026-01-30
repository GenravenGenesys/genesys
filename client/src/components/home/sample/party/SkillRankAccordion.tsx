import {type PlayerSkill, type Skill, SkillCharacteristic} from "../../../../api/model";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box, Chip,
    Grid, IconButton,
    Paper,
    Tooltip,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {CharacteristicBadge} from "./CharacteristicBadge.tsx";
import StarIcon from "@mui/icons-material/Star";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface Props {
    skills: PlayerSkill[];
    careerSkills: Skill[];
    skillRanks: Record<string, number>;
    onRankChange: (skill: PlayerSkill, newRank: number) => void;
    availableXp: number;
    maxSkillRanks: number;
    characteristics: {
        brawn: number;
        agility: number;
        intellect: number;
        cunning: number;
        willpower: number;
        presence: number;
    };
}

export default function SkillRankAccordion(props: Props) {
    const {skills, careerSkills, skillRanks, onRankChange, availableXp, maxSkillRanks, characteristics} = props;

    const getCharacteristicValue = (characteristic: SkillCharacteristic): number => {
        switch (characteristic) {
            case SkillCharacteristic.Brawn:
                return characteristics.brawn;
            case SkillCharacteristic.Agility:
                return characteristics.agility;
            case SkillCharacteristic.Intellect:
                return characteristics.intellect;
            case SkillCharacteristic.Cunning:
                return characteristics.cunning;
            case SkillCharacteristic.Willpower:
                return characteristics.willpower;
            case SkillCharacteristic.Presence:
                return characteristics.presence;
            default:
                return 0;
        }
    }

    const calculateCost = (
        skill: PlayerSkill,
        fromRank: number,
        toRank: number
    ): number => {
        let cost = 0;
        for (let rank = fromRank + 1; rank <= toRank; rank++) {
            if (skill) {
                cost += rank * 5;
            } else {
                cost += rank * 5 + 5;
            }
        }
        return cost;
    };

    const getTotalRank = (skill: PlayerSkill): number => {
        return skill.ranks + (skillRanks[skill.id] || 0);
    };

    const canIncrease = (skill: PlayerSkill): boolean => {
        const currentTotal = getTotalRank(skill);
        if (currentTotal >= maxSkillRanks) return false;

        const cost = calculateCost(skill, currentTotal, currentTotal + 1);
        return cost <= availableXp;
    };

    const canDecrease = (skill: PlayerSkill): boolean => {
        return (skillRanks[skill.id] || 0) > 0;
    };

    const handleIncrease = (skill: PlayerSkill) => {
        if (canIncrease(skill)) {
            const currentPurchased = skillRanks[skill.id] || 0;
            onRankChange(skill, currentPurchased + 1);
        }
    };

    const handleDecrease = (skill: PlayerSkill) => {
        if (canDecrease(skill)) {
            const currentPurchased = skillRanks[skill.id] || 0;
            onRankChange(skill, currentPurchased - 1);
        }
    };

    const getNextRankCost = (skill: PlayerSkill): number => {
        const currentTotal = getTotalRank(skill);
        return calculateCost(skill, currentTotal, currentTotal + 1);
    };

    const isCareerSkill = (skill: PlayerSkill): boolean => {
        return careerSkills.some(careerSkill => careerSkill.id === skill.id);
    };

    return (
        <Box>
            <Alert severity="info" sx={{mb: 2}}>
                <Typography variant="body2">
                    <strong>Career Skills</strong> (marked with ⭐) cost less:
                    New Rank * 5 XP per rank
                    <br/>
                    <strong>Non-Career Skills</strong> cost more: New Rank * 5 + 5 XP per
                    rank
                    <strong>Skills cannot be increase above rank {maxSkillRanks}</strong>
                </Typography>
            </Alert>

            {Object.values(SkillCharacteristic).map((characteristic) => {
                const filteredSkills = skills.filter(skill => skill.characteristic === characteristic);
                const skillsWithRanks = filteredSkills.filter(skill => (props.skillRanks[skill.id] || 0) > 0).length;
                return (
                    <Accordion key={characteristic} defaultExpanded={skillsWithRanks > 0}>
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
                                        value={getCharacteristicValue(characteristic)}
                                        label={characteristic}
                                    />
                                </Box>
                                <Box sx={{flexGrow: 1}}>
                                    <Typography variant="h6" sx={{textTransform: "capitalize"}}>
                                        {characteristic} Skills
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {filteredSkills.length} skills • {skillsWithRanks} trained
                                    </Typography>
                                </Box>
                            </Box>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Grid container spacing={2}>
                                {filteredSkills.map((skill) => {
                                    const totalRank = getTotalRank(skill);
                                    const purchasedRanks = skillRanks[skill.id] || 0;
                                    const nextCost = getNextRankCost(skill);

                                    return (
                                        <Grid size={{xs: 12}} key={skill.id}>
                                            <Paper
                                                variant="outlined"
                                                sx={{
                                                    p: 2,
                                                    backgroundColor: skill
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
                                                            {isCareerSkill(skill) && (
                                                                <Tooltip title="Career Skill - Reduced Cost">
                                                                    <StarIcon
                                                                        sx={{color: "warning.main", fontSize: 20}}
                                                                    />
                                                                </Tooltip>
                                                            )}
                                                        </Box>
                                                        {/*{skill.description && (*/}
                                                        {/*    <Typography*/}
                                                        {/*        variant="caption"*/}
                                                        {/*        color="text.secondary"*/}
                                                        {/*    >*/}
                                                        {/*        {skill.description}*/}
                                                        {/*    </Typography>*/}
                                                        {/*)}*/}
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
}