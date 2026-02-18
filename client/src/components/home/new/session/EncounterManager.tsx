import React, {Fragment, useState} from 'react';
import {
    Box, Typography, Paper, Grid, Button,
    Chip, Avatar, Stack, Divider, LinearProgress, Container
} from '@mui/material';

import {type CampaignEncounter, CampaignEncounterStatus} from "../../../../api/model";
import StopIcon from '@mui/icons-material/Stop';
import StartEncounterView from "./encounter/StartEncounterView.tsx";

interface Props {
    encounter: CampaignEncounter,
    onEnd: () => void
}

export default function EncounterManager(props: Props) {
    const {encounter, onEnd} = props;
    const [round, setRound] = useState(1);

    return (
        <Container maxWidth="xl" sx={{py: 4}}>
            <Box sx={{mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h3" gutterBottom align="center" sx={{mb: 2}}>
                    {encounter.name}
                </Typography>
                <Button variant="contained" color="error" startIcon={<StopIcon/>} onClick={() => onEnd()}>End
                    Encounter</Button>
            </Box>


            {encounter.status === CampaignEncounterStatus.Building && (
                <Fragment/>
            )}

            {encounter.status === CampaignEncounterStatus.Ready && (
                <StartEncounterView encounter={encounter}/>
            )}

            {encounter.status === CampaignEncounterStatus.Active && (
                <Fragment/>
            )}

            {encounter.status === CampaignEncounterStatus.Resolved && (
                <Paper sx={{p: 4, textAlign: "center"}}>
                    <Typography variant="h4" gutterBottom>
                        Encounter Complete!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{mb: 3}}>
                        {encounter.name} has ended after {round} rounds.
                    </Typography>
                </Paper>
            )}

        </Container>
    );
}