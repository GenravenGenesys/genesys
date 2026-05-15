import React, {Fragment, useState} from 'react';
import {
    Alert,
    Box,
    Button,
    Chip,
    Container,
    IconButton,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';

import {type CampaignEncounter, CampaignEncounterStatus, type InitiativeSlot, type RangeBand as RangeBandType} from "../../../../api/model";
import StopIcon from '@mui/icons-material/Stop';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import StartEncounterView from "./encounter/StartEncounterView.tsx";
import type {CoverType, EncounterLocation} from "../sample/test/TestEncounter.tsx";

interface EncounterRangeBand {
    participantId: string;
    targetId: string;
    range: RangeBandType;
}

interface Props {
    encounter: CampaignEncounter,
    onEnd: () => void
}

export default function EncounterManager(props: Props) {
    const {encounter, onEnd} = props;
    const [round, setRound] = useState(1);
    const [initiativeOrder, setInitiativeOrder] = useState<InitiativeSlot[]>(
        encounter.initiativeOrder ?? []
    );
    const [rangeBands, setRangeBands] = useState<EncounterRangeBand[]>([]);
    const [locations, setLocations] = useState<EncounterLocation[]>([]);
    const [newLocationName, setNewLocationName] = useState("");
    const [newLocationCover, setNewLocationCover] = useState<CoverType>("None");

    const handleAddInitiativeSlot = (slot: InitiativeSlot) => {
        setInitiativeOrder((prev) => {
            const filtered = prev.filter((s) => s.rolledBy !== slot.rolledBy);
            return [...filtered, slot];
        });
    };

    const handleRemoveInitiativeSlot = (index: number) => {
        setInitiativeOrder((prev) => {
            const sorted = [...prev].sort(compareSlots);
            const slotToRemove = sorted[index];
            return prev.filter((s) => s !== slotToRemove);
        });
    };

    const handleUpdateRange = (participantId: string, targetId: string, range: RangeBandType) => {
        setRangeBands((prev) => {
            const existingIndex = prev.findIndex(
                (r) => r.participantId === participantId && r.targetId === targetId
            );
            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = {participantId, targetId, range};
                return updated;
            }
            return [...prev, {participantId, targetId, range}];
        });
    };

    const handleAddLocation = (loc: EncounterLocation) => {
        setLocations((prev) => [...prev, loc]);
    };

    const handleRemoveLocation = (id: string) => {
        setLocations((prev) => prev.filter((l) => l.id !== id));
        setRangeBands((prev) => prev.filter((r) => r.participantId !== id && r.targetId !== id));
    };

    const handleUpdateLocation = (id: string, updates: Partial<EncounterLocation>) => {
        setLocations((prev) => prev.map((l) => l.id === id ? {...l, ...updates} : l));
    };

    const handleAddLocationClick = () => {
        const trimmed = newLocationName.trim();
        if (!trimmed) return;
        handleAddLocation({
            id: `loc-${Date.now()}`,
            name: trimmed,
            cover: newLocationCover,
            occupantIds: [],
        });
        setNewLocationName("");
        setNewLocationCover("None");
    };

    const toggleOccupant = (locationId: string, participantId: string) => {
        const loc = locations.find((l) => l.id === locationId);
        if (!loc) return;
        const already = loc.occupantIds.includes(participantId);
        handleUpdateLocation(locationId, {
            occupantIds: already
                ? loc.occupantIds.filter((id) => id !== participantId)
                : [...loc.occupantIds, participantId],
        });
    };

    const handleStartEncounter = () => {
        // TODO: persist initiativeOrder and transition encounter to Active status
        setRound(1);
    };

    const allParticipants = [
        ...(encounter.party?.players ?? []).map((p) => ({id: p.id, name: p.name, type: 'pc' as const})),
        ...(encounter.party?.adversaryTemplates ?? []).map((n) => ({id: n.id, name: n.name, type: 'npc' as const})),
        ...(encounter.npcIds ?? []).map((n) => ({id: n.id, name: n.name, type: 'npc' as const})),
    ];

    return (
        <Container maxWidth="xl" sx={{py: 4}}>
            <Box sx={{mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h3" gutterBottom align="center" sx={{mb: 2}}>
                    {encounter.name}
                </Typography>
                <Button variant="contained" color="error" startIcon={<StopIcon/>} onClick={() => onEnd()}>End
                    Encounter</Button>
            </Box>

            {encounter.status === CampaignEncounterStatus.Building && (
                <Paper sx={{p: 3}}>
                    <Typography variant="h6" gutterBottom>Map Positions</Typography>
                    <Alert severity="info" sx={{mb: 2}}>
                        Pre-build named positions on the map (e.g. Balcony, Crates). Assign cover and
                        pre-place participants. Range bands to each position will be set in the Setup phase.
                    </Alert>

                    <Box sx={{display: 'flex', gap: 2, mb: 2, alignItems: 'flex-start'}}>
                        <TextField
                            label="Position name"
                            size="small"
                            value={newLocationName}
                            onChange={(e) => setNewLocationName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddLocationClick()}
                            sx={{flex: 1}}
                        />
                        <Select
                            size="small"
                            value={newLocationCover}
                            onChange={(e) => setNewLocationCover(e.target.value as CoverType)}
                            sx={{minWidth: 130}}
                        >
                            <MenuItem value="None">No Cover</MenuItem>
                            <MenuItem value="Soft">Soft Cover</MenuItem>
                            <MenuItem value="Hard">Hard Cover</MenuItem>
                        </Select>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon/>}
                            onClick={handleAddLocationClick}
                            disabled={!newLocationName.trim()}
                        >
                            Add
                        </Button>
                    </Box>

                    {locations.length === 0 ? (
                        <Alert severity="info">No positions added yet.</Alert>
                    ) : (
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                            {locations.map((loc) => (
                                <Box key={loc.id} sx={{p: 2, border: 1, borderColor: 'grey.300', borderRadius: 1}}>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                            <Typography variant="body1" fontWeight="bold">📍 {loc.name}</Typography>
                                            <Select
                                                size="small"
                                                value={loc.cover}
                                                onChange={(e) => handleUpdateLocation(loc.id, {cover: e.target.value as CoverType})}
                                                sx={{minWidth: 130}}
                                            >
                                                <MenuItem value="None">No Cover</MenuItem>
                                                <MenuItem value="Soft">🛡 Soft Cover</MenuItem>
                                                <MenuItem value="Hard">🛡 Hard Cover</MenuItem>
                                            </Select>
                                        </Box>
                                        <IconButton size="small" color="error" onClick={() => handleRemoveLocation(loc.id)}>
                                            <DeleteIcon fontSize="small"/>
                                        </IconButton>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary" sx={{mb: 0.5, display: 'block'}}>
                                        Occupants (click to toggle):
                                    </Typography>
                                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                                        {allParticipants.map((p) => {
                                            const inCover = loc.occupantIds.includes(p.id);
                                            return (
                                                <Chip
                                                    key={p.id}
                                                    label={p.name}
                                                    color={inCover ? (p.type === 'pc' ? 'primary' : 'error') : 'default'}
                                                    variant={inCover ? 'filled' : 'outlined'}
                                                    size="small"
                                                    onClick={() => toggleOccupant(loc.id, p.id)}
                                                    sx={{cursor: 'pointer'}}
                                                />
                                            );
                                        })}
                                        {allParticipants.length === 0 && (
                                            <Typography variant="caption" color="text.secondary">
                                                Add participants to the encounter first.
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Paper>
            )}

            {encounter.status === CampaignEncounterStatus.Ready && (
                <StartEncounterView
                    encounter={encounter}
                    initiativeOrder={initiativeOrder}
                    rangeBands={rangeBands}
                    locations={locations}
                    onAddInitiativeSlot={handleAddInitiativeSlot}
                    onRemoveInitiativeSlot={handleRemoveInitiativeSlot}
                    onUpdateRange={handleUpdateRange}
                    onStartEncounter={handleStartEncounter}
                />
            )}

            {encounter.status === CampaignEncounterStatus.Active && (
                <Fragment/>
            )}

            {encounter.status === CampaignEncounterStatus.Resolved && (
                <Paper sx={{p: 4, textAlign: 'center'}}>
                    <Typography variant="h4" gutterBottom>
                        Encounter Complete!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{mb: 3}}>
                        {encounter.name} has ended after {round} rounds.
                    </Typography>
                </Paper>
            )}

        </Container>
    );
}

function compareSlots(a: InitiativeSlot, b: InitiativeSlot): number {
    const aSuccess = (a.results?.success ?? 0) + (a.results?.triumph ?? 0)
        - (a.results?.failure ?? 0) - (a.results?.despair ?? 0);
    const bSuccess = (b.results?.success ?? 0) + (b.results?.triumph ?? 0)
        - (b.results?.failure ?? 0) - (b.results?.despair ?? 0);
    if (bSuccess !== aSuccess) return bSuccess - aSuccess;
    const aAdv = (a.results?.advantage ?? 0) - (a.results?.threat ?? 0);
    const bAdv = (b.results?.advantage ?? 0) - (b.results?.threat ?? 0);
    return bAdv - aAdv;
}
