import {Alert, Box, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {RangeBand} from "../../../../../api/model";
import type {RangeBand as RangeBandType} from "../../../../../api/model";

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

export default function RangeBandMatrix({rows, cols, rangeBands, onUpdateRange}: Props) {
    const getRange = (fromId: string, toId: string): RangeBandType | "" => {
        const found = rangeBands.find(
            (r) =>
                (r.participantId === fromId && r.targetId === toId) ||
                (r.participantId === toId && r.targetId === fromId)
        );
        return found?.range ?? "";
    };

    if (rows.length === 0 || cols.length === 0) {
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
                        {cols.map((col) => (
                            <TableCell key={col.id} sx={{fontWeight: "bold", minWidth: 140}}>
                                {col.name}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell sx={{fontWeight: "bold"}}>{row.name}</TableCell>
                            {cols.map((col) => {
                                const range = getRange(row.id, col.id);
                                const color = range ? RANGE_COLORS[range] : undefined;
                                return (
                                    <TableCell key={col.id} sx={{p: 0.5}}>
                                        <Select
                                            value={range}
                                            size="small"
                                            displayEmpty
                                            onChange={(e) =>
                                                onUpdateRange(row.id, col.id, e.target.value as RangeBandType)
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
                                            {RANGE_ORDER.map((r) => (
                                                <MenuItem key={r} value={r}>
                                                    <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                                        <Box sx={{
                                                            width: 10,
                                                            height: 10,
                                                            borderRadius: "50%",
                                                            backgroundColor: RANGE_COLORS[r],
                                                            flexShrink: 0,
                                                        }}/>
                                                        {r}
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
}
