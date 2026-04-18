import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    Paper,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import InventoryIcon from "@mui/icons-material/Inventory";
import {useState} from "react";
import {
    type Career,
    type ItemTemplate,
    type PlayerEquipment,
    EquipmentType, type StartingGearSlot,
} from "../../../../../api/model";

interface Props {
    career: Career;
    equipment: PlayerEquipment;
    onSave: (equipment: PlayerEquipment) => void;
}

type GearMode = "money" | "gear";

export default function SelectGearStep({career, equipment, onSave}: Props) {
    const hasStartingOptions = !!career.startingMoney;
    const [gearMode, setGearMode] = useState<GearMode>(hasStartingOptions ? "money" : "gear");
    // Track which option index is selected per gear choice (index into choice.options)
    const [selectedOptionIndexes, setSelectedOptionIndexes] = useState<Record<number, number>>(() => {
        const defaults: Record<number, number> = {};
        (career.startingGearSlot ?? []).forEach((_, i) => {
            defaults[i] = 0;
        });
        return defaults;
    });

    const startingGear: StartingGearSlot[] = career.startingGearSlot ?? [];
    const money = career.startingMoney;

    const handleModeChange = (_: React.MouseEvent<HTMLElement>, newMode: GearMode | null) => {
        if (!newMode) return;
        setGearMode(newMode);
        // Reset option selections when switching modes
        const defaults: Record<number, number> = {};
        startingGear.forEach((_, i) => {
            defaults[i] = 0;
        });
        setSelectedOptionIndexes(defaults);
        buildAndSave(newMode, defaults);
    };

    const handleOptionSelect = (choiceIdx: number, optIdx: number) => {
        const updated = {...selectedOptionIndexes, [choiceIdx]: optIdx};
        setSelectedOptionIndexes(updated);
        buildAndSave(gearMode, updated);
    };

    const buildAndSave = (mode: GearMode, optionIndexes: Record<number, number>) => {
        if (mode === "money") {
            onSave({...equipment, weapons: [], equippedArmor: equipment.equippedArmor, otherGear: []});
            return;
        }

        const allItems: ItemTemplate[] = [];
        startingGear.forEach((choice, choiceIdx) => {
            const optIdx = optionIndexes[choiceIdx] ?? 0;
            const option = choice.options[optIdx];
            if (option) {
                allItems.push(...option.items);
            }
        });

        const weapons = allItems.filter(i => i.type === EquipmentType.Weapon);
        const armorItems = allItems.filter(i => i.type === EquipmentType.Armor);
        const otherGear = allItems.filter(i => i.type === EquipmentType.Gear);

        onSave({
            weapons,
            equippedArmor: armorItems[0] ?? equipment.equippedArmor,
            otherGear,
        });
    };

    return (
        <Box sx={{mt: 3}}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Starting Equipment
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                Choose how your character starts their adventure.
            </Typography>

            {hasStartingOptions ? (
                <Stack spacing={3}>
                    <ToggleButtonGroup
                        exclusive
                        value={gearMode}
                        onChange={handleModeChange}
                        fullWidth
                        color="primary"
                    >
                        <ToggleButton value="money">
                            <MonetizationOnIcon sx={{mr: 1}}/>
                            Take Starting Money
                        </ToggleButton>
                        <ToggleButton value="gear" disabled={startingGear.length === 0}>
                            <InventoryIcon sx={{mr: 1}}/>
                            Choose Starting Gear
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {gearMode === "money" && money && (
                        <Paper variant="outlined" sx={{p: 3}}>
                            <Typography variant="subtitle1" fontWeight="bold" color="primary" gutterBottom>
                                Default Currency Payout
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
                                Your character starts with a fixed amount of currency instead of equipment.
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Chip
                                    icon={<MonetizationOnIcon/>}
                                    label={`${money.base}`}
                                    color="success"
                                    variant="outlined"
                                />
                                {money.diceExpression && (
                                    <>
                                        <Typography variant="body2" color="text.secondary">+</Typography>
                                        <Chip
                                            label={`${money.diceExpression} (rolled at session start)`}
                                            variant="outlined"
                                        />
                                    </>
                                )}
                            </Stack>
                        </Paper>
                    )}

                    {gearMode === "gear" && (
                        <GearChoicesPanel
                            startingGear={startingGear}
                            selectedOptionIndexes={selectedOptionIndexes}
                            onOptionSelect={handleOptionSelect}
                            money={money ? {diceExpression: money.diceExpression} : undefined}
                        />
                    )}
                </Stack>
            ) : (
                <Stack spacing={2}>
                    {startingGear.length === 0 ? (
                        <Alert severity="info">
                            This career provides no predefined starting gear. Your character begins with no equipment.
                        </Alert>
                    ) : (
                        <GearChoicesPanel
                            startingGear={startingGear}
                            selectedOptionIndexes={selectedOptionIndexes}
                            onOptionSelect={handleOptionSelect}
                        />
                    )}
                </Stack>
            )}
        </Box>
    );
}

