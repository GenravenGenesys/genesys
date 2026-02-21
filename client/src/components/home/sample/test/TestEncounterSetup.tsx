import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    IconButton, List, ListItem, ListItemSecondaryAction, ListItemText,
    Paper, ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import React, {useState} from "react";
import {type CampaignEncounter, InitiativeSlotType} from "../../../../api/model";
import {DiceRoller} from "../encounter/components/DiceRoller.tsx";

interface Props {
    encounter: CampaignEncounter;
    numberOfParticipants: number;
}

export default function TestEncounterSetup(props: Props) {
    const {encounter, numberOfParticipants} = props;
    const [selectedTab, setSelectedTab] = useState<"pcs" | "npcs">("pcs");

    const canStart = encounter.initiativeOrder.length === numberOfParticipants;

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

                        {encounter.initiativeOrder.length === 0 ? (
                            <Alert severity="warning">
                                No initiative rolled yet. Add participants and roll for each.
                            </Alert>
                        ) : (
                            <List>
                                {encounter.initiativeOrder.map((slot, index) => {


                                    const rolledByParticipant = slot.type === InitiativeSlotType.Player ? encounter.party.players.find((p) => p.id === slot.rolledBy) || encounter.party.adversaryTemplates.find((a) => a.id === slot.rolledBy) : encounter.npcIds.find((p) => p.id === slot.rolledBy);

                                    return (
                                        <ListItem
                                            key={slot.id}
                                            sx={{
                                                border: 2,
                                                borderColor:
                                                    slot.type === InitiativeSlotType.Player
                                                        ? "primary.main"
                                                        : "error.main",
                                                backgroundColor:
                                                    slot.type === InitiativeSlotType.Player
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
                                                                slot.type === InitiativeSlotType.Player ? "primary" : "error"
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
                                            secondaryAction={
                                            <IconButton
                                                edge="end"
                                                color="error"
                                                onClick={() => onRemoveInitiativeSlot(slot.id)}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        }
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
                                PC Slots: {encounter.party.players.length + encounter.party.adversaryTemplates.length}
                                <br/>
                                NPC Slots: {encounter.npcIds.length}
                                <br/>
                                Total: {encounter.initiativeOrder.length}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{xs: 12, md: 7}} sx={{mt: 4}}>
                    <Paper sx={{p: 3, mb: 3}}>
                        <Typography variant="h6" gutterBottom>
                            Participants ({numberOfParticipants})
                        </Typography>

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
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <Paper sx={{p: 3, mt: 3, textAlign: "center"}}>
                {!canStart && (
                    <Alert severity="warning" sx={{mb: 2}}>
                        {numberOfParticipants < 2
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
}