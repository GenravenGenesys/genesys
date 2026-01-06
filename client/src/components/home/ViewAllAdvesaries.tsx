import React, { useState } from 'react';
import {
    Box, Typography, Grid2 as Grid, Card, CardContent,
    Button, Chip, Stack, ToggleButton, ToggleButtonGroup, Divider
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import GavelIcon from '@mui/icons-material/Gavel';
import AddIcon from '@mui/icons-material/Add';

export default function AdversaryCompendium() {
    const [viewType, setViewType] = useState('ALL');

    // Mock data representing your MongoDB collection
    const npcList = [
        { id: 1, name: "Street Toughs", type: "MINION", wounds: 5, soak: 3, skills: ["Brawl", "Ranged (Light)"] },
        { id: 2, name: "Security Officer", type: "RIVAL", wounds: 12, soak: 4, skills: ["Coercion 2", "Ranged (Heavy) 1"] },
        { id: 3, name: "The Cyber-Butcher", type: "NEMESIS", wounds: 20, strain: 15, soak: 6, skills: ["Melee 3", "Cool 2"] }
    ];

    // Logic to determine chip color based on type
    const getTypeStyles = (type) => {
        switch(type) {
            case 'NEMESIS': return { color: 'error', icon: <GavelIcon fontSize="small"/> };
            case 'RIVAL': return { color: 'warning', icon: <PersonIcon fontSize="small"/> };
            default: return { color: 'success', icon: <GroupsIcon fontSize="small"/> };
        }
    };

    return (
        <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
            {/* 1. Header with Type Switcher */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                <Box>
                    <Typography variant="h3" fontWeight="900">Adversary Library</Typography>
                    <Typography color="text.secondary">Manage the threats of your campaign setting.</Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}>New NPC</Button>
            </Box>

            {/* 2. Visual Filtering */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                <ToggleButtonGroup
                    value={viewType}
                    exclusive
                    onChange={(_, val) => val && setViewType(val)}
                    color="primary"
                >
                    <ToggleButton value="ALL" sx={{ px: 4 }}>All</ToggleButton>
                    <ToggleButton value="MINION" sx={{ px: 4 }}>Minions</ToggleButton>
                    <ToggleButton value="RIVAL" sx={{ px: 4 }}>Rivals</ToggleButton>
                    <ToggleButton value="NEMESIS" sx={{ px: 4 }}>Nemeses</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* 3. The Grid of Adversaries */}
            <Grid container spacing={3}>
                {npcList.filter(n => viewType === 'ALL' || n.type === viewType).map((npc) => {
                    const style = getTypeStyles(npc.type);
                    return (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={npc.id}>
                            <Card sx={{
                                borderTop: `4px solid`,
                                borderColor: `${style.color}.main`,
                                bgcolor: 'background.paper'
                            }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="h6" fontWeight="bold">{npc.name}</Typography>
                                        <Chip
                                            icon={style.icon}
                                            label={npc.type}
                                            color={style.color}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Box>

                                    <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                                        <Chip label={`Soak: ${npc.soak}`} size="small" />
                                        <Chip label={`Wounds: ${npc.wounds}`} size="small" />
                                        {npc.strain && <Chip label={`Strain: ${npc.strain}`} size="small" color="info" />}
                                    </Stack>

                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 'bold', textTransform: 'uppercase' }}>
                                        Key Skills
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
                                        {npc.skills.map(s => <Chip key={s} label={s} size="small" variant="text" />)}
                                    </Box>

                                    <Divider sx={{ mb: 2, opacity: 0.1 }} />

                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button fullWidth variant="outlined" size="small">Edit Stats</Button>
                                        <Button fullWidth variant="contained" size="small">Deploy to Scene</Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}