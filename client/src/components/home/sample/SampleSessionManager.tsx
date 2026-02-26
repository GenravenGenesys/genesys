import React, { useState } from 'react';
import {
    Box, Typography, Grid, Paper, List, ListItem, ListItemIcon,
    ListItemText, Button, Chip, Divider, Card, CardMedia, CardContent,
    Avatar, Badge, Stack, IconButton, Tooltip
} from '@mui/material';

// Material Icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import MapIcon from '@mui/icons-material/Map';
import GavelIcon from '@mui/icons-material/Gavel';
import ForumIcon from '@mui/icons-material/Forum';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EncounterManager from "./EncounterManager.tsx";

// --- Sub-Component: Roster Item ---
const RosterItem = ({ name, wounds, strain, isNpc = false }) => (
    <ListItem sx={{ px: 0, mb: 0.5 }}>
        <ListItemIcon sx={{ minWidth: 42 }}>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={isNpc ? <StarIcon sx={{ fontSize: 10, color: 'warning.main' }} /> : null}
            >
                <Avatar sx={{
                    bgcolor: isNpc ? 'secondary.dark' : 'primary.dark',
                    width: 32, height: 32, fontSize: '0.8rem'
                }}>
                    {name.substring(0, 2).toUpperCase()}
                </Avatar>
            </Badge>
        </ListItemIcon>
        <ListItemText
            primary={<Typography variant="body2" fontWeight="bold">{name}</Typography>}
            secondary={
                <Stack direction="row" spacing={1}>
                    <Typography variant="caption" color="error.light">W: {wounds}</Typography>
                    <Typography variant="caption" color="info.light">S: {strain}</Typography>
                </Stack>
            }
        />
        <IconButton size="small"><MoreVertIcon fontSize="inherit" /></IconButton>
    </ListItem>
);

