import {Alert, Box, Chip, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {RangeBand} from "../../../../../api/model";
import type {RangeBand as RangeBandType} from "../../../../../api/model";
import type {EncounterLocation} from "../../sample/test/TestEncounter.tsx";

interface ParticipantRef {
    id: string;
    name: string;
}

interface RangeBandEntry {
    participantId: string;
    targetId: string;
    range: RangeBandType;
}

interface Props {
    rows: ParticipantRef[];
    cols: ParticipantRef[];
    locations?: EncounterLocation[];
    rangeBands: RangeBandEntry[];
    onUpdateRange: (fromId: string, toId: string, range: RangeBandType) => void;
}

const RANGE_ORDER: RangeBandType[] = [
    RangeBand.Engaged,
    RangeBand.Short,
    RangeBand.Medium,
    RangeBand.Long,
    RangeBand.Extreme,
];

const RANGE_COLORS: Record<string, string> = {
    [RangeBand.Engaged]: "#d32f2f",
    [RangeBand.Short]: "#f57c00",
    [RangeBand.Medium]: "#fbc02d",
    [RangeBand.Long]: "#388e3c",
    [RangeBand.Extreme]: "#1976d2",
    [RangeBand.Strategic]: "#7b1fa2",
};

const COVER_COLORS: Record<string, "default" | "warning" | "error"> = {
    None: "default",
    Soft: "warning",
    Hard: "error",
};

function RangeSelect({fromId, toId, rangeBands, onUpdateRange}: {
    fromId: string;
    toId: string;
    rangeBands: RangeBandEntry[];
    onUpdateRange: (from: string, to: string, r: RangeBandType) => void;
}) {
    const found = rangeBands.find(
        (r) =>
            (r.participantId === fromId && r.targetId === toId) ||
            (r.participantId === toId && r.targetId === fromId)
    );
    const range = found?.range ?? "";
    const color = range ? RANGE_COLORS[range] : undefined;
    return (
        <Select
            value={range}
            size="small"
            displayEmpty
            onChange={(e) => onUpdateRange(fromId, toId, e.target.value as RangeBandType)}
            sx={{
                minWidth: 130,
                "& .MuiSelect-select": {py: 0.5, color: color ?? "text.secondary", fontWeight: range ? "bold" : "normal"},
                "& .MuiOutlinedInput-notchedOutline": {borderColor: color ?? undefined},
            }}
        >
            <MenuItem value=""><em>— Not Set —</em></MenuItem>
            {RANGE_ORDER.map((r) => (
                <MenuItem key={r} value={r}>
                    <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                        <Box sx={{width: 10, height: 10, borderRadius: "50%", backgroundColor: RANGE_COLORS[r], flexShrink: 0}}/>
                        {r}
                    </Box>
                </MenuItem>
            ))}
        </Select>
    );
}

export default function RangeBandMatrix({rows, cols, locations = [], rangeBands, onUpdateRange}: Props) {
    const hasNpcs = cols.length > 0;
    const hasPcPairs = rows.length > 1;

    if (rows.length === 0 || (cols.length === 0 && locations.length === 0 && rows.length < 2)) {
        return (
            <Alert severity="info">
                Add both player characters and adversaries (or map positions) to track range bands.
            </Alert>
        );
    }

    const pcPairs: Array<[ParticipantRef, ParticipantRef]> = [];
    for (let i = 0; i < rows.length; i++) {
        for (let j = i + 1; j < rows.length; j++) {
            pcPairs.push([rows[i], rows[j]]);
        }
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
            {/* PC ↔ NPC + Location table */}
            {(hasNpcs || locations.length > 0) && (
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: "bold", minWidth: 100}}>
                                    <Typography variant="caption" color="text.secondary">
                                        PC ↓ / Target →
                                    </Typography>
                                </TableCell>
                                {cols.map((col) => (
                                    <TableCell key={col.id} sx={{fontWeight: "bold", minWidth: 140}}>
                                        {col.name}
                                    </TableCell>
                                ))}
                                {locations.map((loc) => (
                                    <TableCell
                                        key={loc.id}
                                        sx={{fontWeight: "bold", minWidth: 160, backgroundColor: "grey.100"}}
                                    >
                                        <Box sx={{display: "flex", flexDirection: "column", gap: 0.5}}>
                                            <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                                                <Typography variant="body2">📍</Typography>
                                                <Typography variant="body2" fontWeight="bold">{loc.name}</Typography>
                                            </Box>
                                            {loc.cover !== "None" && (
                                                <Chip
                                                    label={`🛡 ${loc.cover} Cover`}
                                                    size="small"
                                                    color={COVER_COLORS[loc.cover] as "warning" | "error"}
                                                    sx={{alignSelf: "flex-start", height: 18, fontSize: "0.65rem"}}
                                                />
                                            )}
                                        </Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell sx={{fontWeight: "bold"}}>{row.name}</TableCell>
                                    {cols.map((col) => (
                                        <TableCell key={col.id} sx={{p: 0.5}}>
                                            <RangeSelect fromId={row.id} toId={col.id} rangeBands={rangeBands} onUpdateRange={onUpdateRange}/>
                                        </TableCell>
                                    ))}
                                    {locations.map((loc) => (
                                        <TableCell key={loc.id} sx={{p: 0.5, backgroundColor: "grey.50"}}>
                                            <RangeSelect fromId={row.id} toId={loc.id} rangeBands={rangeBands} onUpdateRange={onUpdateRange}/>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* PC ↔ PC table */}
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
                                        <TableCell sx={{fontWeight: "bold"}}>
                                            {a.name} ↔ {b.name}
                                        </TableCell>
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
}
