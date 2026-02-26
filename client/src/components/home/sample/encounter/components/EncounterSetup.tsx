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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CasinoIcon from "@mui/icons-material/Casino";
import {DiceRoller} from "./DiceRoller";
import type {EncounterState, InitiativeSlot, Participant} from "../SampleEncounterManager.tsx";

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
    onStartEncounter: () => void;
}

export const EncounterSetup: React.FC<EncounterSetupProps> = ({
                                                                  encounter,
                                                                  availablePlayers,
                                                                  availableNPCs,
                                                                  onAddParticipant,
                                                                  onRemoveParticipant,
                                                                  onAddInitiativeSlot,
                                                                  onRemoveInitiativeSlot,
                                                                  onStartEncounter,
                                                              }) => {
    const [selectedTab, setSelectedTab] = useState<"pcs" | "npcs">("pcs");
    const [rollerOpen, setRollerOpen] = useState(false);
    const [rollingFor, setRollingFor] = useState<Participant | null>(null);

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

    const participantHasSlot = (participantId: string) => {
        return encounter.initiativeSlots.some(
            (slot) => slot.rolledBy === participantId
        );
    };

    const canStart =
        encounter.participants.length >= 2 &&
        encounter.initiativeSlots.length === encounter.participants.length;

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

            <Paper sx={{p: 3, mt: 3, textAlign: "center"}}>
                {!canStart && (
                    <Alert severity="warning" sx={{mb: 2}}>
                        {encounter.participants.length < 2
                            ? "Add at least 2 participants to start"
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
