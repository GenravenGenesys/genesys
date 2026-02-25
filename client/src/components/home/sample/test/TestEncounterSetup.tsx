import {
    Alert,
    Box,
    Button,
    Chip, Divider,
    Grid,
    IconButton, List, ListItem, ListItemText,
    Paper,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import {
    type CampaignEncounter, type GenesysSymbolResults, type InitiativeSlot,
    InitiativeSlotType,
    type PlayerCharacter,
    type PlayerSkill
} from "../../../../api/model";
import PlayerInitiativeCard from "./PlayerInitiativeCard.tsx";
import {TestPlayerDiceRoller} from "./TestPlayerDiceRoller.tsx";

interface Props {
    encounter: CampaignEncounter;
    numberOfParticipants: number;
    onStartEncounter: () => void;
}

export default function TestEncounterSetup(props: Props) {
    const {encounter, numberOfParticipants, onStartEncounter} = props;
    const [selectedTab, setSelectedTab] = useState<"pcs" | "npcs">("pcs");
    const [player, setPlayer] = useState<PlayerCharacter | null>(null);
    const [selectedPlayerSkill, setSelectedPlayerSkill] = useState<PlayerSkill | null>(null);
    const [openPlayerDiceRoller, setOpenPlayerDiceRoller] = useState(false);
    const [baseInitiativeResult, setBaseInitiativeResult] = useState<GenesysSymbolResults | null>(null);

    const canStart = encounter.initiativeOrder.length === numberOfParticipants;

    const participantHasSlot = (participantId: string) => {
        return encounter.initiativeOrder.some((slot) => slot.rolledBy === participantId);
    };

    const rolledByParticipant = (id: string, slot: InitiativeSlot) => {
        if (slot.type === InitiativeSlotType.Player) {
            return encounter.party.players.find((p) => p.id === id) || encounter.party.adversaryTemplates.find((a) => a.id === id);
        } else {
            return encounter.npcIds.find((p) => p.id === id);
        }
    };

    const handlePlayerDicePool = (player: PlayerCharacter, skill: PlayerSkill) => {
        setPlayer(player);
        setSelectedPlayerSkill(skill);
        setOpenPlayerDiceRoller(true);
    };

    const handlePlayerClose = () => {
        setOpenPlayerDiceRoller(false);
        setPlayer(null);
        setSelectedPlayerSkill(null);
        setBaseInitiativeResult(null);
    };

    const handlePlayerInitiativeRolled = (results: GenesysSymbolResults) => {
        setBaseInitiativeResult(results);
        console.log("Player rolled initiative with results:", results);
    };

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid size={{xs: 12, md: 5}} sx={{mt: 4}}>
                    <Paper sx={{p: 3}}>
                        <Typography variant="h6" gutterBottom>Initiative Order</Typography>

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
                                    return (
                                        <ListItem
                                            sx={{
                                                border: 2, borderColor:
                                                    slot.type === InitiativeSlotType.Player
                                                        ? "primary.main"
                                                        : "error.main",
                                                backgroundColor:
                                                    slot.type === InitiativeSlotType.Player
                                                        ? "primary.light"
                                                        : "error.light",
                                                borderRadius: 1, mb: 1,
                                            }}
                                        >
                                            <Box sx={{mr: 2, textAlign: "center", minWidth: 40}}>
                                                <Typography variant="h6" fontWeight="bold">#{index + 1}</Typography>
                                            </Box>

                                            <ListItemText
                                                primary={
                                                    <Box sx={{display: "flex", alignItems: "center", gap: 1,}}>
                                                        <Chip label={InitiativeSlotType.Player} size="small"
                                                              color={"primary"} sx={{fontWeight: "bold"}}/>
                                                        <Typography variant="body2">Rolled
                                                            by: {rolledByParticipant?.name}</Typography>
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        )}

                        <Box sx={{mt: 2, p: 2, backgroundColor: "grey.25", borderRadius: 1}}>
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
                        <Typography variant="h6" gutterBottom>Participants ({numberOfParticipants})</Typography>

                        <Grid container spacing={2}>
                            <Divider>Player Characters</Divider>
                            {encounter.party.players.map((participant) => (
                                <PlayerInitiativeCard player={participant}
                                                      participantHasSlot={participantHasSlot(participant.id)}
                                                      handleRollInitiative={handlePlayerDicePool}/>
                            ))}
                            <Divider>Party NPCs</Divider>
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

                <Button variant="contained" size="large" onClick={onStartEncounter} disabled={!canStart}>
                    Start Encounter
                </Button>
            </Paper>

            {openPlayerDiceRoller && player && selectedPlayerSkill && (
                <TestPlayerDiceRoller
                    open={openPlayerDiceRoller}
                    player={player}
                    skill={selectedPlayerSkill}
                    onClose={handlePlayerClose}
                    onRollComplete={handlePlayerInitiativeRolled}
                    baseResult={baseInitiativeResult ?? {
                        success: 0,
                        advantage: 0,
                        triumph: 0,
                        failure: 0,
                        threat: 0,
                        despair: 0,
                    }}
                />
            )}
        </Box>
    );
}