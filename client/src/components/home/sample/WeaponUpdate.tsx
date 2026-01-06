import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Drawer, TextField, Stack,
    Button, MenuItem, Grid2 as Grid, Divider, InputAdornment
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

export default function EquipmentEditDrawer({ open, item, onClose, onSave }) {
    // Local state initialized with the weapon's current stats
    const [formData, setFormData] = useState(item || {});
    const isNew = item?.isNew;

    useEffect(() => {
        if (item) setFormData(item);
    }, [item]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{ sx: { width: { xs: '100%', sm: 450 }, p: 3, bgcolor: '#0a1929' } }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">
                    {isNew ? "Create New Weapon" : "Edit Weapon"}
                </Typography>
                <Button onClick={onClose}><CloseIcon /></Button>
            </Box>

            <Stack spacing={3}>
                <TextField
                    label="Weapon Name"
                    fullWidth
                    value={formData.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                />

                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="Damage"
                            fullWidth
                            value={formData.damage || ''}
                            onChange={(e) => handleChange('damage', e.target.value)}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Critical"
                            fullWidth
                            value={formData.crit || ''}
                            onChange={(e) => handleChange('crit', e.target.value)}
                        />
                    </Grid>
                </Grid>

                <TextField
                    select
                    label="Range"
                    fullWidth
                    value={formData.range || 'Engaged'}
                    onChange={(e) => handleChange('range', e.target.value)}
                >
                    {['Engaged', 'Short', 'Medium', 'Long', 'Extreme'].map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </TextField>

                <Divider>System Stats</Divider>

                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="Encumbrance"
                            type="number"
                            fullWidth
                            value={formData.encumbrance || 0}
                            onChange={(e) => handleChange('encumbrance', e.target.value)}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Hard Points"
                            type="number"
                            fullWidth
                            value={formData.hp || 0}
                            onChange={(e) => handleChange('hp', e.target.value)}
                        />
                    </Grid>
                </Grid>

                <TextField
                    label="Special Qualities"
                    placeholder="e.g. Accurate 1, Vicious 2"
                    helperText="Comma separated values"
                    fullWidth
                    multiline
                    rows={2}
                    value={Array.isArray(formData.qualities) ? formData.qualities.join(', ') : ''}
                    onChange={(e) => handleChange('qualities', e.target.value.split(', '))}
                />

                <Box sx={{ mt: 'auto', pt: 4, display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<SaveIcon />}
                        onClick={() => onSave(formData)}
                    >
                        Save Changes
                    </Button>
                    <Button variant="outlined" fullWidth onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Stack>
        </Drawer>
    );
}