import React from "react";
import {
    Alert,
    Box,
    Button,
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
import type {Participant, RangeBand, RangeType} from "../SampleEncounterManager.tsx";

interface RangeTrackerProps {
    open: boolean;
    participants: Participant[];
    rangeBands: RangeBand[];
    onClose: () => void;
    onUpdateRange: (
        participantId: string,
        targetId: string,
        range: RangeType
    ) => void;
}

export const SAMPLE_RANGE_OPTIONS: {value: RangeType; label: string; color: string}[] = [
    {value: "engaged", label: "Engaged", color: "#d32f2f"},
    {value: "short", label: "Short", color: "#f57c00"},
    {value: "medium", label: "Medium", color: "#fbc02d"},
    {value: "long", label: "Long", color: "#388e3c"},
    {value: "extreme", label: "Extreme", color: "#1976d2"},
];

interface RangeMatrixProps {
    pcParticipants: Participant[];
    npcParticipants: Participant[];
    rangeBands: RangeBand[];
    onUpdateRange: (fromId: string, toId: string, range: RangeType) => void;
}

export const SampleRangeBandMatrix: React.FC<RangeMatrixProps> = ({
    pcParticipants,
    npcParticipants,
    rangeBands,
    onUpdateRange,
}) => {
    const getRange = (fromId: string, toId: string): RangeType | "" => {
        const found = rangeBands.find(
            (r) =>
                (r.participantId === fromId && r.targetId === toId) ||
                (r.participantId === toId && r.targetId === fromId)
        );
        return found?.range ?? "";
    };

    if (pcParticipants.length === 0 || npcParticipants.length === 0) {
        return (
            <Alert severity="info">
                Add both player characters and adversaries to track range bands.
            </Alert>
        );
    }

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight: "bold", minWidth: 100}}>
                            <Typography variant="caption" color="text.secondary">PC ↓ / NPC →</Typography>
                        </TableCell>
                        {npcParticipants.map((npc) => (
                            <TableCell key={npc.id} sx={{fontWeight: "bold", minWidth: 140}}>
                                {npc.name}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pcParticipants.map((pc) => (
                        <TableRow key={pc.id}>
                            <TableCell sx={{fontWeight: "bold"}}>{pc.name}</TableCell>
                            {npcParticipants.map((npc) => {
                                const range = getRange(pc.id, npc.id);
                                const color = range
                                    ? SAMPLE_RANGE_OPTIONS.find((r) => r.value === range)?.color
                                    : undefined;
                                return (
                                    <TableCell key={npc.id} sx={{p: 0.5}}>
                                        <Select
                                            value={range}
                                            size="small"
                                            displayEmpty
                                            onChange={(e) =>
                                                onUpdateRange(pc.id, npc.id, e.target.value as RangeType)
                                            }
                                            sx={{
                                                minWidth: 130,
                                                "& .MuiSelect-select": {
                                                    py: 0.5,
                                                    color: color ?? "text.secondary",
                                                    fontWeight: range ? "bold" : "normal",
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: color ?? undefined,
                                                },
                                            }}
                                        >
                                            <MenuItem value=""><em>— Not Set —</em></MenuItem>
                                            {SAMPLE_RANGE_OPTIONS.map((opt) => (
                                                <MenuItem key={opt.value} value={opt.value}>
                                                    <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                                        <Box sx={{
                                                            width: 10,
                                                            height: 10,
                                                            borderRadius: "50%",
                                                            backgroundColor: opt.color,
                                                            flexShrink: 0,
                                                        }}/>
                                                        {opt.label}
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export const RangeTracker: React.FC<RangeTrackerProps> = ({
    open,
    participants,
    rangeBands,
    onClose,
    onUpdateRange,
}) => {
    const pcParticipants = participants.filter((p) => p.type === "pc");
    const npcParticipants = participants.filter((p) => p.type === "npc");

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
                    rangeBands={rangeBands}
                    onUpdateRange={onUpdateRange}
                />

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
                    </Typography>
                </Alert>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
