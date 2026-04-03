import {Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography} from "@mui/material";
import type {PlayerTalent} from "../../../../../api/model";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography.tsx";

interface Props {
    talents: PlayerTalent[];
}

export default function TalentAccordion(props: Props) {
    const {talents} = props;

    return (
        <Box>
            {talents.map((talent, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Box sx={{display: "flex", alignItems: "center", gap: 2, width: "100%"}}>
                            <Box sx={{flexGrow: 1}}>
                                <Typography variant="h6" sx={{textTransform: "capitalize"}}>
                                    {talent.name}
                                </Typography>
                            </Box>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <GenesysDescriptionTypography text={talent.description}/>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}