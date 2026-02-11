import {useState} from 'react';
import {
    Box, Button, Typography,
    Stack, Paper, Container, Divider,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import {
    type Archetype,
    type Career,
    type Skill,
    type CampaignCompendium, type Talent, type ItemTemplate, type AdversaryTemplate,
    type Quality, type CriticalInjury
} from "../../../../api/model";
import {useCreateCampaign} from "../../../../api/generated/campaign-controller/campaign-controller.ts";
import GenesysTextField from "../../../common/field/GenesysTextField.tsx";

export default function CampaignWizard() {
    const createCampaignMutation = useCreateCampaign();

    const [campaign, setCampaign] = useState({
        name: '',
        description: '',
        compendium: {
            skills: [] as Skill[],
            archetypes: [] as Archetype[],
            careers: [] as Career[],
            talents: [] as Talent[],
            items: [] as ItemTemplate[],
            adversaries: [] as AdversaryTemplate[],
            qualities: [] as Quality[],
            criticalInjuries: [] as CriticalInjury[]
        } as CampaignCompendium
    });

    const onCreate = async () => {
        await createCampaignMutation.mutateAsync({
            data: campaign
        });
    };

    return (
        <Container maxWidth="md" sx={{py: 8}}>
            <Paper elevation={3} sx={{p: 6, borderRadius: 4}}>
                <Box sx={{mb: 4, textAlign: 'center'}}>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                        Create New Campaign
                    </Typography>
                </Box>


                <Box sx={{minHeight: '400px'}}>
                    <Stack spacing={3} sx={{mt: 4}}>
                        <GenesysTextField text={campaign.name} label={"Campaign Title"} fullwidth
                                          placeholder={"e.g. Shadows of the Core"}
                                          onChange={(name) => setCampaign(prev => ({...prev, name: name}))}/>
                        <GenesysTextField text={campaign.description} rows={4}
                                          placeholder={"This is your tag line on what your campaign is about"}
                                          label={"Campaign Description"} fullwidth
                                          onChange={(description) => setCampaign(prev => ({
                                              ...prev,
                                              description: description
                                          }))}/>
                    </Stack>
                </Box>

                <Divider sx={{my: 4}}/>

                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant="contained" color="success" startIcon={<SaveIcon/>}
                            onClick={onCreate}>
                        Create Setting
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}