// --- Main Session Manager ---
export default function SampleSessionManager() {
    const [activeSceneIndex, setActiveSceneIndex] = useState(0);
    const [activeEncounter, setActiveEncounter] = useState(null);

    // Mock Session Data - In 2026, this comes from your Java 21 / MongoDB backend
    const sessionData = {
        title: "The Kessel Run: Part 2",
        scenes: [
            {
                id: "s1",
                name: "Docking Bay 94",
                mapUrl: "images.unsplash.com",
                encounters: [
                    { id: "e1", name: "Stormtrooper Patrol", type: "COMBAT", status: "READY" },
                    { id: "e2", name: "The Fixer's Deal", type: "SOCIAL", status: "COMPLETED" }
                ]
            },
            {
                id: "s2",
                name: "Nebula Hideout",
                mapUrl: "images.unsplash.com",
                encounters: [
                    { id: "e3", name: "Pirate Ambush", type: "COMBAT", status: "READY" }
                ]
            }
        ],
        party: [
            { id: "p1", name: "Kaelen", wounds: "4/12", strain: "2/14" },
            { id: "p2", name: "T-88", wounds: "0/10", strain: "5/12" }
        ],
        storyNpcs: [
            { id: "n1", name: "Han", wounds: "2/12", strain: "4/15" },
            { id: "n2", name: "Imperial Spy", wounds: "0/8", strain: "0/10" }
        ]
    };

    const currentScene = sessionData.scenes[activeSceneIndex];

    const launchEncounter = (encounter) => {
        setActiveEncounter(encounter);
    };

    if (activeEncounter) {
        return (
            <EncounterManager
                encounter={activeEncounter}
                onEnd={() => setActiveEncounter(null)}
            />
        );
    }

    return (
        <Box sx={{ p: 3, height: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>

            {/* 1. SESSION HEADER */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: -1 }}>{sessionData.title}</Typography>
                    <Typography variant="body2" color="text.secondary">January 6, 2026 | Campaign: Edge of the Void</Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="primary" startIcon={<AddIcon />}>Quick Note</Button>
                    <Button variant="contained" color="error" startIcon={<PlayArrowIcon />}>End Session</Button>
                </Stack>
            </Box>

            <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: 0 }}>

                {/* COLUMN 1: SCENE NAVIGATOR (Left) */}
                <Grid size={{ xs: 12, md: 2 }} sx={{ height: '100%' }}>
                    <Paper sx={{ p: 2, height: '100%', borderRadius: 3, overflowY: 'auto' }}>
                        <Typography variant="overline" fontWeight="700" color="primary">Prepared Scenes</Typography>
                        <List sx={{ mt: 1 }}>
                            {sessionData.scenes.map((scene, index) => (
                                <ListItem
                                    key={scene.id}
                                    disablePadding
                                    sx={{ mb: 1 }}
                                >
                                    <Button
                                        fullWidth
                                        onClick={() => setActiveSceneIndex(index)}
                                        variant={activeSceneIndex === index ? "contained" : "text"}
                                        sx={{
                                            justifyContent: 'flex-start',
                                            textAlign: 'left',
                                            py: 1.5,
                                            borderRadius: 2,
                                            bgcolor: activeSceneIndex === index ? 'primary.main' : 'transparent',
                                            color: activeSceneIndex === index ? 'black' : 'white'
                                        }}
                                        startIcon={<MapIcon />}
                                    >
                                        <Box>
                                            <Typography variant="body2" fontWeight="bold">{scene.name}</Typography>
                                            <Typography variant="caption" sx={{ opacity: 0.7 }}>{scene.encounters.length} Encounters</Typography>
                                        </Box>
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                        <Button fullWidth variant="outlined" startIcon={<AddIcon />} sx={{ mt: 2, borderStyle: 'dashed' }}>
                            Add Scene
                        </Button>
                    </Paper>
                </Grid>

                {/* COLUMN 2: THE STAGE (Center) */}
                <Grid size={{ xs: 12, md: 7 }} sx={{ height: '100%' }}>
                    <Paper sx={{ height: '100%', borderRadius: 3, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ position: 'relative', height: '40%' }}>
                            <CardMedia
                                component="img"
                                image={currentScene.mapUrl}
                                sx={{ height: '100%', filter: 'brightness(0.5)' }}
                            />
                            <Box sx={{ position: 'absolute', bottom: 20, left: 20 }}>
                                <Chip label="ACTIVE STAGE" color="primary" size="small" sx={{ mb: 1, fontWeight: 'bold' }} />
                                <Typography variant="h3" fontWeight="900" color="white">{currentScene.name}</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto', bgcolor: 'background.paper' }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>Encounters</Typography>
                            <Grid container spacing={2}>
                                {currentScene.encounters.map((enc) => (
                                    <Grid size={{ xs: 12, sm: 6 }} key={enc.id}>
                                        <Card variant="outlined" sx={{ bgcolor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.1)' }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                                    <Typography variant="subtitle1" fontWeight="bold">{enc.name}</Typography>
                                                    {enc.type === "COMBAT" ? <GavelIcon color="error" /> : <ForumIcon color="info" />}
                                                </Box>
                                                <Stack direction="row" spacing={1} mb={2}>
                                                    <Chip label={enc.type} size="small" variant="outlined" />
                                                    <Chip label={enc.status} size="small" color={enc.status === "READY" ? "success" : "default"} />
                                                </Stack>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    disabled={enc.status === "COMPLETED"}
                                                    startIcon={<PlayArrowIcon />}
                                                    onClick={() => launchEncounter(enc)}
                                                >
                                                    {enc.status === "COMPLETED" ? "Resolved" : "Launch Encounter"}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

                {/* COLUMN 3: ACTIVE ROSTER (Right) */}
                <Grid size={{ xs: 12, md: 3 }} sx={{ height: '100%' }}>
                    <Paper sx={{ p: 2, height: '100%', borderRadius: 3, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="overline" fontWeight="700" color="primary">Active Roster</Typography>

                        <Box sx={{ mt: 2, flexGrow: 1, overflowY: 'auto' }}>
                            <Typography variant="caption" fontWeight="bold" sx={{ opacity: 0.5, letterSpacing: 1 }}>THE PARTY</Typography>
                            <List dense>
                                {sessionData.party.map(pc => (
                                    <RosterItem key={pc.id} name={pc.name} wounds={pc.wounds} strain={pc.strain} />
                                ))}
                            </List>

                            <Divider sx={{ my: 2, opacity: 0.1 }} />

                            <Typography variant="caption" fontWeight="bold" sx={{ opacity: 0.5, letterSpacing: 1 }}>STORY NPCs</Typography>
                            <List dense>
                                {sessionData.storyNpcs.map(npc => (
                                    <RosterItem key={npc.id} name={npc.name} wounds={npc.wounds} strain={npc.strain} isNpc />
                                ))}
                            </List>
                        </Box>

                        <Box sx={{ pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <Stack spacing={1}>
                                <Button fullWidth size="small" variant="outlined" startIcon={<AddIcon />}>Add Story NPC</Button>
                                <Button fullWidth size="small" variant="text" startIcon={<LocalHospitalIcon />}>Heal All</Button>
                            </Stack>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>
        </Box>
    );
}