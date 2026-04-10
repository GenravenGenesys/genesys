import {
    type DiceModifier,
    CheckContext,
    Target,
    DiceType,
    SkillType,
} from "../../../../../api/model";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Divider,
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
import SelectSkillField from "../../../common/SelectSkillField.tsx";

const defaultDiceModifier = (): DiceModifier => ({
    diceType: DiceType.Boost,
    amount: 1,
    checkContext: CheckContext.All,
    checkTarget: Target.Self,
});

interface Props {
    modifiers: DiceModifier[] | null | undefined;
    onChange: (updated: DiceModifier[]) => void;
}

export default function DiceModifierAccordion({modifiers, onChange}: Props) {
    const list = modifiers ?? [];

    const handleUpdate = (index: number, updated: DiceModifier) => {
        onChange(list.map((m, i) => (i === index ? updated : m)));
    };

    const handleRemove = (index: number) => {
        onChange(list.filter((_, i) => i !== index));
    };

    const handleAdd = () => {
        onChange([...list, defaultDiceModifier()]);
    };

    return (
        <Stack spacing={2}>
            <Divider>
                <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                    DICE MODIFIERS
                </Typography>
            </Divider>
            {list.map((mod, index) => (
                <Accordion key={index} disableGutters sx={{bgcolor: "background.paper"}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Box sx={{display: "flex", alignItems: "center", width: "100%", gap: 1}}>
                            <Typography variant="body2" sx={{flexGrow: 1}}>
                                {mod.amount}× {mod.diceType} — {mod.checkContext} / {mod.checkTarget} — {mod.skillType || mod.skill?.name || "No Skill Filter"}
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
                                        value={mod.diceType}
                                        label="Dice Type"
                                        onChange={(v) => handleUpdate(index, {...mod, diceType: v as DiceModifier["diceType"]})}
                                        options={DiceType}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysNumberField
                                        value={mod.amount}
                                        fullwidth
                                        label="Amount"
                                        onChange={(v) => handleUpdate(index, {...mod, amount: v})}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.checkContext}
                                        label="Check Context"
                                        onChange={(v) => handleUpdate(index, {...mod, checkContext: v as DiceModifier["checkContext"]})}
                                        options={CheckContext}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.checkTarget}
                                        label="Check Target"
                                        onChange={(v) => handleUpdate(index, {...mod, checkTarget: v as DiceModifier["checkTarget"]})}
                                        options={Target}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.skillType ?? ""}
                                        label="Skill Type Filter (optional)"
                                        onChange={(v) => handleUpdate(index, {...mod, skillType: v ? v as DiceModifier["skillType"] : undefined})}
                                        options={{Any: "", ...SkillType}}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <SelectSkillField
                                        skill={mod.skill!}
                                        updateSkill={(updatedSkill) => handleUpdate(index, {...mod, skill: updatedSkill})}
                                    />
                                </Grid>
                            </GridContainer>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            ))}
            <Box>
                <IconButton color="primary" onClick={handleAdd} size="small">
                    <AddIcon fontSize="small"/>
                </IconButton>
                <Typography variant="caption" color="text.secondary" sx={{ml: 1}}>
                    Add Dice Modifier
                </Typography>
            </Box>
        </Stack>
    );
}