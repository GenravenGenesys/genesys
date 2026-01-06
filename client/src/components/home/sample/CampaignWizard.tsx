import React, {useState} from 'react';
import {
    Box, Stepper, Step, StepLabel, Button, Typography,
    TextField, Stack, Paper, Container, Divider, List, ListItem, IconButton, ListItemText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const steps = ['World Identity', 'Define Skills', 'Create Archetypes', 'Set Careers'];

export default function CampaignWizard() {
    const [activeStep, setActiveStep] = useState(0);

    // Local state for the "Blank Slate" setting
    const [campaign, setCampaign] = useState({
        name: '',
        description: '',
        compendium: {
            skills: [] as any[],
            archetypes: [] as any[],
            careers: [] as any[]
        }
    });

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    // --- Step 1: World Identity ---
    const StepIdentity = () => (
        <Stack spacing={3} sx={{mt: 4}}>
            <Typography variant="h5">Name your World</Typography>
            <TextField
                label="Campaign Title"
                fullWidth
                value={campaign.name}
                onChange={(e) => setCampaign({...campaign, name: e.target.value})}
                placeholder="e.g. Shadows of the Core"
            />
            <TextField
                label="Setting Description"
                multiline rows={4}
                fullWidth
                value={campaign.description}
                onChange={(e) => setCampaign({...campaign, description: e.target.value})}
            />
        </Stack>
    );

    // --- Step 2: Skills (The Engine) ---
    const [newSkill, setNewSkill] = useState({name: '', characteristic: 'Brawn'});
    const addSkill = () => {
        if (!newSkill.name) return;
        setCampaign({
            ...campaign,
            compendium: {...campaign.compendium, skills: [...campaign.compendium.skills, newSkill]}
        });
        setNewSkill({name: '', characteristic: 'Brawn'});
    };

    const StepSkills = () => (
        <Box sx={{mt: 4}}>
            <Typography variant="h5" gutterBottom>Define the Skill List</Typography>
            <Paper variant="outlined" sx={{p: 2, mb: 3, display: 'flex', gap: 2}}>
                <TextField size="small" label="Skill Name" value={newSkill.name}
                           onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}/>
                <TextField select size="small" label="Attr" value={newSkill.characteristic} SelectProps={{native: true}}
                           onChange={(e) => setNewSkill({...newSkill, characteristic: e.target.value})}>
                    {['Brawn', 'Agility', 'Intellect', 'Cunning', 'Willpower', 'Presence'].map(s => <option key={s}
                                                                                                            value={s}>{s}</option>)}
                </TextField>
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

    return (
        <Container maxWidth="md" sx={{py: 8}}>
            <Paper elevation={3} sx={{p: 6, borderRadius: 4}}>
                <Box sx={{mb: 4, textAlign: 'center'}}>
                    <Typography variant="h4" fontWeight="bold" color="primary">Create New Campaign</Typography>
                    <Typography color="text.secondary">Follow these steps to initialize your custom Genesys
                        setting.</Typography>
                </Box>

                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}><StepLabel>{label}</StepLabel></Step>
                    ))}
                </Stepper>

                <Box sx={{minHeight: '400px'}}>
                    {renderStepContent(activeStep)}
                </Box>

                <Divider sx={{my: 4}}/>

                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                    <Box>
                        {activeStep === steps.length - 1 ? (
                            <Button variant="contained" color="success" startIcon={<SaveIcon/>}
                                    onClick={() => console.log("SUBMIT TO SPRING BOOT", campaign)}>
                                Create Setting
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={handleNext}>Next Step</Button>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}