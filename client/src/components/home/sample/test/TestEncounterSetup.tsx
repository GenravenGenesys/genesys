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
import {useState} from "react";
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
} from "../../../../api/model";
import InitiativeRollDialog from "../../new/session/encounter/InitiativeRollDialog.tsx";
import InitiativeOrderListItem from "../../new/session/encounter/InitiativeOrderListItem.tsx";
import RangeBandMatrix from "../../new/session/encounter/RangeBandMatrix.tsx";
import type {EncounterRangeBand} from "./TestEncounter.tsx";

type DialogParticipant =
    | {kind: "player"; character: PlayerCharacter}
    | {kind: "npc"; adversary: AdversaryTemplate};

interface Props {
    encounter: CampaignEncounter;
    numberOfParticipants: number;
    rangeBands: EncounterRangeBand[];
    onAddInitiativeSlot: (slot: InitiativeSlot) => void;
    onRemoveInitiativeSlot: (index: number) => void;
    onUpdateRange: (participantId: string, targetId: string, range: RangeBandType) => void;
    onStartEncounter: () => void;
}

export default function TestEncounterSetup(props: Props) {
    const {encounter, numberOfParticipants, rangeBands, onAddInitiativeSlot, onRemoveInitiativeSlot, onUpdateRange, onStartEncounter} = props;

    const [dialogParticipant, setDialogParticipant] = useState<DialogParticipant | null>(null);

    const canStart = encounter.initiativeOrder.length === numberOfParticipants && numberOfParticipants > 0;

    const hasRolled = (id: string) => encounter.initiativeOrder.some((s) => s.rolledBy === id);

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

    const players = encounter.party?.players ?? [];
    const partyNpcs = encounter.party?.adversaryTemplates ?? [];
    const encounterNpcs = encounter.npcIds ?? [];
    const allNpcs = [...partyNpcs, ...encounterNpcs];

    const pcSlots = encounter.initiativeOrder.filter((s) => s.type === InitiativeSlotType.Player);
    const npcSlots = encounter.initiativeOrder.filter((s) => s.type === InitiativeSlotType.NPC);

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Left: Initiative Order */}
                <Grid size={{xs: 12, md: 5}} sx={{mt: 2}}>
                    <Paper sx={{p: 3}}>
                        <Typography variant="h6" gutterBottom>Initiative Order</Typography>

                        <Alert severity="info" sx={{mb: 2}}>
                            Each participant rolls initiative once to create a slot. During
                            the encounter, players can choose which PC acts in PC slots, and
                            GM chooses for NPC slots.
                        </Alert>

                        {encounter.initiativeOrder.length === 0 ? (
                            <Alert severity="warning">
                                No initiative rolled yet. Roll for each participant on the right.
                            </Alert>
                        ) : (
                            <List disablePadding>
                                {encounter.initiativeOrder.map((slot, index) => (
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
                                NPC Slots: {npcSlots.length} / {allNpcs.length}
                                <br/>
                                Total: {encounter.initiativeOrder.length} / {numberOfParticipants}
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

                        {!canStart && numberOfParticipants > 0 && (
                            <Alert severity="warning" sx={{mt: 2}}>
                                {numberOfParticipants < 2
                                    ? "Add at least 2 participants to start"
                                    : "All participants must roll initiative before starting"}
                            </Alert>
                        )}
                    </Paper>
                </Grid>

                {/* Right: Participants */}
                <Grid size={{xs: 12, md: 7}} sx={{mt: 2}}>
                    {/* Party Players */}
                    <Paper sx={{p: 3, mb: 3}}>
                        <Typography variant="h6" gutterBottom>
                            Player Characters ({players.length})
                        </Typography>

                        {players.length === 0 ? (
                            <Alert severity="info">No player characters in this encounter.</Alert>
                        ) : (
                            <Grid container spacing={2}>
                                {players.map((pc) => {
                                    const rolled = hasRolled(pc.id);
                                    return (
                                        <Grid size={{xs: 12, sm: 6}} key={pc.id}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
                                                        <Box>
                                                            <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 0.5}}>
                                                                <Typography variant="subtitle1" fontWeight="bold">
                                                                    {pc.name}
                                                                </Typography>
                                                                <Chip label="PC" size="small" color="primary"/>
                                                                {rolled && <CheckCircleIcon color="success" fontSize="small"/>}
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
                                                            onClick={() => setDialogParticipant({kind: "player", character: pc})}
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

                    {/* NPCs (party NPCs + encounter NPCs) */}
                    <Paper sx={{p: 3}}>
                        <Typography variant="h6" gutterBottom>
                            Adversaries ({allNpcs.length})
                        </Typography>

                        {allNpcs.length === 0 ? (
                            <Alert severity="info">No adversaries in this encounter.</Alert>
                        ) : (
                            <Grid container spacing={2}>
                                {allNpcs.map((npc) => {
                                    const rolled = hasRolled(npc.id);
                                    return (
                                        <Grid size={{xs: 12, sm: 6}} key={npc.id}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
                                                        <Box>
                                                            <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 0.5}}>
                                                                <Typography variant="subtitle1" fontWeight="bold">
                                                                    {npc.name}
                                                                </Typography>
                                                                <Chip label="NPC" size="small" color="error"/>
                                                                {rolled && <CheckCircleIcon color="success" fontSize="small"/>}
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
                                                            onClick={() => setDialogParticipant({kind: "npc", adversary: npc})}
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
                    cols={allNpcs}
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