import { useState } from 'react';
import {
    Box, Typography, Paper, TextField, InputAdornment,
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Collapse, IconButton, Chip, Stack, Button
} from '@mui/material';

// Standard MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import BoltIcon from '@mui/icons-material/Bolt'; // Active
import VisibilityIcon from '@mui/icons-material/Visibility'; // Passive

// 1. Talent Row Component with Detail Collapse
function TalentRow({ talent }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }} onClick={() => setOpen(!open)}>
                <TableCell width="40">
                    <IconButton size="small">
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Typography fontWeight="bold">{talent.name}</Typography>
                </TableCell>
                <TableCell align="center">
                    <Chip label={`Tier ${talent.tier}`} size="small" variant="outlined" color="primary" />
                </TableCell>
                <TableCell align="center">
                    <Chip
                        icon={talent.activation === 'Active' ? <BoltIcon fontSize="small"/> : <VisibilityIcon fontSize="small"/>}
                        label={talent.activation}
                        size="small"
                    />
                </TableCell>
                <TableCell align="center">
                    {talent.isRanked ? <Chip label="Ranked" size="small" color="secondary" /> : "-"}
                </TableCell>
            </TableRow>

            {/* 2. Expanded Detail Panel */}
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2, p: 2, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2 }}>
                            <Typography variant="subtitle2" color="primary" gutterBottom>Full Description</Typography>
                            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                                {talent.description || "No description provided for this custom talent."}
                            </Typography>
                            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                <Button size="small" variant="text">Edit Talent</Button>
                                <Button size="small" variant="text" color="error">Remove from Campaign</Button>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default function ViewCompendiumSkills() {
    const [search, setSearch] = useState("");

    const filteredTalents = talents.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>

            {/* Page Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h4" fontWeight="900">Talent Compendium</Typography>
                <Button variant="contained" startIcon={<AddIcon />}>New Talent</Button>
            </Box>

            {/* 3. Search & Filter Bar */}
            <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search talents by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Stack direction="row" spacing={1}>
                    <Chip label="All Tiers" onClick={() => {}} color="primary" />
                    <Chip label="Ranked Only" onClick={() => {}} variant="outlined" />
                </Stack>
            </Paper>

            {/* 4. The Talent Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
                <Table aria-label="talent table">
                    <TableHead sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}>
                        <TableRow>
                            <TableCell width="40" />
                            <TableCell><Typography variant="subtitle2" fontWeight="bold">Name</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle2" fontWeight="bold">Tier</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle2" fontWeight="bold">Activation</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle2" fontWeight="bold">Type</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTalents.map((talent) => (
                            <TalentRow key={talent.id} talent={talent} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}