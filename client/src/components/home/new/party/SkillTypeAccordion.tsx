import {type PlayerSkill, type Skill, SkillType} from "../../../../api/model";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
    playerSkills: PlayerSkill[];
    careerSkills: Skill[];
}

export default function SkillTypeAccordion(props: Props) {
    const {playerSkills, careerSkills} = props;

    const isCareerSkill = (skill: PlayerSkill): boolean => {
        return careerSkills.some(careerSkill => careerSkill.name === skill.name);
    };

    const getTotalRank = (skill: PlayerSkill): number => {
        return skill.ranks;
    };

    return (
        <Box>
            {Object.values(SkillType).map((type) => {
                const filteredSkills = playerSkills.filter(skill => skill.type === type);
                const skillsWithCareer = filteredSkills.filter(skill => isCareerSkill(skill)).length;
                return (
                    <Accordion key={type}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    width: "100%",
                                }}
                            >
                                {/*<Box sx={{minWidth: 80, transform: "scale(0.8)"}}>*/}
                                {/*    <CharacteristicBadge*/}
                                {/*        value={characteristics[characteristic]}*/}
                                {/*        label={characteristic}*/}
                                {/*    />*/}
                                {/*</Box>*/}
                                <Box sx={{flexGrow: 1}}>
                                    <Typography variant="h6" sx={{textTransform: "capitalize"}}>
                                        {type} Skills
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {filteredSkills.length} skills • {skillsWithCareer} career
                                    </Typography>
                                </Box>
                            </Box>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Grid container spacing={2}>
                                {filteredSkills.map((skill) => {
                                    const totalRank = getTotalRank(skill);
                                    // const purchasedRanks = skills[skill.name] || 0;
                                    // const nextCost = getNextRankCost(skill);

                                    return (
                                        <Grid size={{xs: 12}} key={skill.id}>
                                            <Paper
                                                variant="outlined"
                                                sx={{
                                                    p: 2
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
                                                            {/*{isCareerSkill(skill) && (*/}
                                                            {/*    <Tooltip title="Career Skill - Reduced Cost">*/}
                                                            {/*        <StarIcon*/}
                                                            {/*            sx={{color: "warning.main", fontSize: 20}}*/}
                                                            {/*        />*/}
                                                            {/*    </Tooltip>*/}
                                                            {/*)}*/}
                                                        </Box>
                                                        {skill.summary && (
                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                {skill.summary}
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
                                                        </Box>
                                                    </Grid>

                                                    {/* Rank Controls */}
                                                    {/*<Grid size={{xs: 6, sm: 3}}>*/}
                                                    {/*    <Box*/}
                                                    {/*        sx={{*/}
                                                    {/*            display: "flex",*/}
                                                    {/*            alignItems: "center",*/}
                                                    {/*            justifyContent: "center",*/}
                                                    {/*            gap: 1,*/}
                                                    {/*        }}*/}
                                                    {/*    >*/}
                                                    {/*        <IconButton*/}
                                                    {/*            size="small"*/}
                                                    {/*            onClick={() => handleDecrease(skill)}*/}
                                                    {/*            disabled={!canDecrease(skill)}*/}
                                                    {/*            color="error"*/}
                                                    {/*        >*/}
                                                    {/*            <RemoveIcon/>*/}
                                                    {/*        </IconButton>*/}

                                                    {/*        <Chip*/}
                                                    {/*            label={purchasedRanks}*/}
                                                    {/*            color={*/}
                                                    {/*                purchasedRanks > 0 ? "primary" : "default"*/}
                                                    {/*            }*/}
                                                    {/*            sx={{*/}
                                                    {/*                minWidth: 50,*/}
                                                    {/*                fontWeight: "bold",*/}
                                                    {/*                fontSize: "1rem",*/}
                                                    {/*            }}*/}
                                                    {/*        />*/}

                                                    {/*        <IconButton*/}
                                                    {/*            size="small"*/}
                                                    {/*            onClick={() => handleIncrease(skill)}*/}
                                                    {/*            disabled={!canIncrease(skill)}*/}
                                                    {/*            color="success"*/}
                                                    {/*        >*/}
                                                    {/*            <AddIcon/>*/}
                                                    {/*        </IconButton>*/}
                                                    {/*    </Box>*/}
                                                    {/*    <Typography*/}
                                                    {/*        variant="caption"*/}
                                                    {/*        color="text.secondary"*/}
                                                    {/*        sx={{*/}
                                                    {/*            display: "block",*/}
                                                    {/*            textAlign: "center",*/}
                                                    {/*            mt: 0.5,*/}
                                                    {/*        }}*/}
                                                    {/*    >*/}
                                                    {/*        Purchased*/}
                                                    {/*    </Typography>*/}
                                                    {/*</Grid>*/}

                                                    {/* Cost Display */}
                                                    {/*<Grid size={{xs: 12, sm: 3}}>*/}
                                                    {/*    <Box sx={{textAlign: "center"}}>*/}
                                                    {/*        <Typography*/}
                                                    {/*            variant="caption"*/}
                                                    {/*            color="text.secondary"*/}
                                                    {/*        >*/}
                                                    {/*            Next Rank Cost*/}
                                                    {/*        </Typography>*/}
                                                    {/*        <Typography*/}
                                                    {/*            variant="h6"*/}
                                                    {/*            fontWeight="bold"*/}
                                                    {/*            color={*/}
                                                    {/*                canIncrease(skill)*/}
                                                    {/*                    ? "primary.main"*/}
                                                    {/*                    : "text.disabled"*/}
                                                    {/*            }*/}
                                                    {/*        >*/}
                                                    {/*            {totalRank >= 5 ? "MAX" : `${nextCost} XP`}*/}
                                                    {/*        </Typography>*/}
                                                    {/*    </Box>*/}
                                                    {/*</Grid>*/}
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
    )
}