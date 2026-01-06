import React from 'react';
import {
    Box, Typography, Autocomplete, TextField,
    Card, CardContent, IconButton, Stack, Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FlareIcon from '@mui/icons-material/Flare';
import RadarIcon from '@mui/icons-material/Radar';

export default function NpcWeaponPicker({
                                            libraryWeapons, // From Campaign Compendium
                                            currentWeapons, // From NPC document
                                            onUpdate,
                                            isMinion
                                        }) {

    const handleAddWeapon = (weapon) => {
        if (!weapon) return;
        // For Minions, we might replace the weapon; for others, we append
        const updated = isMinion ? [weapon] : [...currentWeapons, weapon];
        onUpdate(updated);
    };

    const handleRemove = (index) => {
        const updated = currentWeapons.filter((_, i) => i !== index);
        onUpdate(updated);
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                EQUIPPED WEAPONS {isMinion && "(GROUP SHARED)"}
            </Typography>

            {/* 1. SEARCH BOX */}
            <Autocomplete
                options={libraryWeapons}
                getOptionLabel={(option) => option.name}
                onChange={(_, newValue) => handleAddWeapon(newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Campaign Library..."
                        size="small"
                        placeholder="Add a weapon..."
                    />
                )}
                sx={{ mb: 2 }}
            />

            {/* 2. LIST OF EQUIPPED WEAPONS */}
            <Stack spacing={1}>
                {currentWeapons.map((weapon, index) => (
                    <Card key={index} variant="outlined" sx={{ bgcolor: 'rgba(255,255,255,0.03)' }}>
                        <CardContent sx={{ p: '8px 12px !important', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="body2" fontWeight="bold">{weapon.name}</Typography>
                                <Stack direction="row" spacing={1.5} sx={{ mt: 0.5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <FlareIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
                                        <Typography variant="caption">{weapon.damage}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <RadarIcon sx={{ fontSize: 14 }} />
                                        <Typography variant="caption">{weapon.range}</Typography>
                                    </Box>
                                </Stack>
                            </Box>
                            <IconButton size="small" color="error" onClick={() => handleRemove(index)}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}