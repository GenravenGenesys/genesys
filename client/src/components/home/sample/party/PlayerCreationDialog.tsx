import {
    Box, Button, Checkbox, Container,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Paper, Stack, Step, StepLabel, Stepper, TextField,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import {
    type CampaignCompendium,
    type Career,
    type PlayerCharacter,
    type PlayerSkill,
    type Skill
} from "../../../../api/model";
import SaveIcon from "@mui/icons-material/Save";
import {useEffect, useState} from "react";
import {emptyArchetype, emptyCareer, emptyPlayerCharacter} from "../../../../models/Template.ts";
import ArchetypeSelectionStep from "./ArchetypeSelectionStep.tsx";
import CareerSelectionStep from "./CareerSelectionStep.tsx";

interface Props {
    open: boolean;
    player: PlayerCharacter;
    compendium: CampaignCompendium;
    onClose: () => void;
    onSave: (data: PlayerCharacter) => void;
}

export default function PlayerCreationDialog(props: Props) {
    const {open, player, compendium, onClose, onSave} = props;
    const [formData, setFormData] = useState<PlayerCharacter>(player || {});
    const [activeStep, setActiveStep] = useState(0);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const steps = ['Character Concept', 'Select Archetype', 'Select Career', 'Spend Initial XP', 'Choose Motivations', 'Select Gear', 'Final Review'];

    useEffect(() => {
        if (player) setFormData(player);
    }, [player]);

    const isStepValid = (step: number): boolean => {
        switch (step) {
            case 0:
                return !!formData.name?.trim();
            case 1:
                return formData.archetype !== emptyArchetype;
            case 2:
                return formData.career !== emptyCareer && formData.skills.length === 4;
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (isStepValid(activeStep)) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleChange = <K extends keyof PlayerCharacter>(field: K, value: PlayerCharacter[K]) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleCareerSkillSelection = (career: Career, skills: Skill[]) => {
        handleChange('career', career);
        const playerSkills = [] as PlayerSkill[];
        for (const skill of skills) {
            playerSkills.push({...skill, ranks: 1});
        }
        handleChange('skills', playerSkills);
    }

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Stack spacing={3} sx={{mt: 3}}>
                        <TextField label="Character Name" fullWidth value={formData.name}
                                   onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                        <TextField label="Background Story" multiline rows={4} fullWidth value={formData.background}
                                   onChange={(e) => setFormData({...formData, background: e.target.value})}/>
                    </Stack>
                );
            case 1:
                return <ArchetypeSelectionStep archetype={formData.archetype} archetypes={compendium.archetypes}
                                               onSave={(archetype) => handleChange('archetype', archetype)}/>;
            case 2:
                return <CareerSelectionStep career={formData.career} careers={compendium.careers} onSave={handleCareerSkillSelection}/>
            case 3:
                return <Typography sx={{mt: 4}}>Experience Spending would go here...</Typography>;
            case 4:
                return <Typography sx={{mt: 4}}>Player Motivation Selection would go here...</Typography>;
            case 5:
                return <Typography sx={{mt: 4}}>Gear Selection would go here...</Typography>;
            case 6:
                return <Typography sx={{mt: 4}}>Player Final Review would go here...</Typography>;
            default:
                return null;
        }
    };

    const handleSave = () => {
        onSave(formData);
        setActiveStep(0);
        setFormData(emptyPlayerCharacter);
        onClose();
    }

    const handleClose = () => {
        setActiveStep(0);
        setFormData(emptyPlayerCharacter);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            fullScreen={fullScreen}
            maxWidth="md"
            scroll="paper"
            slotProps={{paper: {sx: {borderRadius: 4, bgcolor: '#050c14', backgroundImage: 'none'}}}}
        >
            <Container maxWidth="md" sx={{py: 8}}>
                <Paper elevation={3} sx={{p: 6, borderRadius: 4}}>
                    <Box sx={{mb: 4, textAlign: 'center'}}>
                        <Typography variant="h4" fontWeight="bold" color="primary">
                            Create New Player Character
                        </Typography>
                        <Typography color="text.secondary">
                            Follow these steps to create a new Player Characters.
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
                                        onClick={handleSave}>
                                    Create Player Character
                                </Button>
                            ) : (
                                <Button variant="contained" onClick={handleNext} disabled={!isStepValid(activeStep)}>
                                    Next Step
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Dialog>
    );
}