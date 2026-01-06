import React, { useState } from 'react';
import {
    Box, Typography, Grid2 as Grid, Card, CardContent,
    TextField, InputAdornment, Chip, Button, Divider,
    Stack, Tooltip, IconButton
} from '@mui/material';

// Icons for range bands and weapon types
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security'; // Soak/Defense
import FlareIcon from '@mui/icons-material/Flare'; // Damage
import RadarIcon from '@mui/icons-material/Radar'; // Range
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // Encumbrance
import AddIcon from '@mui/icons-material/Add';
import EquipmentEditDrawer from "./WeaponUpdate.tsx";

const EquipmentCard = ({ item, onEditClick }) => (
    <Card sx={{
        height: '100%',
        background: 'rgba(10, 25, 41, 0.7)',
        border: '1px solid rgba(255,255,255,0.1)',
        transition: '0.3s',
        '&:hover': { borderColor: 'primary.main', transform: 'scale(1.02)' }
    }}>
        <CardContent>
            {/* Header: Name and Type */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                <Chip label={item.type} size="small" variant="outlined" color="primary" />
            </Box>

            {/* Primary Stats: Damage / Crit / Range */}
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Tooltip title="Damage">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <FlareIcon fontSize="small" color="secondary" />
                        <Typography variant="body2" fontWeight="bold">{item.damage}</Typography>
                    </Box>
                </Tooltip>
                <Tooltip title="Critical Rating">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="body2" color="error.main" fontWeight="bold">Crit {item.crit}</Typography>
                    </Box>
                </Tooltip>
                <Tooltip title="Range Band">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <RadarIcon fontSize="small" />
                        <Typography variant="caption">{item.range}</Typography>
                    </Box>
                </Tooltip>
            </Stack>

            <Divider sx={{ my: 1.5, opacity: 0.1 }} />

            {/* Qualities / Special Traits */}
            <Box sx={{ mb: 2, minHeight: 40 }}>
                {item.qualities.map(q => (
                    <Chip key={q} label={q} size="small" sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }} />
                ))}
            </Box>

            {/* Footer Stats: Encumbrance / HP */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <FitnessCenterIcon fontSize="inherit" sx={{ opacity: 0.6 }} />
                        <Typography variant="caption">{item.encumbrance}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ opacity: 0.6 }}>HP: {item.hp}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={onEditClick} // Trigger the edit drawer
                    >
                        Edit Weapon
                    </Button>
                </Box>
            </Box>
        </CardContent>
    </Card>
);

export default function EquipmentListView() {
    const [search, setSearch] = useState("");
    const [editingItem, setEditingItem] = useState(null);

    const [equipment, setEquipment] = useState([
        { id: '1', name: "Heavy Blaster Pistol", type: "Ranged", damage: "7", crit: "3", range: "Medium", encumbrance: 1, hp: 3, qualities: ["Stun Setting"] },
        { id: '2', name: "Monofilament Blade", type: "Melee", damage: "+2", crit: "2", range: "Engaged", encumbrance: 1, hp: 2, qualities: ["Pierce 2"] },
    ]);

    const BLANK_WEAPON = {
        name: "",
        type: "Ranged", // Default type
        damage: "0",
        crit: "0",
        range: "Engaged",
        encumbrance: 0,
        hp: 0,
        qualities: []
    };

    const handleOpenCreate = () => {
        setEditingItem({ ...BLANK_WEAPON, isNew: true }); // Tag as new for the backend
    };

    const handleOpenEdit = (item) => {
        setEditingItem(item); // Open the drawer with this item's data
    };

    const handleSave = async (itemData) => {
        if (itemData.isNew) {
            // 1. CREATE Logic (POST)
            // Remove the 'isNew' flag before sending to Java
            const { isNew, ...newItem } = itemData;

            // Optimistic UI update: generate a temp ID
            const tempItem = { ...newItem, id: Date.now().toString() };
            setEquipment(prev => [...prev, tempItem]);

            // Backend Call: await fetch('/api/equipment', { method: 'POST', body: newItem });
        } else {
            // 2. UPDATE Logic (PATCH)
            setEquipment(prev => prev.map(i => i.id === itemData.id ? itemData : i));

            // Backend Call: await fetch(`/api/equipment/${itemData.id}`, { method: 'PATCH', body: itemData });
        }

        setEditingItem(null);
    };

    return (
        <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h4" fontWeight="900">Equipment Library</Typography>
                {/* 1. Hook up the New Item button */}
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreate}
                >
                    New Item
                </Button>
            </Box>

            <TextField
                fullWidth
                placeholder="Search weapons, gear, and armor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 4 }}
                InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
            />

            <Grid container spacing={3}>
                {equipment.map(item => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                        <EquipmentCard
                            item={item}
                            onEditClick={() => handleOpenEdit(item)}
                        />
                    </Grid>
                ))}
            </Grid>
            <EquipmentEditDrawer
                open={Boolean(editingItem)}
                item={editingItem}
                onClose={() => setEditingItem(null)}
                onSave={handleSave}
            />
        </Box>
    );
}