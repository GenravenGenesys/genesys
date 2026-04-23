import React, {useState} from "react";
import {
    Box,
    Paper,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    IconButton,
    Chip,
    ToggleButtonGroup,
    ToggleButton,
    Alert,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CasinoIcon from "@mui/icons-material/Casino";
import {DiceRoller} from "./DiceRoller";
import type {CoverType, EncounterLocation, EncounterState, InitiativeSlot, Participant, RangeBand, RangeType} from "../SampleEncounterManager.tsx";
import {SampleRangeBandMatrix} from "./RangeTracker.tsx";

interface EncounterSetupProps {
    encounter: EncounterState;
    availablePlayers: Participant[];
    availableNPCs: Participant[];
    onAddParticipant: (participant: Participant) => void;
    onRemoveParticipant: (participantId: string) => void;
    onAddInitiativeSlot: (
        slot: Omit<InitiativeSlot, "id" | "assignedParticipantId">
    ) => void;
    onRemoveInitiativeSlot: (slotId: string) => void;
    onUpdateRange: (participantId: string, targetId: string, range: RangeType) => void;
    onStartEncounter: () => void;
    locations: EncounterLocation[];
    onAddLocation: (loc: EncounterLocation) => void;
    onRemoveLocation: (id: string) => void;
    onUpdateLocation: (id: string, updates: Partial<EncounterLocation>) => void;
}

export const EncounterSetup: React.FC<EncounterSetupProps> = ({
                                                                  encounter,
                                                                  availablePlayers,
                                                                  availableNPCs,
                                                                  onAddParticipant,
                                                                  onRemoveParticipant,
                                                                  onAddInitiativeSlot,
                                                                  onRemoveInitiativeSlot,
                                                                  onUpdateRange,
                                                                  onStartEncounter,
                                                                  locations,
                                                                  onAddLocation,
                                                                  onRemoveLocation,
                                                                  onUpdateLocation,
                                                              }) => {
    const [selectedTab, setSelectedTab] = useState<"pcs" | "npcs">("pcs");
    const [rollerOpen, setRollerOpen] = useState(false);
    const [rollingFor, setRollingFor] = useState<Participant | null>(null);
    const [newLocationName, setNewLocationName] = useState("");
    const [newLocationCover, setNewLocationCover] = useState<CoverType>("None");

    const handleAddPlayer = (player: Participant) => {
        const newParticipant: Participant = {
            ...player,
            id: `${player.id}-${Date.now()}`,
            statusEffects: [],
        };
        onAddParticipant(newParticipant);
    };

    const handleAddNPC = (npc: Participant) => {
        const newParticipant: Participant = {
            ...npc,
            id: `${npc.id}-${Date.now()}`,
            statusEffects: [],
        };
        onAddParticipant(newParticipant);
    };

    const handleRollInitiative = (participant: Participant) => {
        setRollingFor(participant);
        setRollerOpen(true);
    };

    const handleInitiativeRolled = (result: {
        success: number;
        advantage: number;
    }) => {
        if (rollingFor) {
            onAddInitiativeSlot({
                slotType: rollingFor.type,
                success: result.success,
                advantage: result.advantage,
                rolledBy: rollingFor.id,
            });
        }
        setRollerOpen(false);
        setRollingFor(null);
    };

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

    const participantHasSlot = (participantId: string) => {
        return encounter.initiativeSlots.some(
            (slot) => slot.rolledBy === participantId
        );
    };

    const pcParticipants = encounter.participants.filter((p) => p.type === "pc");
    const npcParticipants = encounter.participants.filter((p) => p.type === "npc");

    const pcNpcAllSet =
        pcParticipants.length > 0 &&
        npcParticipants.length > 0 &&
        pcParticipants.every((pc) =>
            npcParticipants.every((npc) =>
                encounter.rangeBands.some(
                    (r) =>
                        (r.participantId === pc.id && r.targetId === npc.id) ||
                        (r.participantId === npc.id && r.targetId === pc.id)
                )
            )
        );

    const pcPcAllSet =
        pcParticipants.length < 2 ||
        pcParticipants.every((pc1, i) =>
            pcParticipants.slice(i + 1).every((pc2) =>
                encounter.rangeBands.some(
                    (r) =>
                        (r.participantId === pc1.id && r.targetId === pc2.id) ||
                        (r.participantId === pc2.id && r.targetId === pc1.id)
                )
            )
        );

    const pcLocationAllSet =
        locations.length === 0 ||
        pcParticipants.every((pc) =>
            locations.every((loc) =>
                encounter.rangeBands.some(
                    (r) =>
                        (r.participantId === pc.id && r.targetId === loc.id) ||
                        (r.participantId === loc.id && r.targetId === pc.id)
                )
            )
        );

    const allRangeBandsSet = pcNpcAllSet && pcPcAllSet && pcLocationAllSet;

    const canStart =
        encounter.participants.length >= 2 &&
        encounter.initiativeSlots.length === encounter.participants.length &&
        allRangeBandsSet;

    const pcSlots = encounter.initiativeSlots.filter((s) => s.slotType === "pc");
    const npcSlots = encounter.initiativeSlots.filter(
        (s) => s.slotType === "npc"
    );

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid size={{xs: 12, md: 5}} sx={{mt: 4}}>
                    <Paper sx={{p: 3}}>
                        <Typography variant="h6" gutterBottom>
                            Initiative Order
                        </Typography>

                        <Alert severity="info" sx={{mb: 2}}>
                            Each participant rolls initiative once to create a slot. During
                            the encounter, players can choose which PC acts in PC slots, and
                            GM chooses for NPC slots.
                        </Alert>

                        {encounter.initiativeSlots.length === 0 ? (
                            <Alert severity="warning">
                                No initiative rolled yet. Add participants and roll for each.
                            </Alert>
                        ) : (
                            <List>
                                {encounter.initiativeSlots.map((slot, index) => {
                                    const rolledByParticipant = encounter.participants.find(
                                        (p) => p.id === slot.rolledBy
                                    );

                                    return (
                                        <ListItem
                                            key={slot.id}
                                            sx={{
                                                border: 2,
                                                borderColor:
                                                    slot.slotType === "pc"
                                                        ? "primary.main"
                                                        : "error.main",
                                                backgroundColor:
                                                    slot.slotType === "pc"
                                                        ? "primary.light"
                                                        : "error.light",
                                                borderRadius: 1,
                                                mb: 1,
                                            }}
                                        >
                                            <Box sx={{mr: 2, textAlign: "center", minWidth: 40}}>
                                                <Typography variant="h6" fontWeight="bold">
                                                    #{index + 1}
                                                </Typography>
                                            </Box>

                                            <ListItemText
                                                primary={
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 1,
                                                        }}
                                                    >
                                                        <Chip
                                                            label={slot.slotType.toUpperCase()}
                                                            size="small"
                                                            color={
                                                                slot.slotType === "pc" ? "primary" : "error"
                                                            }
                                                            sx={{fontWeight: "bold"}}
                                                        />
                                                        <Typography variant="body2">
                                                            Rolled by: {rolledByParticipant?.name}
                                                        </Typography>
                                                    </Box>
                                                }
                                                secondary={
                                                    <Typography variant="h6" component="span">
                                                        {slot.success} Success, {slot.advantage} Advantage
                                                    </Typography>
                                                }
                                            />

                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    edge="end"
                                                    color="error"
                                                    onClick={() => onRemoveInitiativeSlot(slot.id)}
                                                >
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        )}

                        <Box
                            sx={{mt: 2, p: 2, backgroundColor: "grey.25", borderRadius: 1}}
                        >
                            <Typography variant="body2" color="text.secondary">
                                <strong>Summary:</strong>
                                <br/>
                                PC Slots: {pcSlots.length}
                                <br/>
                                NPC Slots: {npcSlots.length}
                                <br/>
                                Total: {encounter.initiativeSlots.length}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{xs: 12, md: 7}} sx={{mt: 4}}>
                    <Paper sx={{p: 3, mb: 3}}>
                        <Typography variant="h6" gutterBottom>
                            Participants ({encounter.participants.length})
                        </Typography>

                        {encounter.participants.length === 0 ? (
                            <Alert severity="info">
                                Add participants from the sections below
                            </Alert>
                        ) : (
                            <Grid container spacing={2}>
                                {encounter.participants.map((participant) => {
                                    const hasSlot = participantHasSlot(participant.id);

                                    return (
                                        <Grid size={{xs: 12}} sx={{mt: 4}}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Box>
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: 1,
                                                                    mb: 1,
                                                                }}
                                                            >
                                                                <Typography variant="h6">
                                                                    {participant.name}
                                                                </Typography>
                                                                <Chip
                                                                    label={
                                                                        participant.type === "pc" ? "Player" : "NPC"
                                                                    }
                                                                    size="small"
                                                                    color={
                                                                        participant.type === "pc"
                                                                            ? "primary"
                                                                            : "default"
                                                                    }
                                                                />
                                                                {hasSlot && (
                                                                    <Chip
                                                                        label="Initiative Rolled"
                                                                        size="small"
                                                                        color="success"
                                                                        icon={<CasinoIcon/>}
                                                                    />
                                                                )}
                                                            </Box>

                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                Wounds: {participant.wounds.threshold} | Strain:{" "}
                                                                {participant.strain.threshold}
                                                            </Typography>
                                                        </Box>

                                                        <Box sx={{display: "flex", gap: 1}}>
                                                            <Button
                                                                variant="contained"
                                                                size="small"
                                                                startIcon={<CasinoIcon/>}
                                                                onClick={() =>
                                                                    handleRollInitiative(participant)
                                                                }
                                                                disabled={hasSlot}
                                                            >
                                                                {hasSlot ? "Rolled" : "Roll"}
                                                            </Button>

                                                            <IconButton
                                                                size="small"
                                                                color="error"
                                                                onClick={() =>
                                                                    onRemoveParticipant(participant.id)
                                                                }
                                                            >
                                                                <DeleteIcon/>
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        )}
                    </Paper>

                    <Paper sx={{p: 3}}>
                        <Typography variant="h6" gutterBottom>
                            Add Participants
                        </Typography>

                        <ToggleButtonGroup
                            fullWidth
                            exclusive
                            value={selectedTab}
                            onChange={(_, value) => value && setSelectedTab(value)}
                            sx={{mb: 2}}
                        >
                            <ToggleButton value="pcs">Player Characters</ToggleButton>
                            <ToggleButton value="npcs">NPCs / Adversaries</ToggleButton>
                        </ToggleButtonGroup>

                        <Grid container spacing={2}>
                            {selectedTab === "pcs" &&
                                availablePlayers.map((player) => (
                                    <Grid size={{xs: 12, sm: 6}} sx={{mt: 4}}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    {player.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                                                    Wounds: {player.wounds.threshold} | Strain:{" "}
                                                    {player.strain.threshold}
                                                </Typography>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    startIcon={<AddIcon/>}
                                                    onClick={() => handleAddPlayer(player)}
                                                >
                                                    Add to Encounter
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}

                            {selectedTab === "npcs" &&
                                availableNPCs.map((npc) => (
                                    <Grid size={{xs: 12, sm: 6}} sx={{mt: 4}}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    {npc.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                                                    Wounds: {npc.wounds.threshold} | Soak: {npc.soak || 0}
                                                </Typography>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    startIcon={<AddIcon/>}
                                                    onClick={() => handleAddNPC(npc)}
                                                >
                                                    Add to Encounter
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <Paper sx={{p: 3, mt: 3}}>
                <Typography variant="h6" gutterBottom>
                    Map Positions
                </Typography>
                <Alert severity="info" sx={{mb: 2}}>
                    Pre-build named positions (e.g. Balcony, Crates). PCs and NPCs can be assigned to cover
                    positions, and range bands must be set from each PC to each position before starting.
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
                        sx={{minWidth: 120}}
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
                    <Alert severity="info">No map positions added yet.</Alert>
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
                                            sx={{minWidth: 120}}
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
                                    {encounter.participants.map((p) => {
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
                                    {encounter.participants.length === 0 && (
                                        <Typography variant="caption" color="text.secondary">
                                            Add participants first.
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </Paper>

            <Paper sx={{p: 3, mt: 3}}>
                <Typography variant="h6" gutterBottom>
                    Range Bands
                </Typography>
                <Alert severity={allRangeBandsSet ? "success" : "warning"} sx={{mb: 2}}>
                    {allRangeBandsSet
                        ? "All range bands set. Ready to start."
                        : "Set a range band for every PC–NPC pair, PC–PC pair, and PC–location pair before starting."}
                </Alert>
                <SampleRangeBandMatrix
                    pcParticipants={encounter.participants.filter((p) => p.type === "pc")}
                    npcParticipants={encounter.participants.filter((p) => p.type === "npc")}
                    locations={locations}
                    rangeBands={encounter.rangeBands}
                    onUpdateRange={onUpdateRange}
                />
            </Paper>

            <Paper sx={{p: 3, mt: 3, textAlign: "center"}}>
                {!canStart && (
                    <Alert severity="warning" sx={{mb: 2}}>
                        {encounter.participants.length < 2
                            ? "Add at least 2 participants to start"
                            : !allRangeBandsSet
                                ? "Set all range bands before starting"
                                : "All participants must roll initiative before starting"}
                    </Alert>
                )}

                <Button
                    variant="contained"
                    size="large"
                    onClick={onStartEncounter}
                    disabled={!canStart}
                >
                    Start Encounter
                </Button>
            </Paper>

            {rollerOpen && rollingFor && (
                <DiceRoller
                    open={rollerOpen}
                    participantName={rollingFor.name}
                    rollType="initiative"
                    onClose={() => setRollerOpen(false)}
                    onRollComplete={handleInitiativeRolled}
                />
            )}
        </Box>
    );
};
