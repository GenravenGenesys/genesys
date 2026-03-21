import {
    type Characteristics,
    type CharacteristicType,
    type PlayerSkill,
    type Skill,
    SkillType
} from "../../../../api/model";
import {Accordion, AccordionDetails, AccordionSummary, Box, Grid, Paper, Tooltip, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import GenesysSkillDiceTypography from "../../common/typography/GenesysSkillDiceTypography.tsx";

interface Props {
    playerSkills: PlayerSkill[];
    careerSkills: Skill[];
    characteristics: Characteristics;
}

export default function SkillTypeAccordion(props: Props) {
    const {playerSkills, careerSkills, characteristics} = props;

    const isCareerSkill = (skill: PlayerSkill): boolean => {
        return careerSkills.some(careerSkill => careerSkill.name === skill.name);
    };

    const getCharacteristicRanks = (characteristicType: CharacteristicType): number => {
        switch (characteristicType) {
            case "Brawn":
                return characteristics.brawn.base;
            case "Agility":
                return characteristics.agility.base;
            case "Intellect":
                return characteristics.intellect.base;
            case "Cunning":
                return characteristics.cunning.base;
            case "Willpower":
                return characteristics.willpower.base;
            case "Presence":
                return characteristics.presence.base;
        }
    }

    return (
        <Box>
            {Object.values(SkillType).map((type) => {
                const filteredSkills = playerSkills.filter(skill => skill.type === type);
                const skillsWithCareer = filteredSkills.filter(skill => isCareerSkill(skill)).length;

                if (filteredSkills.length === 0) return null;
                return (
                    <Accordion key={type}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Box sx={{display: "flex", alignItems: "center", gap: 2, width: "100%"}}>
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
                                    return (
                                        <Grid size={{xs: 12}} key={skill.id}>
                                            <Paper variant="outlined" sx={{p: 2}}>
                                                <Grid container spacing={2} alignItems="center">
                                                    {/* Skill Name & Career Badge */}
                                                    <Grid size={{xs: 12, sm: 4}}>
                                                        <Box sx={{display: "flex", alignItems: "center", gap: 1,}}>
                                                            <Typography variant="body1" fontWeight="bold">
                                                                {skill.name}
                                                            </Typography>
                                                            {isCareerSkill(skill) && (
                                                                <Tooltip title="Career Skill">
                                                                    <StarIcon
                                                                        sx={{color: "warning.main", fontSize: 20}}/>
                                                                </Tooltip>
                                                            )}
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
                                                    <Grid size={{xs: 6, sm: 2}}>
                                                        <Box sx={{textAlign: "center"}}>
                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                Total Ranks
                                                            </Typography>
                                                            <Typography variant="h5" fontWeight="bold">
                                                                {skill.ranks}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid size={{xs: 24, sm: 6}}>
                                                        <Box sx={{textAlign: "center"}}>
                                                            <GenesysSkillDiceTypography
                                                                characteristicRanks={getCharacteristicRanks(skill.characteristic)}
                                                                skillRanks={skill.ranks}/>
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
    )
}