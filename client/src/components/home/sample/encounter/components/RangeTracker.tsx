import React, {useState} from "react";
import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import type {EncounterLocation, Participant, RangeBand, RangeType} from "../SampleEncounterManager.tsx";

interface RangeTrackerProps {
    open: boolean;
    participants: Participant[];
    rangeBands: RangeBand[];
    locations: EncounterLocation[];
    onClose: () => void;
    onUpdateRange: (
        participantId: string,
        targetId: string,
        range: RangeType
    ) => void;
    onUpdateLocation: (id: string, updates: Partial<EncounterLocation>) => void;
}

export const SAMPLE_RANGE_OPTIONS: {value: RangeType; label: string; color: string}[] = [
    {value: "engaged", label: "Engaged", color: "#d32f2f"},
    {value: "short", label: "Short", color: "#f57c00"},
    {value: "medium", label: "Medium", color: "#fbc02d"},
    {value: "long", label: "Long", color: "#388e3c"},
    {value: "extreme", label: "Extreme", color: "#1976d2"},
];

const COVER_CHIP_COLOR: Record<string, "default" | "warning" | "error"> = {
    None: "default",
    Soft: "warning",
    Hard: "error",
};

interface RangeMatrixProps {
    pcParticipants: Participant[];
    npcParticipants: Participant[];
    locations: EncounterLocation[];
    rangeBands: RangeBand[];
    onUpdateRange: (fromId: string, toId: string, range: RangeType) => void;
}

function RangeSelect({fromId, toId, rangeBands, onUpdateRange}: {
    fromId: string;
    toId: string;
    rangeBands: RangeBand[];
    onUpdateRange: (from: string, to: string, r: RangeType) => void;
}) {
    const found = rangeBands.find(
        (r) =>
            (r.participantId === fromId && r.targetId === toId) ||
            (r.participantId === toId && r.targetId === fromId)
    );
    const range = found?.range ?? "";
    const color = range ? SAMPLE_RANGE_OPTIONS.find((r) => r.value === range)?.color : undefined;
    return (
        <Select
            value={range}
            size="small"
            displayEmpty
            onChange={(e) => onUpdateRange(fromId, toId, e.target.value as RangeType)}
            sx={{
                minWidth: 130,
                "& .MuiSelect-select": {py: 0.5, color: color ?? "text.secondary", fontWeight: range ? "bold" : "normal"},
                "& .MuiOutlinedInput-notchedOutline": {borderColor: color ?? undefined},
            }}
        >
            <MenuItem value=""><em>— Not Set —</em></MenuItem>
            {SAMPLE_RANGE_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                    <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                        <Box sx={{width: 10, height: 10, borderRadius: "50%", backgroundColor: opt.color, flexShrink: 0}}/>
                        {opt.label}
                    </Box>
                </MenuItem>
            ))}
        </Select>
    );
}