interface GearChoicesPanelProps {
    startingGear: StartingGearSlot[];
    selectedOptionIndexes: Record<number, number>;
    onOptionSelect: (choiceIdx: number, optIdx: number) => void;
    money?: {diceExpression?: string};
}

function GearChoicesPanel({startingGear, selectedOptionIndexes, onOptionSelect, money}: GearChoicesPanelProps) {
    return (
        <Stack spacing={2}>
            {money?.diceExpression && (
                <Paper variant="outlined" sx={{p: 2, bgcolor: "rgba(255,255,255,0.03)"}}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <MonetizationOnIcon color="primary" fontSize="small"/>
                        <Typography variant="body2">
                            {money.diceExpression} (rolled at session start)
                        </Typography>
                    </Stack>
                </Paper>
            )}

            {startingGear.map((choice, choiceIdx) => (
                <Paper key={choiceIdx} variant="outlined" sx={{p: 2}}>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        Choice {choiceIdx + 1}
                        {choice.options.length > 1 && (
                            <Typography component="span" variant="caption" color="text.secondary" sx={{ml: 1}}>
                                — pick one
                            </Typography>
                        )}
                    </Typography>

                    {choice.options.length === 1 ? (
                        <OptionDisplay option={choice.options[0]} selected />
                    ) : (
                        <Stack spacing={1}>
                            {choice.options.map((opt, optIdx) => (
                                <Card
                                    key={optIdx}
                                    variant="outlined"
                                    sx={{
                                        cursor: "pointer",
                                        borderColor: selectedOptionIndexes[choiceIdx] === optIdx ? "primary.main" : undefined,
                                        bgcolor: selectedOptionIndexes[choiceIdx] === optIdx
                                            ? "rgba(25, 118, 210, 0.08)"
                                            : "transparent",
                                    }}
                                    onClick={() => onOptionSelect(choiceIdx, optIdx)}
                                >
                                    <CardContent sx={{py: 1.5, "&:last-child": {pb: 1.5}}}>
                                        <OptionDisplay
                                            option={opt}
                                            selected={selectedOptionIndexes[choiceIdx] === optIdx}
                                        />
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                    )}
                </Paper>
            ))}
        </Stack>
    );
}

interface OptionDisplayProps {
    option: {description?: string; items: ItemTemplate[]};
    selected: boolean;
}

function OptionDisplay({option, selected}: OptionDisplayProps) {
    return (
        <Box>
            {option.description && (
                <Typography variant="body2" fontWeight="bold" sx={{mb: 0.5}}>
                    {option.description}
                </Typography>
            )}
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {option.items.length === 0 ? (
                    <Typography variant="caption" color="text.secondary">No items</Typography>
                ) : (
                    option.items.map((item, idx) => (
                        <Chip
                            key={idx}
                            label={item.name}
                            size="small"
                            color={selected ? "primary" : "default"}
                            variant={selected ? "filled" : "outlined"}
                        />
                    ))
                )}
            </Stack>
        </Box>
    );
}
