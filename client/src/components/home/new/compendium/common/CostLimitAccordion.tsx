import {
    type Cost,
    type Limit,
    CostType,
    LimitType,
} from "../../../../../api/model";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GenesysNumberField from "../../../common/field/GenesysNumberField.tsx";
import GenesysSelectField from "../../../common/field/GenesysSelectField.tsx";

interface Props {
    cost: Cost;
    limit: Limit;
    onCostChange: (updated: Cost) => void;
    onLimitChange: (updated: Limit) => void;
}

export default function CostLimitAccordion({cost, limit, onCostChange, onLimitChange}: Props) {
    const hasData = cost.type !== CostType.None || limit.type !== LimitType.None;

    return (
        <Stack spacing={2}>
            <Divider>
                <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                    COST &amp; LIMIT MODIFIERS
                </Typography>
            </Divider>
            <Accordion defaultExpanded={hasData} disableGutters sx={{bgcolor: 'background.paper'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="caption" sx={{fontWeight: 'bold', color: 'primary.main'}}>
                        COST &amp; LIMIT
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={2}>
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <GenesysSelectField
                                    value={cost.type}
                                    label="Cost Type"
                                    onChange={(type) => onCostChange({
                                        type: type as CostType,
                                        amount: type === CostType.None ? 0 : cost.amount,
                                    })}
                                    options={CostType}
                                />
                            </Grid>
                            {cost.type !== CostType.None && (
                                <Grid size={6}>
                                    <GenesysNumberField
                                        value={cost.amount}
                                        label="Cost Amount"
                                        onChange={(value) => onCostChange({...cost, amount: value})}
                                        min={0}
                                        max={cost.type === CostType.Strain ? 5 : 1}
                                        fullwidth
                                    />
                                </Grid>
                            )}
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <GenesysSelectField
                                    value={limit.type}
                                    label="Limit Type"
                                    onChange={(type) => onLimitChange({
                                        type: type as LimitType,
                                        limit: type === LimitType.None ? 0 : limit.limit,
                                    })}
                                    options={LimitType}
                                />
                            </Grid>
                            {limit.type !== LimitType.None && (
                                <Grid size={6}>
                                    <GenesysNumberField
                                        value={limit.limit}
                                        label="Limit Amount"
                                        onChange={(value) => onLimitChange({...limit, limit: value})}
                                        min={0} max={1} fullwidth
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Stack>
    );
}

