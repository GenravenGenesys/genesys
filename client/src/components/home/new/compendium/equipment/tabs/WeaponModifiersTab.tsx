import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Box,
    CircularProgress,
    Divider,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useParams} from "react-router-dom";
import type {EquipmentQuality, ItemTemplate, Quality} from "../../../../../../api/model";
import {useGetQualities} from "../../../../../../api/generated/qualities/qualities.ts";
import GenesysNumberField from "../../../../common/field/GenesysNumberField.tsx";

interface Props {
    item: ItemTemplate;
    updateItem: (update: ItemTemplate) => void;
}

export default function WeaponModifiersTab(props: Props) {
    const {item, updateItem} = props;
    const {id} = useParams<{ id: string }>();
    const {data, isLoading} = useGetQualities(id ?? "");

    const allQualities: Quality[] = data?.data ?? [];
    const qualities: EquipmentQuality[] = item.qualities ?? [];
    const availableQualities = allQualities.filter(
        (q) => q.weapon && !qualities.some((eq) => eq.id === q.id)
    );

    const handleAddQuality = (quality: Quality | null) => {
        if (!quality) return;
        const newEntry: EquipmentQuality = {...quality, ranks: 1};
        updateItem({...item, qualities: [...qualities, newEntry]});
    };

    const handleRemoveQuality = (index: number) => {
        updateItem({...item, qualities: qualities.filter((_, i) => i !== index)});
    };

    const handleRanksChange = (index: number, ranks: number) => {
        const updated = qualities.map((eq, i) => (i === index ? {...eq, ranks} : eq));
        updateItem({...item, qualities: updated});
    };

    return (
        <Stack spacing={2}>
            {/* ── Existing Qualities ──────────────────────────────── */}
            {qualities.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{textAlign: "center", py: 2}}>
                    No qualities added yet.
                </Typography>
            )}

            {qualities.map((eq, index) => (
                <Box key={eq.id} sx={{position: "relative"}}>
                    <Accordion disableGutters sx={{bgcolor: "background.paper"}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography variant="body2" sx={{flexGrow: 1, pr: 4}}>
                                {eq.name}
                                {eq.ranks > 0 && (
                                    <Typography component="span" variant="caption" color="text.secondary" sx={{ml: 1}}>
                                        (Rank {eq.ranks})
                                    </Typography>
                                )}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                {eq.description && (
                                    <Typography variant="body2" color="text.secondary">
                                        {eq.description}
                                    </Typography>
                                )}
                                <GenesysNumberField
                                    value={eq.ranks}
                                    fullwidth
                                    label="Ranks"
                                    min={1}
                                    onChange={(v) => handleRanksChange(index, v)}
                                />
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    <Tooltip title="Remove Quality">
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleRemoveQuality(index)}
                            sx={{position: "absolute", top: 6, right: 40}}
                        >
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </Box>
            ))}

            {/* ── Add Quality ──────────────────────────────────────── */}
            <Divider>
                <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                    ADD QUALITY
                </Typography>
            </Divider>

            {isLoading ? (
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <CircularProgress size={24}/>
                </Box>
            ) : (
                <Autocomplete
                    options={availableQualities}
                    getOptionLabel={(q) => q.name}
                    onChange={(_, value) => handleAddQuality(value)}
                    value={null}
                    blurOnSelect
                    renderOption={(optionProps, q) => (
                        <li {...optionProps} key={q.id}>
                            <Box>
                                <Typography variant="body2">{q.name}</Typography>
                                {q.description && (
                                    <Typography variant="caption" color="text.secondary">
                                        {q.description}
                                    </Typography>
                                )}
                            </Box>
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search qualities…"
                            size="small"
                            placeholder="Type to search"
                            fullWidth
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    startAdornment: <AddIcon fontSize="small" sx={{mr: 0.5, color: "primary.main"}}/>,
                                },
                            }}
                        />
                    )}
                />
            )}
        </Stack>
    );
}