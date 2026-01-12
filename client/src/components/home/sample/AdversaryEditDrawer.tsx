import React, {useState, useEffect} from 'react';
import {
    Box, Drawer, Typography, TextField, Stack, Button,
    MenuItem, Grid2 as Grid, Divider, ToggleButtonGroup, ToggleButton
} from '@mui/material';
import NpcWeaponPicker from "./NpcWeaponPicker.tsx";

export default function AdversaryEditDrawer({open, item, onClose, onSave}) {
    const [formData, setFormData] = useState(item || {
        type: 'MINION',
        characteristics: {BR: 2, AG: 2, INT: 2, CUN: 2, WIL: 2, PR: 2},
        ratings: {combat: 1, social: 1, general: 1},
        derived: {soak: 2, wounds: 5, strain: 0}
    });

    const [weaponLibrary] = useState([
        {id: 'w1', name: "Blaster Rifle", damage: 9, range: "Long"},
        {id: 'w2', name: "Combat Knife", damage: "+1", range: "Engaged"}
    ]);

    useEffect(() => {
        if (item) setFormData(item);
    }, [item]);

    const updateChar = (key, val) => {
        setFormData(prev => ({
            ...prev,
            characteristics: {...prev.characteristics, [key]: parseInt(val) || 0}
        }));
    };

    const updateRating = (key, val) => {
        setFormData(prev => ({
            ...prev,
            ratings: {...prev.ratings, [key]: parseInt(val) || 0}
        }));
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{sx: {width: 500, p: 4, bgcolor: '#050c14'}}}>
            <Typography variant="h5" fontWeight="bold" sx={{mb: 3}}>
                {item?.isNew ? "New Adversary" : "Edit Adversary"}
            </Typography>

            <Stack spacing={3}>
                <TextField label="Name" fullWidth value={formData.name || ''}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}/>

                {/* Type Selector (Drives conditional logic) */}
                <ToggleButtonGroup
                    exclusive fullWidth
                    value={formData.type}
                    onChange={(_, val) => val && setFormData({...formData, type: val})}
                >
                    <ToggleButton value="MINION">Minion</ToggleButton>
                    <ToggleButton value="RIVAL">Rival</ToggleButton>
                    <ToggleButton value="NEMESIS">Nemesis</ToggleButton>
                </ToggleButtonGroup>

                <Divider>Characteristics</Divider>
                <Grid container spacing={1}>
                    {Object.keys(formData.characteristics).map(char => (
                        <Grid size={4} key={char}>
                            <TextField label={char} type="number" size="small" value={formData.characteristics[char]}
                                       onChange={(e) => updateChar(char, e.target.value)}/>
                        </Grid>
                    ))}
                </Grid>

                <Divider>Ratings (C/S/G)</Divider>
                <Grid container spacing={1}>
                    <Grid size={4}><TextField label="Combat" type="number" value={formData.ratings.combat}
                                              onChange={(e) => updateRating('combat', e.target.value)}/></Grid>
                    <Grid size={4}><TextField label="Social" type="number" value={formData.ratings.social}
                                              onChange={(e) => updateRating('social', e.target.value)}/></Grid>
                    <Grid size={4}><TextField label="General" type="number" value={formData.ratings.general}
                                              onChange={(e) => updateRating('general', e.target.value)}/></Grid>
                </Grid>

                <NpcWeaponPicker
                    libraryWeapons={weaponLibrary} // This comes from your 2026 Redux/Zustand state
                    currentWeapons={formData.equipment?.weapons || []}
                    isMinion={formData.type === 'MINION'}
                    onUpdate={(updatedList) => setFormData({
                        ...formData,
                        equipment: {...formData.equipment, weapons: updatedList}
                    })}
                />

                <Divider>Derived Stats</Divider>
                <Grid container spacing={2}>
                    <Grid size={4}><TextField label="Soak" type="number" value={formData.derived.soak}
                                              onChange={(e) => setFormData({
                                                  ...formData,
                                                  derived: {...formData.derived, soak: parseInt(e.target.value)}
                                              })}/></Grid>
                    <Grid size={4}><TextField label="Wounds" type="number" value={formData.derived.wounds}
                                              onChange={(e) => setFormData({
                                                  ...formData,
                                                  derived: {...formData.derived, wounds: parseInt(e.target.value)}
                                              })}/></Grid>
                    {formData.type === 'NEMESIS' && (
                        <Grid size={4}><TextField label="Strain" type="number" value={formData.derived.strain}
                                                  onChange={(e) => setFormData({
                                                      ...formData,
                                                      derived: {...formData.derived, strain: parseInt(e.target.value)}
                                                  })}/></Grid>
                    )}
                </Grid>

                <Box sx={{mt: 4, display: 'flex', gap: 2}}>
                    <Button variant="contained" fullWidth onClick={() => onSave(formData)}>Save NPC</Button>
                    <Button variant="outlined" fullWidth onClick={onClose}>Cancel</Button>
                </Box>
            </Stack>
        </Drawer>
    );
}