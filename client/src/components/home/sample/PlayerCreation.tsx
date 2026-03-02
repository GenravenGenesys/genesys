import React, {useState} from 'react';
import {
    Box, Stepper, Step, StepLabel, Button, Typography,
    TextField, MenuItem, Grid, Paper, Divider, Stack, CircularProgress
} from '@mui/material';
import {emptyPlayerCharacter} from "../../../models/Template.ts";
import {useParams} from "react-router-dom";
import {useCampaignLive} from "../../../hooks/campaign/useCampaginLive.ts";
import type {Archetype} from "../../../api/model";

const steps = [
    'Background', 'Archetype', 'Career',
    'Invest XP', 'Motivations', 'Starting Gear'
];

export default function CharacterCreator() {
    // const {id} = useParams<{ id: string }>();
    const id = "695e9ce4dcbe9bcbb04d09a4"
    const [activeStep, setActiveStep] = useState(0);
    const [character, setCharacter] = useState(emptyPlayerCharacter);
    const {campaign, isLoading: isCampaignLoading} = useCampaignLive(id || '');

    if (!id || !campaign) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    if (isCampaignLoading) {
        return <CircularProgress/>;
    }

    const compendium = campaign?.compendium;

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    // --- Step 1: Background ---
    const StepBackground = () => (
        <Stack spacing={3} sx={{mt: 3}}>
            <TextField label="Character Name" fullWidth value={character.name}
                       onChange={(e) => setCharacter({...character, name: e.target.value})}/>
            <TextField label="Background Story" multiline rows={4} fullWidth value={character.background}
                       onChange={(e) => setCharacter({...character, background: e.target.value})}/>
        </Stack>
    );

    // --- Step 2: Archetype (Sets Base Stats & XP) ---
    const StepArchetype = () => (
        <Grid container spacing={2} sx={{mt: 3}}>
            {compendium.archetypes.map((arch: Archetype) => (
                <Grid size={{xs: 12, md: 6}} key={arch.id}>
                    <Paper
                        onClick={() => setCharacter({
                            ...character,
                            archetype: arch,
                            experience: {
                                initial: arch.experience,
                                total: arch.experience,
                                available: arch.experience
                            },
                            // characteristics: arch.baseCharacteristics
                        })}
                        sx={{
                            p: 2,
                            cursor: 'pointer',
                            border: character.archetype === arch ? '2px solid #00e5ff' : 'none'
                        }}
                    >
                        <Typography variant="h6">{arch.name}</Typography>
                        {/*<Typography variant="caption">Starting XP: {arch.startingXp}</Typography>*/}
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );

    // --- Step 3: Career (Determines Career Skills) ---
    const StepCareer = () => (
        <Stack spacing={2} sx={{mt: 3}}>
            {/*<TextField select label="Select Career" fullWidth value={character.career}*/}
            {/*           onChange={(e) => setCharacter({...character, career: e.target.value})}>*/}
            {/*    {compendium.careers.map((c) => (*/}
            {/*        <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>*/}
            {/*    ))}*/}
            {/*</TextField>*/}
            <Typography variant="caption">Choosing a career will mark specific skills as 'Career Skills' for cheaper
                advancement.</Typography>
        </Stack>
    );

    // --- Step 4: Invest Initial Experience (Point Buy) ---
    const StepXP = () => (
        <Box sx={{mt: 3}}>
            <Typography variant="h6" gutterBottom>Available XP: {character.experience.initial}</Typography>
            <Grid container spacing={2}>
                {Object.keys(character.characteristics).map((stat) => (
                    <Grid size={4} key={stat} sx={{textAlign: 'center'}}>
                        {/*<Typography variant="h4">{character.characteristics[stat]}</Typography>*/}
                        <Typography variant="caption">{stat}</Typography>
                        <Box>
                            <Button size="small" onClick={() => {/* Logic to decrease XP and increase stat */
                            }}>+</Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    // --- Step 5: Motivations ---
    const StepMotivations = () => (
        <Grid container spacing={2} sx={{mt: 3}}>
            {['Strength', 'Flaw', 'Desire', 'Fear'].map((m) => (
                <Grid size={6} key={m}>
                    {/*<TextField label={m} fullWidth onChange={(e) => setCharacter({*/}
                    {/*    ...character,*/}
                    {/*    motivations: {...character.motivations, [m.toLowerCase()]: e.target.value}*/}
                    {/*})}/>*/}
                </Grid>
            ))}
        </Grid>
    );

    // --- Step 6: Starting Gear ---
    const StepGear = () => (
        <Box sx={{mt: 3}}>
            <Typography variant="subtitle1">Choose Starting Equipment (Refer to GM for Credits)</Typography>
            {/* Search/Select from campaignCompendium.weapons and items */}
        </Box>
    );

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <StepBackground/>;
            case 1:
                return <StepArchetype/>;
            case 2:
                return <StepCareer/>;
            case 3:
                return <StepXP/>;
            case 4:
                return <StepMotivations/>;
            case 5:
                return <StepGear/>;
            default:
                return null;
        }
    };

    return (
        <Box sx={{width: '100%', p: 4}}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}><StepLabel>{label}</StepLabel></Step>
                ))}
            </Stepper>

            <Box sx={{minHeight: '400px', mt: 4}}>
                {renderStepContent(activeStep)}
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'flex-end', pt: 2}}>
                <Button disabled={activeStep === 0} onClick={handleBack} sx={{mr: 1}}>Back</Button>
                <Button variant="contained" onClick={activeStep === steps.length - 1 ? () => {/* Save to DB */
                } : handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>
        </Box>
    );
}