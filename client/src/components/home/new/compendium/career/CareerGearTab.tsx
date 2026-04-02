import {
    Box, Typography, Button, TextField, IconButton,
    Divider, Autocomplete, CircularProgress, Stack, Paper,
    FormControlLabel, Switch,
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
    const money = formData.startingMoney;
    const gear = formData.startingGear ?? [];

    const handleMoneyChange = (field: keyof StartingMoney, value: string | number) => {
        onChange('startingMoney', {...money, [field]: value} as StartingMoney);
    };

    const handleCurrencyToggle = (enabled: boolean) => {
        onChange('startingMoney', enabled ? {base: 0, currency: ''} : undefined);
    };

    const addGearChoice = () => {
        onChange('startingGear', [...gear, {options: [{description: '', items: []}]}]);
    };

    const removeGearChoice = (choiceIdx: number) => {
        onChange('startingGear', gear.filter((_, i) => i !== choiceIdx));
    };

    const addOption = (choiceIdx: number) => {
        const updated = gear.map((choice, i) =>
            i === choiceIdx
                ? {...choice, options: [...choice.options, {description: '', items: []}]}
                : choice
        );
        onChange('startingGear', updated);
    };

    const removeOption = (choiceIdx: number, optIdx: number) => {
        const updated = gear.map((choice, i) =>
            i === choiceIdx
                ? {...choice, options: choice.options.filter((_, j) => j !== optIdx)}
                : choice
        );
        onChange('startingGear', updated);
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
        onChange('startingGear', updated);
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
        onChange('startingGear', updated);
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
                        Player Starting Choice
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Players choose between a fixed currency payout or starting gear with a dice-rolled bonus
                    </Typography>
                </Box>
                <FormControlLabel
                    control={
                        <Switch
                            checked={money !== undefined}
                            onChange={e => handleCurrencyToggle(e.target.checked)}
                            color="primary"
                        />
                    }
                    label={money !== undefined ? 'Enabled' : 'Disabled'}
                    labelPlacement="start"
                    sx={{mr: 0, ml: 2}}
                />
            </Box>

            {money === undefined && (
                <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center', py: 4}}>
                    Enable player starting choice to configure the two options.
                </Typography>
            )}

            {money !== undefined && (
                <Stack spacing={1}>
                    {/* Shared currency name */}
                    <TextField
                        label="Currency Name"
                        size="small"
                        placeholder="e.g. credits"
                        value={money.currency}
                        onChange={e => handleMoneyChange('currency', e.target.value)}
                        sx={{width: 220, mb: 1}}
                    />

                    {/* Option A */}
                    <Paper variant="outlined" sx={{p: 2, bgcolor: 'rgba(255,255,255,0.03)'}}>
                        <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                            Option A — Default Currency
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{display: 'block', mb: 1.5}}>
                            Player receives a fixed amount of currency instead of rolling for gear
                        </Typography>
                        <TextField
                            label="Amount"
                            type="number"
                            size="small"
                            value={money.base}
                            onChange={e => handleMoneyChange('base', Number(e.target.value))}
                            sx={{width: 150}}
                        />
                    </Paper>

                    {/* OR divider */}
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, py: 0.5}}>
                        <Divider sx={{flex: 1}}/>
                        <Typography variant="overline" color="text.secondary">or</Typography>
                        <Divider sx={{flex: 1}}/>
                    </Box>

                    {/* Option B */}
                    <Paper variant="outlined" sx={{p: 2, bgcolor: 'rgba(255,255,255,0.03)'}}>
                        <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                            Option B — Starting Gear + Rolled Currency
                        </Typography>
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
                                Gear Choices
                            </Typography>
                            <Button size="small" startIcon={<AddIcon/>} onClick={addGearChoice}>
                                Add Choice
                            </Button>
                        </Box>

                        {gear.length === 0 && (
                            <Typography variant="body2" color="text.secondary">
                                No gear choices defined. Click "Add Choice" to add one.
                            </Typography>
                        )}

                        {gear.map((choice, choiceIdx) => (
                            <Paper
                                key={choiceIdx}
                                variant="outlined"
                                sx={{p: 1.5, mb: 1.5, bgcolor: 'rgba(255,255,255,0.02)'}}
                            >
                                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1}}>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        Choice {choiceIdx + 1}&nbsp;
                                        <Typography component="span" variant="caption" color="text.secondary">
                                            (player picks one option)
                                        </Typography>
                                    </Typography>
                                    <IconButton size="small" color="error" onClick={() => removeGearChoice(choiceIdx)}>
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </Box>

                                {choice.options.map((opt, optIdx) => (
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
                                                onChange={e => updateOptionDescription(choiceIdx, optIdx, e.target.value)}
                                                sx={{flex: 1}}
                                            />
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => removeOption(choiceIdx, optIdx)}
                                                disabled={choice.options.length <= 1}
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
                                            onChange={(_, val) => updateOptionItems(choiceIdx, optIdx, val as ItemTemplate[])}
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

                                <Button size="small" startIcon={<AddIcon/>} onClick={() => addOption(choiceIdx)}>
                                    Add Option
                                </Button>
                            </Paper>
                        ))}
                    </Paper>
                </Stack>
            )}
        </Box>
    );
}


