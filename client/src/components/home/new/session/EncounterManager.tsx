import React, { useState } from 'react';
import {
    Box, Typography, Paper, Grid, Button,
    Chip, Avatar, IconButton, Stack, Divider, LinearProgress
} from '@mui/material';

// Icons
import ShieldIcon from '@mui/icons-material/Security';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CasinoIcon from '@mui/icons-material/Casino'; // For Dice Pool

export default function EncounterManager({ encounter, onEnd }) {
    const [activeSlot, setActiveSlot] = useState(0);

    // Mock Active Participants
    const participants = [
        { name: "Kaelen", type: "PC", wounds: 4, maxWounds: 12, strain: 2, maxStrain: 14, soak: 3 },
        { name: "Stormtrooper Group", type: "NPC", wounds: 15, maxWounds: 15, soak: 2, isMinion: true },
        { name: "Inquisitor", type: "NPC", wounds: 12, maxWounds: 25, strain: 8, maxStrain: 15, soak: 5 }
    ];

    return (
        <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>

            {/* HEADER: ROUND TRACKER */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight="900">ENCOUNTER: {encounter.name}</Typography>
                    <Typography color="primary">Round 1 — Initiative Active</Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<CasinoIcon />}>Dice Roller</Button>
                    <Button variant="contained" color="error" onClick={onEnd}>End Encounter</Button>
                </Stack>
            </Box>

            <Grid container spacing={3}>

                {/* LEFT: INITIATIVE TRACKER */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 2, borderRadius: 4 }}>
                        <Typography variant="overline" sx={{ fontWeight: 'bold', mb: 2, display: 'block' }}>Initiative Slots</Typography>
                        <Stack spacing={1}>
                            {participants.map((p, index) => (
                                <Paper
                                    key={index}
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderLeft: `5px solid ${p.type === 'PC' ? '#00e5ff' : '#ff4081'}`,
                                        bgcolor: activeSlot === index ? 'rgba(0,229,255,0.1)' : 'rgba(255,255,255,0.02)',
                                        opacity: activeSlot > index ? 0.5 : 1
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ width: 30, height: 30, fontSize: '0.8rem' }}>{p.type}</Avatar>
                                        <Typography fontWeight={activeSlot === index ? "bold" : "normal"}>{p.name}</Typography>
                                    </Box>
                                    {activeSlot === index && <Chip label="ACTING" size="small" color="primary" />}
                                </Paper>
                            ))}
                        </Stack>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                            endIcon={<SkipNextIcon />}
                            onClick={() => setActiveSlot((activeSlot + 1) % participants.length)}
                        >
                            Next Turn
                        </Button>
                    </Paper>
                </Grid>

                {/* RIGHT: TARGET HUD (Stats for currently acting participant) */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 4, borderRadius: 4, height: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                            <Typography variant="h3" fontWeight="bold">{participants[activeSlot].name}</Typography>
                            <Chip label={participants[activeSlot].type} color={participants[activeSlot].type === 'PC' ? 'primary' : 'secondary'} />
                        </Box>

                        <Grid container spacing={4}>
                            {/* HEALTH BARS */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="subtitle2" gutterBottom>WOUNDS ({participants[activeSlot].wounds}/{participants[activeSlot].maxWounds})</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={(participants[activeSlot].wounds / participants[activeSlot].maxWounds) * 100}
                                    color="error"
                                    sx={{ height: 10, borderRadius: 5, mb: 3 }}
                                />

                                {participants[activeSlot].maxStrain && (
                                    <>
                                        <Typography variant="subtitle2" gutterBottom>STRAIN ({participants[activeSlot].strain}/{participants[activeSlot].maxStrain})</Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(participants[activeSlot].strain / participants[activeSlot].maxStrain) * 100}
                                            color="info"
                                            sx={{ height: 10, borderRadius: 5 }}
                                        />
                                    </>
                                )}
                            </Grid>

                            {/* DEFENSIVE STATS */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Stack direction="row" spacing={3}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <ShieldIcon color="primary" sx={{ fontSize: 40 }} />
                                        <Typography variant="h5">{participants[activeSlot].soak}</Typography>
                                        <Typography variant="caption">SOAK</Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <FlashOnIcon color="warning" sx={{ fontSize: 40 }} />
                                        <Typography variant="h5">1</Typography>
                                        <Typography variant="caption">DEFENSE</Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 4 }} />

                        {/* QUICK ACTIONS */}
                        <Typography variant="h6" gutterBottom>Quick GM Actions</Typography>
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" color="error">-1 Wound</Button>
                            <Button variant="outlined" color="error">-5 Wounds</Button>
                            <Button variant="outlined" color="info">-1 Strain</Button>
                            <Button variant="contained" startIcon={<CasinoIcon />}>Roll Attack</Button>
                        </Stack>
                    </Paper>
                </Grid>

            </Grid>
        </Box>
    );
}