import {useState} from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    List,
    Paper,
    Typography,
} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
    type AdversaryTemplate,
    type CampaignEncounter,
    type GenesysSymbolResults,
    type InitiativeSlot,
    InitiativeSlotType,
    type PlayerCharacter,
    type RangeBand as RangeBandType,
} from "../../../../../api/model";
import InitiativeOrderListItem from "./InitiativeOrderListItem.tsx";
import InitiativeRollDialog from "./InitiativeRollDialog.tsx";
import RangeBandMatrix from "./RangeBandMatrix.tsx";

type DialogParticipant =
    | {kind: "player"; character: PlayerCharacter}
    | {kind: "npc"; adversary: AdversaryTemplate};

interface EncounterRangeBand {
    participantId: string;
    targetId: string;
    range: RangeBandType;
}

interface Props {
    encounter: CampaignEncounter;
    initiativeOrder: InitiativeSlot[];
    rangeBands: EncounterRangeBand[];
    onAddInitiativeSlot: (slot: InitiativeSlot) => void;
    onRemoveInitiativeSlot: (index: number) => void;
    onUpdateRange: (participantId: string, targetId: string, range: RangeBandType) => void;
    onStartEncounter: () => void;
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

export default function StartEncounterView(props: Props) {
    const {encounter, initiativeOrder, rangeBands, onAddInitiativeSlot, onRemoveInitiativeSlot, onUpdateRange, onStartEncounter} = props;

    const [dialogParticipant, setDialogParticipant] = useState<DialogParticipant | null>(null);

    const players = encounter.party?.players ?? [];
    const npcs = encounter.npcIds ?? [];
    const totalParticipants = players.length + npcs.length;

    const hasRolled = (id: string) => initiativeOrder.some((s) => s.rolledBy === id);

    const handleOpenDialog = (p: DialogParticipant) => setDialogParticipant(p);

    const handleDialogConfirm = (results: GenesysSymbolResults, _strainSuffered: number) => {
        if (!dialogParticipant) return;
        const isPlayer = dialogParticipant.kind === "player";
        const newSlot = {
            type: isPlayer ? InitiativeSlotType.Player : InitiativeSlotType.NPC,
            results,
            rolledBy: isPlayer ? dialogParticipant.character.id : dialogParticipant.adversary.id,
            ...(isPlayer
                ? {playerCharacter: dialogParticipant.character}
                : {adversaryTemplate: dialogParticipant.adversary}),
        } as InitiativeSlot;
        onAddInitiativeSlot(newSlot);
        setDialogParticipant(null);
    };

    const sortedOrder = [...initiativeOrder].sort(compareSlots);
    const pcSlots = sortedOrder.filter((s) => s.type === InitiativeSlotType.Player);
    const npcSlots = sortedOrder.filter((s) => s.type === InitiativeSlotType.NPC);
    const canStart = initiativeOrder.length === totalParticipants && totalParticipants > 0;

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Left: Initiative Order */}
                <Grid size={{xs: 12, md: 5}} sx={{mt: 2}}>
                    <Paper sx={{p: 3}}>
                        <Typography variant="h6" gutterBottom>
                            Initiative Order
                        </Typography>

                        <Alert severity="info" sx={{mb: 2}}>
                            Each participant rolls initiative once to create a slot. During
                            the encounter, players choose which PC acts in PC slots, and the
                            GM chooses for NPC slots.
                        </Alert>

                        {sortedOrder.length === 0 ? (
                            <Alert severity="warning">
                                No initiative rolled yet. Roll for each participant on the right.
                            </Alert>
                        ) : (
                            <List disablePadding>
                                {sortedOrder.map((slot, index) => (
                                    <InitiativeOrderListItem
                                        key={index}
                                        slot={slot}
                                        index={index}
                                        onRemoveInitiativeSlot={onRemoveInitiativeSlot}
                                    />
                                ))}
                            </List>
                        )}

                        <Box sx={{mt: 2, p: 2, backgroundColor: "grey.100", borderRadius: 1}}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Summary:</strong>
                                <br/>
                                PC Slots: {pcSlots.length} / {players.length}
                                <br/>
                                NPC Slots: {npcSlots.length} / {npcs.length}
                                <br/>
                                Total: {sortedOrder.length} / {totalParticipants}
                            </Typography>
                        </Box>

