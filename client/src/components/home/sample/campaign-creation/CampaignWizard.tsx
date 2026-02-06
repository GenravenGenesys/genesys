import {useState} from 'react';
import {
    Box, Stepper, Step, StepLabel, Button, Typography,
    Stack, Paper, Container, Divider, List, ListItem, IconButton, ListItemText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import {InputTextFieldCard} from "../../../common/InputTextFieldCard.tsx";
import {
    type Archetype,
    type Career,
    type Skill,
    CharacteristicType,
    SkillType
} from "../../../../api/model";
import InlineTextField from "../../../common/InlineTextField.tsx";
import GenesysSelectField from "../../../common/field/GenesysSelectField.tsx";
import {useCreateCampaign} from "../../../../api/generated/campaign-controller/campaign-controller.ts";

const steps = ['World Identity', 'Define Skills', 'Create Archetypes', 'Set Careers'];

export default function CampaignWizard() {
    const [activeStep, setActiveStep] = useState(0);
    const createCampaignMutation = useCreateCampaign();

    const [campaign, setCampaign] = useState({
        name: '',
        description: '',
        compendium: {
            skills: [] as Skill[],
            archetypes: [] as Archetype[],
            careers: [] as Career[]
        }
    });

    const blankSkill = {
        id: '',
        name: '',
        characteristic: 'Brawn',
        type: SkillType.General,
        initiative: false,
    } as Skill;

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    // --- Step 1: World Identity ---
    const StepIdentity = () => (
        <Stack spacing={3} sx={{mt: 4}}>
            <Typography variant="h5">Name your World</Typography>
            <InputTextFieldCard defaultValue={campaign.name} fullWidth={true}
                                onCommit={(name) => setCampaign(prev => ({...prev, name: name}))}
                                title={"Campaign Title"} placeholder={"e.g. Shadows of the Core"}/>
            <InputTextFieldCard defaultValue={campaign.description} fullWidth={true}
                                onCommit={(description) => setCampaign(prev => ({...prev, description: description}))}
                                title={"Setting Description"} rows={4}/>
        </Stack>
    );

    const [newSkill, setNewSkill] = useState(blankSkill);
    const addSkill = () => {
        if (!newSkill.name) return;
        setCampaign({
            ...campaign,
            compendium: {...campaign.compendium, skills: [...campaign.compendium.skills, newSkill]}
        });
        setNewSkill(blankSkill);
    };

    const onCharacteristicChange = (value: CharacteristicType) => {
        setNewSkill({...newSkill, characteristic: value});
    };

    const onSkillTypeChange = (value: SkillType) => {
        setNewSkill({...newSkill, type: value});
    };

    const StepSkills = () => (
        <Box sx={{mt: 4}}>
            <Typography variant="h5" gutterBottom>Define the Skill List</Typography>
            <Paper variant="outlined" sx={{p: 2, mb: 3, display: 'flex', gap: 2}}>
                <InlineTextField defaultValue={newSkill.name} onCommit={(e) => setNewSkill({...newSkill, name: e})}
                                 label={"Skill Name"} fullWidth/>
                <GenesysSelectField value={newSkill.characteristic} label={'Skill Type'}
                                    onChange={onCharacteristicChange} options={CharacteristicType}/>
                <GenesysSelectField value={newSkill.type} label={'Skill Type'} onChange={onSkillTypeChange}
                                    options={SkillType}/>
                <Button onClick={addSkill} variant="contained" startIcon={<AddIcon/>}>Add</Button>
            </Paper>
            <List dense sx={{maxHeight: 300, overflowY: 'auto'}}>
                {campaign.compendium.skills.map((s, i) => (
                    <ListItem key={i} divider secondaryAction={<IconButton size="small"><DeleteIcon/></IconButton>}>
                        <ListItemText primary={s.name} secondary={s.characteristic}/>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <StepIdentity/>;
            case 1:
                return <StepSkills/>;
            case 2:
                return <Typography sx={{mt: 4}}>Archetype Creator would go here...</Typography>;
            case 3:
                return <Typography sx={{mt: 4}}>Career Creator would go here...</Typography>;
            default:
                return null;
        }
    };

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
                    <Typography color="text.secondary">
                        Follow these steps to initialize your custom Genesys setting.
                    </Typography>
                </Box>

                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{minHeight: '400px'}}>
                    {renderStepContent(activeStep)}
                </Box>

                <Divider sx={{my: 4}}/>

                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                    <Box>
                        {activeStep === steps.length - 1 ? (
                            <Button variant="contained" color="success" startIcon={<SaveIcon/>}
                                    onClick={onCreate}>
                                Create Setting
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={handleNext}>
                                Next Step
                            </Button>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}