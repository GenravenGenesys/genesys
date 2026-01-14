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
    const [activeEncounter, setActiveEncounter] = useState(null);
    const [activeSceneIndex, setActiveSceneIndex] = useState(0);

    // Mock Data representing your MongoDB Session document (2026 State)
    const [session, setSession] = useState({
        title: "The Kessel Run: Part 2",
        // Story Points moved to Session as requested
        playerStoryPoints: 3,
        gmStoryPoints: 1,
        scenes: [
            {
                id: "s1", name: "Docking Bay 94", mapUrl: "source.unsplash.com", encounters: [
                    {
                        id: "e1", name: "Stormtrooper Patrol", turnOrder: [
                            {side: 'PC', successes: 3, advantages: 2, completed: false},
                            {side: 'NPC', successes: 2, advantages: 1, completed: false},
                            {side: 'PC', successes: 1, advantages: 4, completed: false}
                        ]
                    }
                ]
            }
        ],
        party: [
            {id: "p1", name: "Kaelen", wounds: 4, woundThreshold: 12, strain: 2, strainThreshold: 14}
        ]
    });

    const flipStoryPoint = (side) => {
        if (side === 'PC' && session.playerStoryPoints > 0) {
            setSession({
                ...session,
                playerStoryPoints: session.playerStoryPoints - 1,
                gmStoryPoints: session.gmStoryPoints + 1
            });
        } else if (side === 'GM' && session.gmStoryPoints > 0) {
            setSession({
                ...session,
                gmStoryPoints: session.gmStoryPoints - 1,
                playerStoryPoints: session.playerStoryPoints + 1
            });
        }
    };

    if (activeEncounter) {
        return <EncounterManager encounter={activeEncounter} session={session} onEnd={() => setActiveEncounter(null)}
                                 onUpdateSession={setSession}/>;
    }

    return (
        <Box sx={{p: 3, bgcolor: '#121212', minHeight: '100vh', color: 'white'}}>
            {/* SESSION HEADER & STORY POINTS */}
            <Grid container alignItems="center" sx={{mb: 4}}>
                <Grid size={{xs: 6}}>
                    <Typography variant="h3" fontWeight="900">{session.title}</Typography>
                    <Typography color="gray">Genesys VTT v2.0 | Campaign: Edge of the Void</Typography>
                </Grid>
                <Grid size={{xs: 6}}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
                        <Typography variant="button">Story Points:</Typography>
                        <Tooltip title="Click to spend for Players">
                            <Badge badgeContent={session.playerStoryPoints} color="primary" overlap="circular">
                                <Avatar sx={{bgcolor: 'gold', color: 'black', cursor: 'pointer'}}
                                        onClick={() => flipStoryPoint('PC')}>P</Avatar>
                            </Badge>
                        </Tooltip>
                        <Tooltip title="Click to spend for GM">
                            <Badge badgeContent={session.gmStoryPoints} color="error">
                                <Avatar sx={{bgcolor: 'darkred', cursor: 'pointer'}}
                                        onClick={() => flipStoryPoint('GM')}>GM</Avatar>
                            </Badge>
                        </Tooltip>
                    </Stack>
                </Grid>
            </Grid>

            {/* STAGE AREA */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <CardMedia component="img" image={session.scenes[activeSceneIndex].mapUrl}
                               sx={{borderRadius: 4, height: 400, filter: 'brightness(0.7)'}}/>
                    <Box sx={{mt: 2}}>
                        <Typography variant="h5">Active Scene: {session.scenes[activeSceneIndex].name}</Typography>
                        <Stack direction="row" spacing={2} sx={{mt: 2}}>
                            {session.scenes[activeSceneIndex].encounters.map(enc => (
                                <Button key={enc.id} variant="contained" startIcon={<CasinoIcon/>}
                                        onClick={() => setActiveEncounter(enc)}>
                                    Launch {enc.name}
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                </Grid>

                {/* PARTY ROSTER */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{p: 2, bgcolor: '#1e1e1e', borderRadius: 3}}>
                        <Typography variant="h6" sx={{mb: 2}}>Party Status</Typography>
                        {session.party.map(char => (
                            <Box key={char.id} sx={{mb: 3}}>
                                <Typography variant="subtitle1">{char.name}</Typography>
                                <Typography variant="caption">Wounds ({char.wounds}/{char.woundThreshold})</Typography>
                                <LinearProgress variant="determinate" value={(char.wounds / char.woundThreshold) * 100}
                                                color="error"/>
                                <Typography variant="caption" sx={{mt: 1, display: 'block'}}>Strain
                                    ({char.strain}/{char.strainThreshold})</Typography>
                                <LinearProgress variant="determinate" value={(char.strain / char.strainThreshold) * 100}
                                                color="info"/>
                            </Box>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}