import { useState } from 'react';
import {
    Box, Typography, Paper, Grid, Button,
    Chip, Avatar, Stack, Divider, LinearProgress, Container
} from '@mui/material';

// Icons
import ShieldIcon from '@mui/icons-material/Security';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CasinoIcon from '@mui/icons-material/Casino';
import type {CampaignEncounter} from "../../../../api/model"; // For Dice Pool

interface Props {
    encounter: CampaignEncounter,
    onEnd: () => void
}

export default function EncounterManager(props: Props) {
    const {encounter, onEnd} = props;

    return (
        <Container maxWidth="xl" sx={{py: 4}}>
            <Typography variant="h3" gutterBottom align="center" sx={{mb: 2}}>
                {encounter.name}
            </Typography>


        </Container>
    );
}