import {type CampaignEncounter, InitiativeSlotType} from "../../../../api/model";
import {
    Alert,
    Box,
    Button,
    Chip,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import {useState} from "react";
import Tab from "@mui/material/Tab";
import EncounterPartyTab from "./EncounterPartyTab.tsx";
import EncounterNPCTab from "./EncounterNPCTab.tsx";
import type {CoverType, EncounterLocation} from "./TestEncounter.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface Props {
    encounter: CampaignEncounter;
    numberOfParticipants: number;
    onRemovePartyMember: (id: string) => void;
    onRemovePartyNPC: (id: string) => void;
    onRemoveNPC: (id: string) => void;
    onReadyEncounter: () => void;
    locations: EncounterLocation[];
    onAddLocation: (loc: EncounterLocation) => void;
    onRemoveLocation: (id: string) => void;
    onUpdateLocation: (id: string, updates: Partial<EncounterLocation>) => void;
}

export default function TestEncounterBuilder(props: Props) {
    const {
        encounter,
        numberOfParticipants,
        onRemovePartyMember,
        onRemovePartyNPC,
        onRemoveNPC,
        onReadyEncounter,
        locations,
        onAddLocation,
        onRemoveLocation,
        onUpdateLocation,
    } = props;
    const [tabValue, setTabValue] = useState(0);
    const [newLocationName, setNewLocationName] = useState("");
    const [newLocationCover, setNewLocationCover] = useState<CoverType>("None");

    const allParticipants = [
        ...(encounter.party?.players ?? []).map((p) => ({id: p.id, name: p.name, type: "pc" as const})),
        ...(encounter.party?.adversaryTemplates ?? []).map((n) => ({id: n.id, name: n.name, type: "npc" as const})),
        ...(encounter.npcIds ?? []).map((n) => ({id: n.id, name: n.name, type: "npc" as const})),
    ];

    const handleAddLocationClick = () => {
        const trimmed = newLocationName.trim();
        if (!trimmed) return;
        onAddLocation({
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
        onUpdateLocation(locationId, {
            occupantIds: already
                ? loc.occupantIds.filter((id) => id !== participantId)
                : [...loc.occupantIds, participantId],
        });
    };

    return (
        <Box sx={{width: "100%"}}>
            <Paper sx={{width: "100%", p: 2}}>
                <Typography variant="h6" gutterBottom>
                    Participants ({numberOfParticipants})
                </Typography>

                {numberOfParticipants === 0 ? (
                    <Alert severity="info">
                        Add participants from the sections below
                    </Alert>
                ) : (
                    <Box sx={{width: "100%"}}>
                        <Box sx={{borderBottom: 1, borderColor: "divider", width: "100%"}}>
                            <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} color="primary" centered>
                                {Object.values(InitiativeSlotType).map((type) => (
                                    <Tab key={type} label={type}/>
                                ))}
                            </Tabs>
                        </Box>
                        {tabValue === 0 &&
                            <EncounterPartyTab party={encounter.party} onRemovePartyMember={onRemovePartyMember}
                                               onRemovePartyNPC={onRemovePartyNPC}/>}
                        {tabValue === 1 &&
                            <EncounterNPCTab adversaries={encounter.npcIds} onRemoveNPC={onRemoveNPC}/>}
                    </Box>
                )}
            </Paper>

            <Paper sx={{width: "100%", p: 2, mt: 2}}>
                <Typography variant="h6" gutterBottom>
                    Map Positions
                </Typography>
                <Alert severity="info" sx={{mb: 2}}>
                    Pre-build named positions on the map (e.g. Balcony, Crates). Assign cover and pre-place
                    participants. Range bands to each position will be set during the setup phase.
                </Alert>

                <Box sx={{display: "flex", gap: 2, mb: 2, alignItems: "flex-start"}}>
                    <TextField
                        label="Position name"
                        size="small"
                        value={newLocationName}
                        onChange={(e) => setNewLocationName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddLocationClick()}
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
                    <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                        {locations.map((loc) => (
                            <Box key={loc.id} sx={{p: 2, border: 1, borderColor: "grey.300", borderRadius: 1}}>
                                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1}}>
                                    <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                        <Typography variant="body1" fontWeight="bold">📍 {loc.name}</Typography>
                                        <Select
                                            size="small"
                                            value={loc.cover}
                                            onChange={(e) => onUpdateLocation(loc.id, {cover: e.target.value as CoverType})}
                                            sx={{minWidth: 130}}
                                        >
                                            <MenuItem value="None">No Cover</MenuItem>
                                            <MenuItem value="Soft">🛡 Soft Cover</MenuItem>
                                            <MenuItem value="Hard">🛡 Hard Cover</MenuItem>
                                        </Select>
                                    </Box>
                                    <IconButton size="small" color="error" onClick={() => onRemoveLocation(loc.id)}>
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </Box>
                                <Typography variant="caption" color="text.secondary" sx={{mb: 0.5, display: "block"}}>
                                    Occupants (click to toggle):
                                </Typography>
                                <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                                    {allParticipants.map((p) => {
                                        const inCover = loc.occupantIds.includes(p.id);
                                        return (
                                            <Chip
                                                key={p.id}
                                                label={p.name}
                                                color={inCover ? (p.type === "pc" ? "primary" : "error") : "default"}
                                                variant={inCover ? "filled" : "outlined"}
                                                size="small"
                                                onClick={() => toggleOccupant(loc.id, p.id)}
                                                sx={{cursor: "pointer"}}
                                            />
                                        );
                                    })}
                                    {allParticipants.length === 0 && (
                                        <Typography variant="caption" color="text.secondary">
                                            Add participants to assign them to positions.
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </Paper>

            <Box sx={{mt: 2}}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={onReadyEncounter}
                    disabled={numberOfParticipants === 0}
                >
                    Proceed to Setup
                </Button>
            </Box>
        </Box>
    );
}
