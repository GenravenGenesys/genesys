import React, {useState, useEffect} from 'react';
import {
    Box, Typography, Grid, Paper, List, ListItem, ListItemIcon,
    ListItemText, Button, Chip, Divider, CardMedia, Avatar,
    Badge, Stack, IconButton, Tooltip, LinearProgress
} from '@mui/material';

// Icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import MapIcon from '@mui/icons-material/Map';
import CasinoIcon from '@mui/icons-material/Casino'; // For Dice
import SkipNextIcon from '@mui/icons-material/SkipNext';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// --- ENCOUNTER MANAGER COMPONENT ---
const EncounterManager = ({encounter, session, onEnd, onUpdateSession}) => {
    const [currentRound, setCurrentRound] = useState(1);

    const handleClaimSlot = (index, actorId) => {
        const updatedSlots = [...encounter.turnOrder];
        updatedSlots[index].completed = true;
        updatedSlots[index].activeActorId = actorId;
        // In a real app, this would be a PATCH to your MongoDB backend
        console.log(`Slot ${index} claimed by ${actorId}`);
    };

    const nextRound = () => {
        setCurrentRound(prev => prev + 1);
        // Reset all slots for the new round
        encounter.turnOrder.forEach(slot => {
            slot.completed = false;
            slot.activeActorId = null;
        });
    };

    return (
        <Box sx={{p: 3, bgcolor: '#1a1a1a', height: '100vh', color: 'white'}}>
            <Stack direction="row" justifyContent="space-between" sx={{mb: 4}}>
                <Typography variant="h4" fontWeight="900">ENCOUNTER: {encounter.name}</Typography>
                <Stack direction="row" spacing={2}>
                    <Chip label={`ROUND ${currentRound}`} color="secondary"/>
                    <Button variant="contained" color="error" onClick={onEnd}>End Encounter</Button>
                </Stack>
            </Stack>

            <Grid container spacing={4}>
                {/* INITIATIVE TRACKER */}
                <Grid item xs={12} md={8}>
                    <Typography variant="overline" color="gray">Initiative Slots</Typography>
                    <Stack direction="row" spacing={2} sx={{mt: 2}}>
                        {encounter.turnOrder.map((slot, index) => (
                            <Paper key={index} sx={{
                                p: 2, minWidth: 120, textAlign: 'center',
                                border: slot.completed ? '1px solid gray' : `2px solid ${slot.side === 'PC' ? '#FFD700' : '#42a5f5'}`,
                                opacity: slot.completed ? 0.5 : 1,
                                bgcolor: '#2c2c2c'
                            }}>
                                <Typography variant="h6" color={slot.side === 'PC' ? 'gold' : 'lightskyblue'}>
                                    {slot.side} SLOT
                                </Typography>
                                <Typography variant="caption">{slot.successes}S, {slot.advantages}A</Typography>
                                <Box sx={{mt: 1}}>
                                    {!slot.completed ? (
                                        <Button size="small" variant="outlined"
                                                onClick={() => handleClaimSlot(index, "active-user")}>
                                            Claim
                                        </Button>
                                    ) : (
                                        <Typography variant="body2" color="gray">Used</Typography>
                                    )}
                                </Box>
                            </Paper>
                        ))}
                        <IconButton onClick={nextRound} sx={{color: 'white'}}><SkipNextIcon/></IconButton>
                    </Stack>
                </Grid>

                {/* QUICK DICE TRAY */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{p: 2, bgcolor: '#333'}}>
                        <Typography variant="h6">Dice Quick-Roll</Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1} sx={{mt: 2}}>
                            <Button variant="contained" sx={{bgcolor: 'green'}}>Ability</Button>
                            <Button variant="contained" sx={{bgcolor: 'yellow', color: 'black'}}>Prof.</Button>
                            <Button variant="contained" sx={{bgcolor: 'purple'}}>Diff.</Button>
                            <Button variant="contained" sx={{bgcolor: 'red'}}>Chal.</Button>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

// --- MAIN SESSION MANAGER ---
export default function GenesysSessionManager() {
    const [activeSceneIndex, setActiveSceneIndex] = useState(0);
    const [activeEncounter, setActiveEncounter] = useState(null);

    // Mock Data reflecting your MongoDB Session (2026 State)
    const [session, setSession] = useState({
        title: "The Kessel Run: Part 2",
        playerStoryPoints: 3,
        gmStoryPoints: 1,
        scenes: [
            {
                id: "s1",
                name: "Docking Bay 94",
                mapUrl: "images.unsplash.com",
                encounters: [{ id: "e1", name: "Stormtrooper Patrol", status: "READY" }]
            },
            {
                id: "s2",
                name: "Nebula Hideout",
                mapUrl: "images.unsplash.com",
                encounters: [{ id: "e2", name: "Pirate Ambush", status: "READY" }]
            }
        ],
        party: [
            { id: "p1", name: "Kaelen", wounds: 4, woundThreshold: 12, strain: 2, strainThreshold: 14 },
            { id: "p2", name: "T-88", wounds: 0, woundThreshold: 10, strain: 5, strainThreshold: 12 }
        ]
    });

    const currentScene = session.scenes[activeSceneIndex];

    const flipStoryPoint = (side: 'PC' | 'GM') => {
        if (side === 'PC' && session.playerStoryPoints > 0) {
            setSession({ ...session, playerStoryPoints: session.playerStoryPoints - 1, gmStoryPoints: session.gmStoryPoints + 1 });
        } else if (side === 'GM' && session.gmStoryPoints > 0) {
            setSession({ ...session, gmStoryPoints: session.gmStoryPoints - 1, playerStoryPoints: session.playerStoryPoints + 1 });
        }
    };

    return (
        <Box sx={{ p: 3, height: '100vh', bgcolor: '#0a0a0a', display: 'flex', flexDirection: 'column', color: 'white' }}>

            {/* 1. SESSION HEADER */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: -1 }}>{session.title}</Typography>
                    <Typography variant="body2" color="text.secondary">January 14, 2026 | Campaign: Edge of the Void</Typography>
                </Box>

                {/* STORY POINTS HUD */}
                <Stack direction="row" spacing={3} alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="overline" sx={{ opacity: 0.6 }}>Story Points</Typography>
                        <Badge badgeContent={session.playerStoryPoints} color="primary">
                            <Avatar sx={{ bgcolor: '#FFD700', color: 'black', cursor: 'pointer', width: 32, height: 32 }} onClick={() => flipStoryPoint('PC')}>P</Avatar>
                        </Badge>
                        <Badge badgeContent={session.gmStoryPoints} color="error">
                            <Avatar sx={{ bgcolor: '#8b0000', cursor: 'pointer', width: 32, height: 32 }} onClick={() => flipStoryPoint('GM')}>GM</Avatar>
                        </Badge>
                    </Stack>
                    <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                    <Button variant="contained" color="error" startIcon={<PlayArrowIcon />}>End Session</Button>
                </Stack>
            </Box>

            <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: 0 }}>

                {/* COLUMN 1: SCENE NAVIGATOR (MUI 7 Size Syntax) */}
                <Grid size={{ xs: 12, md: 2 }} sx={{ height: '100%' }}>
                    <Paper sx={{ p: 2, height: '100%', borderRadius: 3, bgcolor: '#1a1a1a', overflowY: 'auto' }}>
                        <Typography variant="overline" fontWeight="700" color="primary">Scenes</Typography>
                        <List sx={{ mt: 1 }}>
                            {session.scenes.map((scene, index) => (
                                <ListItem key={scene.id} disablePadding sx={{ mb: 1 }}>
                                    <Button
                                        fullWidth
                                        onClick={() => setActiveSceneIndex(index)}
                                        variant={activeSceneIndex === index ? "contained" : "text"}
                                        sx={{ justifyContent: 'flex-start', textAlign: 'left', borderRadius: 2 }}
                                        startIcon={<MapIcon />}
                                    >
                                        <Typography variant="body2" noWrap>{scene.name}</Typography>
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* COLUMN 2: THE STAGE */}
                <Grid size={{ xs: 12, md: 7 }} sx={{ height: '100%' }}>
                    <Paper sx={{ height: '100%', borderRadius: 3, overflow: 'hidden', display: 'flex', flexDirection: 'column', bgcolor: '#1a1a1a' }}>
                        <Box sx={{ position: 'relative', height: '50%' }}>
                            <CardMedia component="img" image={currentScene.mapUrl} sx={{ height: '100%', filter: 'brightness(0.4)' }} />
                            <Box sx={{ position: 'absolute', bottom: 20, left: 20 }}>
                                <Chip label="ACTIVE STAGE" color="primary" size="small" sx={{ mb: 1, fontWeight: 'bold' }} />
                                <Typography variant="h3" fontWeight="900">{currentScene.name}</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ p: 3, flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>Encounters</Typography>
                            <Stack direction="row" spacing={2}>
                                {currentScene.encounters.map(enc => (
                                    <Button
                                        key={enc.id}
                                        variant="outlined"
                                        sx={{ p: 2, borderStyle: 'dashed' }}
                                        onClick={() => setActiveEncounter(enc)}
                                        startIcon={<CasinoIcon />}
                                    >
                                        Launch {enc.name}
                                    </Button>
                                ))}
                            </Stack>
                        </Box>
                    </Paper>
                </Grid>

                {/* COLUMN 3: PARTY ROSTER */}
                <Grid size={{ xs: 12, md: 3 }} sx={{ height: '100%' }}>
                    <Paper sx={{ p: 2, height: '100%', borderRadius: 3, bgcolor: '#1a1a1a', overflowY: 'auto' }}>
                        <Typography variant="overline" fontWeight="700" color="primary">Party Roster</Typography>
                        {session.party.map(char => (
                            <Box key={char.id} sx={{ mb: 3, mt: 2 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography variant="subtitle2">{char.name}</Typography>
                                    <IconButton size="small"><MoreVertIcon fontSize="inherit" sx={{ color: 'white' }}/></IconButton>
                                </Stack>
                                <Typography variant="caption" color="error.light">Wounds ({char.wounds}/{char.woundThreshold})</Typography>
                                <LinearProgress variant="determinate" value={(char.wounds / char.woundThreshold) * 100} color="error" sx={{ mb: 1, height: 6, borderRadius: 3 }} />
                                <Typography variant="caption" color="info.light">Strain ({char.strain}/{char.strainThreshold})</Typography>
                                <LinearProgress variant="determinate" value={(char.strain / char.strainThreshold) * 100} color="info" sx={{ height: 6, borderRadius: 3 }} />
                            </Box>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}