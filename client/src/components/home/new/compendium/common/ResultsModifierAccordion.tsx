import {
    type ResultsModifier,
    type Skill,
    CheckContext,
    Target,
    SkillType,
} from "../../../../../api/model";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import GenesysNumberField from "../../../common/field/GenesysNumberField.tsx";
import GenesysSelectField from "../../../common/field/GenesysSelectField.tsx";
import SelectSkillAutocomplete from "../../../common/SelectSkillAutocomplete.tsx";

const defaultResultsModifier = (): ResultsModifier => ({
    results: {success: 0, advantage: 0, triumph: 0, failure: 0, threat: 0, despair: 0},
    checkContext: CheckContext.All,
    checkTarget: Target.Self,
});

interface Props {
    modifiers: ResultsModifier[];
    onChange: (updated: ResultsModifier[]) => void;
}

export default function ResultsModifierAccordion({modifiers, onChange}: Props) {
    const handleUpdate = (index: number, updated: ResultsModifier) => {
        onChange(modifiers.map((m, i) => (i === index ? updated : m)));
    };

    const handleRemove = (index: number) => {
        onChange(modifiers.filter((_, i) => i !== index));
    };

    const handleAdd = () => {
        onChange([...modifiers, defaultResultsModifier()]);
    };

    return (
        <Stack spacing={2}>
            <Divider>
                <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                    RESULTS MODIFIERS
                </Typography>
            </Divider>
            {modifiers.map((mod, index) => (
                <Accordion key={index} disableGutters sx={{bgcolor: "background.paper"}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Box sx={{display: "flex", alignItems: "center", width: "100%", gap: 1}}>
                            <Typography variant="body2" sx={{flexGrow: 1}}>
                                Results Modifier #{index + 1} — {mod.checkContext} / {mod.checkTarget}
                                {mod.skillType ? ` — ${mod.skillType}` : ""}
                            </Typography>
                            <Tooltip title="Remove">
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove(index);
                                    }}
                                >
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={2}>
                            <GridContainer spacing={2}>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.checkContext}
                                        label="Check Context"
                                        onChange={(v) => handleUpdate(index, {...mod, checkContext: v as ResultsModifier["checkContext"]})}
                                        options={CheckContext}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.checkTarget}
                                        label="Check Target"
                                        onChange={(v) => handleUpdate(index, {...mod, checkTarget: v as ResultsModifier["checkTarget"]})}
                                        options={Target}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.skillType ?? ""}
                                        label="Skill Type Filter (optional)"
                                        onChange={(v) => handleUpdate(index, {...mod, skillType: v ? v as ResultsModifier["skillType"] : undefined})}
                                        options={{Any: "", ...SkillType}}
                                    />
                                </Grid>
                            </GridContainer>

                            <Divider>
                                <Typography variant="caption" color="text.secondary">
                                    SYMBOL RESULTS
                                </Typography>
                            </Divider>

                            <GridContainer spacing={2}>
                                {(["success", "advantage", "triumph", "failure", "threat", "despair"] as const).map((symbol) => (
                                    <Grid size={4} key={symbol}>
                                        <GenesysNumberField
                                            value={mod.results[symbol]}
                                            fullwidth
                                            label={symbol.charAt(0).toUpperCase() + symbol.slice(1)}
                                            onChange={(v) => handleUpdate(index, {...mod, results: {...mod.results, [symbol]: v}})}
                                        />
                                    </Grid>
                                ))}
                            </GridContainer>

                            {mod.skillType && (
                                <SelectSkillAutocomplete
                                    currentSkill={mod.skill as Skill}
                                    handleSkillSelect={(skill: Skill) => handleUpdate(index, {...mod, skill})}
                                    filterByType={mod.skillType}
                                />
                            )}
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            ))}
            <Box>
                <IconButton color="primary" onClick={handleAdd} size="small">
                    <AddIcon fontSize="small"/>
                </IconButton>
                <Typography variant="caption" color="text.secondary" sx={{ml: 1}}>
                    Add Results Modifier
                </Typography>
            </Box>
        </Stack>
    );
}

