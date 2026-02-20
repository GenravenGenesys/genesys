import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    IconButton,
    Paper, ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import type {CampaignEncounter} from "../../../../api/model";

interface Props {
    encounter: CampaignEncounter;
    numberOfParticipants: number;
}

export default function TestEncounterSetup(props: Props) {
    const {encounter, numberOfParticipants} = props;
    const [selectedTab, setSelectedTab] = useState<"pcs" | "npcs">("pcs");


    return (
        <Paper sx={{p: 3, mb: 3}}>
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
                    }
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
            <Typography variant="h5" gutterBottom>
                Setup Encounter
            </Typography>

            <Typography variant="h6" sx={{mt: 2}}>
                Available Players
            </Typography>
            {mockPlayerCharacters.map((player) => (
                <Paper key={player.id} sx={{p: 2, mb: 1}}>
                    <Typography variant="body1">{player.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Wounds: {player.derivedStats.woundThreshold.total} |
                        Strain: {player.derivedStats.strainThreshold.total}
                    </Typography>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleAddPlayer(player)}
                        disabled={encounter.party.players.some(p => p.id === player.id)}
                    >
                        Add to Encounter
                    </Button>
                </Paper>
            ))}

            <Typography variant="h6" sx={{mt: 3}}>
                Available NPCs
            </Typography>
            {mockAdversaries.map((npc) => (
                <Paper key={npc.id} sx={{p: 2, mb: 1}}>
                    <Typography variant="body1">{npc.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Wounds: {npc.derivedStats.woundThreshold.total} |
                        Soak: {npc.derivedStats.soak.current}
                    </Typography>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleAddNPC(npc)}
                    >
                        Add to Encounter
                    </Button>
                </Paper>
            ))}

            <Typography variant="h6" sx={{mt: 3}}>
                Current Party ({encounter.party.players.length} players)
            </Typography>
            {encounter.party.players.map((player) => (
                <Paper key={player.id} sx={{p: 2, mb: 1, bgcolor: 'primary.light'}}>
                    <Typography variant="body1">{player.name}</Typography>
                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemovePlayer(player.id)}
                    >
                        Remove
                    </Button>
                </Paper>
            ))}

            <Typography variant="h6" sx={{mt: 3}}>
                NPCs in Encounter ({encounter.npcIds.length})
            </Typography>
            {encounter.npcIds.map((npc) => (
                <Paper key={npc.id} sx={{p: 2, mb: 1, bgcolor: 'error.light'}}>
                    <Typography variant="body1">{npc.name}</Typography>
                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveNPC(npc.id)}
                    >
                        Remove
                    </Button>
                </Paper>
            ))}

            <Typography variant="h6" sx={{mt: 3}}>
                Initiative Order ({encounter.initiativeOrder.length} slots)
            </Typography>
            {encounter.initiativeOrder.map((slot, idx) => (
                <Paper key={idx} sx={{p: 2, mb: 1}}>
                    <Typography variant="body1">
                        Slot {idx + 1}: {slot.type} |
                        Success: {slot.results.success} |
                        Advantage: {slot.results.advantage}
                    </Typography>
                    {slot.playerCharacter && (
                        <Typography variant="body2" color="text.secondary">
                            Player: {slot.playerCharacter.name}
                        </Typography>
                    )}
                    {slot.adversaryTemplate && (
                        <Typography variant="body2" color="text.secondary">
                            NPC: {slot.adversaryTemplate.name}
                        </Typography>
                    )}
                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveInitiativeSlot(idx)}
                    >
                        Remove Slot
                    </Button>
                </Paper>
            ))}

            <Button
                variant="contained"
                size="large"
                sx={{mt: 3}}
                onClick={handleReadyEncounter}
                disabled={encounter.party.players.length === 0 || encounter.initiativeOrder.length === 0}
            >
                Start Encounter
            </Button>
        </Paper>
    );
}