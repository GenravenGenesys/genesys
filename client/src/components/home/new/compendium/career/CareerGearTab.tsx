import {
    Box, Typography, Button, TextField, IconButton,
    Autocomplete, CircularProgress, Stack, Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {useParams} from 'react-router-dom';
import {useGetItems} from '../../../../../api/generated/item-compendium/item-compendium';
import type {Career, ItemTemplate, StartingMoney} from '../../../../../api/model';

interface Props {
    formData: Career;
    onChange: <K extends keyof Career>(field: K, value: Career[K]) => void;
}

export default function CareerGearTab({formData, onChange}: Props) {
    const {id} = useParams<{ id: string }>();
    const {data: itemsData, isLoading} = useGetItems(id ?? '');

    const items: ItemTemplate[] = itemsData?.data ?? [];
    const money = formData.startingMoney ?? {base: 0, diceExpression: "1d100"};
    const gear = formData.startingGearSlot ?? [];

    const handleMoneyChange = (field: keyof StartingMoney, value: string | number) => {
        onChange('startingMoney', {...money, [field]: value} as StartingMoney);
    };

    const addGearChoice = () => {
        onChange('startingGearSlot', [...gear, {options: [{description: '', items: []}]}]);
    };

    const removeGearChoice = (choiceIdx: number) => {
        onChange('startingGearSlot', gear.filter((_, i) => i !== choiceIdx));
    };

    const addOption = (choiceIdx: number) => {
        const updated = gear.map((choice, i) =>
            i === choiceIdx
                ? {...choice, options: [...choice.options, {description: '', items: []}]}
                : choice
        );
        onChange('startingGearSlot', updated);
    };

    const removeOption = (choiceIdx: number, optIdx: number) => {
        const updated = gear.map((choice, i) =>
            i === choiceIdx
                ? {...choice, options: choice.options.filter((_, j) => j !== optIdx)}
                : choice
        );
        onChange('startingGearSlot', updated);
    };

    const updateOptionDescription = (choiceIdx: number, optIdx: number, desc: string) => {
        const updated = gear.map((choice, i) =>
            i === choiceIdx
                ? {
                    ...choice, options: choice.options.map((opt, j) =>
                        j === optIdx ? {...opt, description: desc} : opt
                    ),
                }
                : choice
        );
        onChange('startingGearSlot', updated);
    };

    const updateOptionItems = (choiceIdx: number, optIdx: number, selectedItems: ItemTemplate[]) => {
        const updated = gear.map((choice, i) =>
            i === choiceIdx
                ? {
                    ...choice, options: choice.options.map((opt, j) =>
                        j === optIdx ? {...opt, items: selectedItems} : opt
                    ),
                }
                : choice
        );
        onChange('startingGearSlot', updated);
    };

    return (
        <Box>
            {/* Master toggle */}
            <Box sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                p: 2, mb: 2, border: '1px solid rgba(255,255,255,0.12)', borderRadius: 1,
            }}>
                <Box>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{lineHeight: 1.2}}>
                        Starting Gear for Career
                    </Typography>
                </Box>
            </Box>

            <Stack spacing={1}>
                <Paper variant="outlined" sx={{p: 2, bgcolor: 'rgba(255,255,255,0.03)'}}>
                    <Typography variant="caption" color="text.secondary" sx={{display: 'block', mb: 1.5}}>
                        Player receives gear choices and a dice-rolled currency bonus
                    </Typography>

                    <TextField
                        label="Dice Expression"
                        size="small"
                        placeholder="e.g. 1d100"
                        value={money.diceExpression ?? ''}
                        onChange={e => handleMoneyChange('diceExpression', e.target.value)}
                        sx={{width: 180, mb: 2}}
                    />

                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1}}>
                        <Typography variant="body2" fontWeight="bold">
                            Start Gear
                        </Typography>
                        <Button size="small" startIcon={<AddIcon/>} onClick={addGearChoice}>
                            Add Gear Slot
                        </Button>
                    </Box>

                    {gear.length === 0 && (
                        <Typography variant="body2" color="text.secondary">
                            No gear slots defined. Click "Add Gear Slot" to add one.
                        </Typography>
                    )}

                    {gear.map((slot, slotIndex) => (
                        <Paper
                            key={slotIndex}
                            variant="outlined"
                            sx={{p: 1.5, mb: 1.5, bgcolor: 'rgba(255,255,255,0.02)'}}
                        >
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1}}>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    Slot {slotIndex + 1}&nbsp;
                                    {slot.options.length > 1 && <Typography component="span" variant="caption" color="text.secondary">
                                        (player picks one option)
                                    </Typography>}
                                </Typography>
                                <IconButton size="small" color="error" onClick={() => removeGearChoice(slotIndex)}>
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </Box>

                            {slot.options.map((opt, optIdx) => (
                                <Box
                                    key={optIdx}
                                    sx={{mb: 1.5, pl: 1.5, borderLeft: '2px solid rgba(255,255,255,0.12)'}}
                                >
                                    <Box sx={{display: 'flex', gap: 1, alignItems: 'center', mb: 1}}>
                                        <TextField
                                            label={`Option ${optIdx + 1} Label`}
                                            size="small"
                                            placeholder="e.g. traveling gear"
                                            value={opt.description ?? ''}
                                            onChange={e => updateOptionDescription(slotIndex, optIdx, e.target.value)}
                                            sx={{flex: 1}}
                                        />
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => removeOption(slotIndex, optIdx)}
                                            disabled={slot.options.length <= 1}
                                        >
                                            <DeleteIcon fontSize="small"/>
                                        </IconButton>
                                    </Box>
                                    <Autocomplete
                                        multiple
                                        options={items}
                                        getOptionLabel={item => item.name}
                                        value={opt.items}
                                        loading={isLoading}
                                        onChange={(_, val) => updateOptionItems(slotIndex, optIdx, val as ItemTemplate[])}
                                        isOptionEqualToValue={(a, b) => a.id === b.id}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                label="Items"
                                                size="small"
                                                placeholder="Select items..."
                                                slotProps={{
                                                    input: {
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <>
                                                                {isLoading ? <CircularProgress size={16}/> : null}
                                                                {params.InputProps.endAdornment}
                                                            </>
                                                        ),
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </Box>
                            ))}

                            <Button size="small" startIcon={<AddIcon/>} onClick={() => addOption(slotIndex)}>
                                Add Option
                            </Button>
                        </Paper>
                    ))}
                </Paper>
            </Stack>
        </Box>
    );
}