                        {canStart && (
                            <Button
                                fullWidth
                                variant="contained"
                                color="success"
                                size="large"
                                startIcon={<PlayArrowIcon/>}
                                onClick={onStartEncounter}
                                sx={{mt: 2}}
                            >
                                Start Encounter
                            </Button>
                        )}
                    </Paper>
                </Grid>

                {/* Right: Participants */}
                <Grid size={{xs: 12, md: 7}} sx={{mt: 2}}>
                    {/* Party (PCs) */}
                    <Paper sx={{p: 3, mb: 3}}>
                        <Typography variant="h6" gutterBottom>
                            Party ({players.length})
                        </Typography>

                        {players.length === 0 ? (
                            <Alert severity="info">No party members in this encounter.</Alert>
                        ) : (
                            <Grid container spacing={2}>
                                {players.map((pc) => {
                                    const rolled = hasRolled(pc.id);
                                    return (
                                        <Grid size={{xs: 12, sm: 6}} key={pc.id}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "flex-start",
                                                        }}
                                                    >
                                                        <Box>
                                                            <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 0.5}}>
                                                                <Typography variant="subtitle1" fontWeight="bold">
                                                                    {pc.name}
                                                                </Typography>
                                                                <Chip label="PC" size="small" color="primary"/>
                                                                {rolled && (
                                                                    <CheckCircleIcon color="success" fontSize="small"/>
                                                                )}
                                                            </Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                W: {pc.derivedStats?.woundThreshold?.total ?? "—"} |{" "}
                                                                S: {pc.derivedStats?.strainThreshold?.total ?? "—"}
                                                            </Typography>
                                                        </Box>
                                                        <Button
                                                            variant={rolled ? "outlined" : "contained"}
                                                            size="small"
                                                            startIcon={<CasinoIcon/>}
                                                            onClick={() => handleOpenDialog({kind: "player", character: pc})}
                                                        >
                                                            {rolled ? "Re-Roll" : "Roll"}
                                                        </Button>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        )}
                    </Paper>

                    {/* NPCs */}
                    <Paper sx={{p: 3}}>
                        <Typography variant="h6" gutterBottom>
                            Adversaries ({npcs.length})
                        </Typography>

                        {npcs.length === 0 ? (
                            <Alert severity="info">No adversaries in this encounter.</Alert>
                        ) : (
                            <Grid container spacing={2}>
                                {npcs.map((npc) => {
                                    const rolled = hasRolled(npc.id);
                                    return (
                                        <Grid size={{xs: 12, sm: 6}} key={npc.id}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "flex-start",
                                                        }}
                                                    >
                                                        <Box>
                                                            <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 0.5}}>
                                                                <Typography variant="subtitle1" fontWeight="bold">
                                                                    {npc.name}
                                                                </Typography>
                                                                <Chip label="NPC" size="small" color="error"/>
                                                                {rolled && (
                                                                    <CheckCircleIcon color="success" fontSize="small"/>
                                                                )}
                                                            </Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                W: {npc.derivedStats?.woundThreshold?.total ?? "—"} |{" "}
                                                                Soak: {npc.derivedStats?.soak?.total ?? "—"}
                                                            </Typography>
                                                        </Box>
                                                        <Button
                                                            variant={rolled ? "outlined" : "contained"}
                                                            color="error"
                                                            size="small"
                                                            startIcon={<CasinoIcon/>}
                                                            onClick={() => handleOpenDialog({kind: "npc", adversary: npc})}
                                                        >
                                                            {rolled ? "Re-Roll" : "Roll"}
                                                        </Button>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            <Paper sx={{p: 3, mt: 3}}>
                <Typography variant="h6" gutterBottom>
                    Range Bands
                </Typography>
                <Alert severity="info" sx={{mb: 2}}>
                    Set starting distances between participants. Participants may spend
                    [triumph] from their initiative roll to perform a free maneuver before
                    combat begins — use this to update their position.
                </Alert>
                <RangeBandMatrix
                    rows={players}
                    cols={npcs}
                    rangeBands={rangeBands}
                    onUpdateRange={onUpdateRange}
                />
            </Paper>

            <InitiativeRollDialog
                open={dialogParticipant !== null}
                participant={dialogParticipant}
                onClose={() => setDialogParticipant(null)}
                onConfirm={handleDialogConfirm}
            />
        </Box>
    );
}