export const SampleRangeBandMatrix: React.FC<RangeMatrixProps> = ({
    pcParticipants,
    npcParticipants,
    locations,
    rangeBands,
    onUpdateRange,
}) => {
    const hasNpcs = npcParticipants.length > 0;
    const hasPcPairs = pcParticipants.length > 1;

    if (pcParticipants.length === 0 || (npcParticipants.length === 0 && locations.length === 0 && pcParticipants.length < 2)) {
        return (
            <Alert severity="info">
                Add both player characters and adversaries (or map positions) to track range bands.
            </Alert>
        );
    }

    const pcPairs: Array<[Participant, Participant]> = [];
    for (let i = 0; i < pcParticipants.length; i++) {
        for (let j = i + 1; j < pcParticipants.length; j++) {
            pcPairs.push([pcParticipants[i], pcParticipants[j]]);
        }
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
            {(hasNpcs || locations.length > 0) && (
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: "bold", minWidth: 100}}>
                                    <Typography variant="caption" color="text.secondary">PC ↓ / Target →</Typography>
                                </TableCell>
                                {npcParticipants.map((npc) => (
                                    <TableCell key={npc.id} sx={{fontWeight: "bold", minWidth: 140}}>
                                        {npc.name}
                                    </TableCell>
                                ))}
                                {locations.map((loc) => (
                                    <TableCell key={loc.id} sx={{fontWeight: "bold", minWidth: 160, backgroundColor: "grey.100"}}>
                                        <Box sx={{display: "flex", flexDirection: "column", gap: 0.5}}>
                                            <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                                                <Typography variant="body2">📍</Typography>
                                                <Typography variant="body2" fontWeight="bold">{loc.name}</Typography>
                                            </Box>
                                            {loc.cover !== "None" && (
                                                <Chip
                                                    label={`🛡 ${loc.cover} Cover`}
                                                    size="small"
                                                    color={COVER_CHIP_COLOR[loc.cover]}
                                                    sx={{alignSelf: "flex-start", height: 18, fontSize: "0.65rem"}}
                                                />
                                            )}
                                        </Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pcParticipants.map((pc) => (
                                <TableRow key={pc.id}>
                                    <TableCell sx={{fontWeight: "bold"}}>{pc.name}</TableCell>
                                    {npcParticipants.map((npc) => (
                                        <TableCell key={npc.id} sx={{p: 0.5}}>
                                            <RangeSelect fromId={pc.id} toId={npc.id} rangeBands={rangeBands} onUpdateRange={onUpdateRange}/>
                                        </TableCell>
                                    ))}
                                    {locations.map((loc) => (
                                        <TableCell key={loc.id} sx={{p: 0.5, backgroundColor: "grey.50"}}>
                                            <RangeSelect fromId={pc.id} toId={loc.id} rangeBands={rangeBands} onUpdateRange={onUpdateRange}/>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {hasPcPairs && (
                <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{mb: 1}}>
                        PC ↔ PC Ranges
                    </Typography>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight: "bold", minWidth: 200}}>PC Pair</TableCell>
                                    <TableCell sx={{fontWeight: "bold", minWidth: 140}}>Range</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pcPairs.map(([a, b]) => (
                                    <TableRow key={`${a.id}-${b.id}`}>
                                        <TableCell sx={{fontWeight: "bold"}}>{a.name} ↔ {b.name}</TableCell>
                                        <TableCell sx={{p: 0.5}}>
                                            <RangeSelect fromId={a.id} toId={b.id} rangeBands={rangeBands} onUpdateRange={onUpdateRange}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Box>
    );
};

export const RangeTracker: React.FC<RangeTrackerProps> = ({
    open,
    participants,
    rangeBands,
    locations,
    onClose,
    onUpdateRange,
    onUpdateLocation,
}) => {
    const pcParticipants = participants.filter((p) => p.type === "pc");
    const npcParticipants = participants.filter((p) => p.type === "npc");

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
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Range Bands</DialogTitle>

            <DialogContent>
                <Alert severity="info" sx={{mb: 2}}>
                    Select a range for each PC–NPC pair. These affect combat difficulty and
                    weapon availability. Participants may spend [triumph] to perform a free
                    maneuver before combat begins.
                </Alert>

                <SampleRangeBandMatrix
                    pcParticipants={pcParticipants}
                    npcParticipants={npcParticipants}
                    locations={locations}
                    rangeBands={rangeBands}
                    onUpdateRange={onUpdateRange}
                />

                {locations.length > 0 && (
                    <Box sx={{mt: 3}}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Map Positions – Occupants
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
                            Toggle which participants are currently taking cover at each position.
                        </Typography>
                        {locations.map((loc) => (
                            <Box key={loc.id} sx={{mb: 2, p: 2, border: 1, borderColor: "grey.300", borderRadius: 1}}>
                                <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 1}}>
                                    <Typography variant="body1" fontWeight="bold">📍 {loc.name}</Typography>
                                    {loc.cover !== "None" && (
                                        <Chip
                                            label={`🛡 ${loc.cover} Cover`}
                                            size="small"
                                            color={COVER_CHIP_COLOR[loc.cover]}
                                        />
                                    )}
                                </Box>
                                <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                                    {participants.map((p) => {
                                        const inCover = loc.occupantIds.includes(p.id);
                                        return (
                                            <Chip
                                                key={p.id}
                                                label={p.name}
                                                color={inCover ? (p.type === "pc" ? "primary" : "error") : "default"}
                                                variant={inCover ? "filled" : "outlined"}
                                                onClick={() => toggleOccupant(loc.id, p.id)}
                                                sx={{cursor: "pointer"}}
                                            />
                                        );
                                    })}
                                </Box>
                                {loc.occupantIds.length === 0 && (
                                    <Typography variant="caption" color="text.secondary">
                                        No one at this position. Click a name to assign them.
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                )}

                <Alert severity="info" sx={{mt: 2}}>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Range Band Reference:
                    </Typography>
                    <Typography variant="caption" component="div">
                        • <strong>Engaged:</strong> Melee range — can't use most ranged weapons
                        <br/>• <strong>Short:</strong> Easy ranged attacks; one move maneuver to engage
                        <br/>• <strong>Medium:</strong> Average difficulty ranged attacks
                        <br/>• <strong>Long:</strong> Hard ranged attacks; requires long-range weapons
                        <br/>• <strong>Extreme:</strong> Daunting difficulty; extreme-range weapons only
                        <br/>• <strong>🛡 Soft Cover:</strong> Adds 1 Setback die to attacks targeting occupants
                        <br/>• <strong>🛡 Hard Cover:</strong> Upgrades difficulty once for attacks targeting occupants
                    </Typography>
                </Alert>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
