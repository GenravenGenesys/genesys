import React, { useState } from 'react';
import {
    Box, Typography, Grid2 as Grid, Button, ToggleButton,
    ToggleButtonGroup, Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Components
import DetailedNpcCard from './DetailedNpcCard.tsx';
import AdversaryEditDrawer from './AdversaryEditDrawer.tsx';

// 1. Define the base template for new NPCs
const BLANK_NPC = {
    name: "",
    type: "MINION",
    isNew: true,
    ratings: { combat: 1, social: 1, general: 1 },
    characteristics: { BR: 2, AG: 2, INT: 2, CUN: 2, WIL: 2, PR: 2 },
    derived: { soak: 2, wounds: 5, strain: 0 },
    skills: []
};

export default function AdversaryCompendium() {
    const [viewType, setViewType] = useState('ALL');

    // 2. Manage the drawer state
    const [editingNpc, setEditingNpc] = useState<any>(null);

    // Mock data (State managed locally for the demo)
    const [npcList, setNpcList] = useState([
        {
            id: "1", name: "Street Toughs", type: "MINION",
            ratings: { combat: 1, social: 1, general: 1 },
            characteristics: { BR: 3, AG: 2, INT: 2, CUN: 2, WIL: 1, PR: 1 },
            derived: { soak: 3, wounds: 5, strain: 0 }, skills: ["Brawl"]
        },
        {
            id: "2", name: "The Cyber-Butcher", type: "NEMESIS",
            ratings: { combat: 5, social: 1, general: 4 },
            characteristics: { BR: 5, AG: 4, INT: 2, CUN: 4, WIL: 3, PR: 2 },
            derived: { soak: 6, wounds: 20, strain: 14 }, skills: ["Melee 3"]
        },
    ]);

    const handleOpenCreate = () => setEditingNpc({ ...BLANK_NPC });

    const handleOpenEdit = (npc: any) => setEditingNpc({ ...npc });

    const handleSave = (updatedNpc: any) => {
        if (updatedNpc.isNew) {
            // Create Logic: Assign ID and add to list
            const newEntry = { ...updatedNpc, id: Date.now().toString(), isNew: false };
            setNpcList(prev => [...prev, newEntry]);
        } else {
            // Update Logic: Replace item in list
            setNpcList(prev => prev.map(n => n.id === updatedNpc.id ? updatedNpc : n));
        }
        setEditingNpc(null); // Close drawer
    };

    return (
        <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>

            {/* HEADER SECTION */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                <Box>
                    <Typography variant="h3" fontWeight="900">Adversary Library</Typography>
                    <Typography color="text.secondary">Manage the threats of your campaign setting.</Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreate} // TRIGGER NEW NPC
                >
                    New NPC
                </Button>
            </Box>

            {/* FILTERING TABS */}
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

            {/* NPC GRID */}
            <Grid container spacing={3}>
                {npcList.filter(n => viewType === 'ALL' || n.type === viewType).map((npc) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={npc.id}>
                        <DetailedNpcCard
                            npc={npc}
                            onEdit={() => handleOpenEdit(npc)} // TRIGGER EDIT
                        />
                    </Grid>
                ))}
            </Grid>

            {/* GLOBAL ADVERSARY DRAWER */}
            <AdversaryEditDrawer
                open={Boolean(editingNpc)}
                item={editingNpc}
                onClose={() => setEditingNpc(null)}
                onSave={handleSave}
            />
        </Box>
    );
}