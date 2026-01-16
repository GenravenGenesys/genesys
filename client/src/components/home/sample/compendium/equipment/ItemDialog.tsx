import {useState, useEffect} from 'react';
import {
    Box,
    Typography,
    Stack,
    Button,
    Grid,
    Divider,
    Dialog,
    useTheme,
    useMediaQuery,
    DialogActions,
    DialogTitle,
    DialogContent,
    Tabs,
    Tab,
    ToggleButton,
    ToggleButtonGroup,
    FormControlLabel,
    Switch
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import {
    type ArmorTemplate,
    type GearTemplate,
    type ItemTemplate,
    type WeaponTemplate,
    type EquipmentType,
    type Skill,
    SkillType
} from "../../../../../api/model";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import GenesysTextField from "../../../../common/field/GenesysTextField.tsx";
import GenesysNumberField from "../../../../common/field/GenesysNumberField.tsx";
import SelectSkillField from "../SelectSkillField.tsx";

interface Props {
    open: boolean;
    item: ItemTemplate | WeaponTemplate | ArmorTemplate | GearTemplate;
    onClose: () => void;
    onSave: (data: ItemTemplate | WeaponTemplate | ArmorTemplate | GearTemplate) => void;
    isNew: boolean;
}

export default function ItemDialog(props: Props) {
    const {open, item, onClose, onSave, isNew} = props;
    const [formData, setFormData] = useState<ItemTemplate>(item || {} as ItemTemplate);
    const [tabValue, setTabValue] = useState(0);
    const [itemType, setItemType] = useState<string>('WEAPON');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (item) {
            setFormData(item);
            if (item.type) {
                setItemType(item.type);
            }
        }
    }, [item]);

    const handleChange = <K extends keyof ItemTemplate>(field: K, value: ItemTemplate[K]) => {
        setFormData((prev: ItemTemplate) => ({...prev, [field]: value}));
    };

    const handleTypeChange = (newType: string) => {
        setItemType(newType);
        handleChange('type', newType as EquipmentType);
    };

    const handleSave = () => {
        onSave(formData);
        setFormData({} as ItemTemplate);
        onClose();
    }

    const handleClose = () => {
        setFormData({} as ItemTemplate);
        onClose();
    };

    const renderWeaponFields = () => (
        <Stack spacing={3}>
            <SelectSkillField
                currentSkill={(formData as WeaponTemplate).skill || null}
                handleSkillSelect={(skill: Skill | null) => handleChange('skill' as keyof ItemTemplate, skill as any)}
                filterByType={SkillType.Combat}
            />
            <GridContainer>
                <Grid size={6}>
                    <GenesysNumberField
                        value={(formData as WeaponTemplate).damage || 0}
                        fullwidth
                        label="Damage"
                        onChange={(e) => handleChange('damage' as keyof ItemTemplate, e as any)}
                    />
                </Grid>
                <Grid size={6}>
                    <GenesysNumberField
                        value={(formData as WeaponTemplate).critical || 3}
                        fullwidth
                        label="Critical"
                        onChange={(e) => handleChange('critical' as keyof ItemTemplate, e as any)}
                    />
                </Grid>
            </GridContainer>
            <GenesysTextField
                text={(formData as WeaponTemplate).range?.toString() || 'ENGAGED'}
                label="Range"
                onChange={(e) => handleChange('range' as keyof ItemTemplate, e as any)}
                fullwidth
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={(formData as WeaponTemplate).brawn || false}
                        onChange={(e) => handleChange('brawn' as keyof ItemTemplate, e.target.checked as any)}
                    />
                }
                label="Add Brawn to Damage"
            />
        </Stack>
    );

    const renderArmorFields = () => (
        <Stack spacing={3}>
            <GridContainer>
                <Grid size={6}>
                    <GenesysNumberField
                        value={(formData as ArmorTemplate).soak?.base || 0}
                        fullwidth
                        label="Soak"
                        onChange={(e) => handleChange('soak' as keyof ItemTemplate, {base: e, current: e} as any)}
                    />
                </Grid>
                <Grid size={6}>
                    <GenesysNumberField
                        value={(formData as ArmorTemplate).defense?.base || 0}
                        fullwidth
                        label="Defense"
                        onChange={(e) => handleChange('defense' as keyof ItemTemplate, {base: e, current: e} as any)}
                    />
                </Grid>
            </GridContainer>
        </Stack>
    );

    const renderGearFields = () => (
        <Stack spacing={3}>
            <GenesysNumberField
                value={(formData as GearTemplate).amount || 1}
                fullwidth
                label="Quantity"
                onChange={(e) => handleChange('amount' as keyof ItemTemplate, e as any)}
            />
        </Stack>
    );

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            fullScreen={fullScreen}
            maxWidth="md"
            scroll="paper"
            slotProps={{paper: {sx: {borderRadius: 4, bgcolor: '#050c14', backgroundImage: 'none'}}}}
        >
            <DialogTitle>{isNew ? "Create New Equipment" : "Edit Equipment"}</DialogTitle>
            <GenesysTextField
                text={formData.name || ''}
                label="Equipment Name"
                onChange={(e) => handleChange("name", e)}
                fullwidth
            />
            <Box sx={{borderBottom: 1, borderColor: 'divider', px: 3}}>
                <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} color="primary" centered>
                    <Tab label="Basic Information"/>
                    <Tab label="Type-Specific"/>
                    <Tab label="Qualities & Modifiers"/>
                </Tabs>
            </Box>

            <DialogContent sx={{minHeight: '500px', py: 3}} dividers>
                {tabValue === 0 && (
                    <Stack spacing={3}>
                        <ToggleButtonGroup
                            exclusive
                            fullWidth
                            value={itemType}
                            onChange={(_, val) => val && handleTypeChange(val)}
                        >
                            <ToggleButton value="WEAPON">Weapon</ToggleButton>
                            <ToggleButton value="ARMOR">Armor</ToggleButton>
                            <ToggleButton value="GEAR">Gear</ToggleButton>
                        </ToggleButtonGroup>

                        <GenesysTextField
                            text={formData.description || ''}
                            label="Description"
                            onChange={(e) => handleChange("description", e)}
                            fullwidth
                            rows={3}
                        />

                        <Divider sx={{my: 2}}>
                            <Typography variant="caption" sx={{fontWeight: 'bold', color: 'primary.main'}}>
                                BASIC STATS
                            </Typography>
                        </Divider>

                        <GridContainer>
                            <Grid size={4}>
                                <GenesysNumberField
                                    value={formData.price || 0}
                                    fullwidth
                                    label="Price (Credits)"
                                    onChange={(e) => handleChange('price', e)}
                                />
                            </Grid>
                            <Grid size={4}>
                                <GenesysNumberField
                                    value={formData.encumbrance || 0}
                                    fullwidth
                                    label="Encumbrance"
                                    onChange={(e) => handleChange('encumbrance', e)}
                                />
                            </Grid>
                            <Grid size={4}>
                                <GenesysNumberField
                                    value={formData.rarity || 0}
                                    fullwidth
                                    label="Rarity"
                                    onChange={(e) => handleChange('rarity', e)}
                                />
                            </Grid>
                        </GridContainer>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.restricted || false}
                                    onChange={(e) => handleChange('restricted', e.target.checked)}
                                />
                            }
                            label="Restricted"
                        />
                    </Stack>
                )}

                {tabValue === 1 && (
                    <Stack spacing={3}>
                        <Typography variant="h6" color="primary">
                            {itemType === 'WEAPON' && 'Weapon Statistics'}
                            {itemType === 'ARMOR' && 'Armor Statistics'}
                            {itemType === 'GEAR' && 'Gear Information'}
                        </Typography>
                        {itemType === 'WEAPON' && renderWeaponFields()}
                        {itemType === 'ARMOR' && renderArmorFields()}
                        {itemType === 'GEAR' && renderGearFields()}
                    </Stack>
                )}

                {tabValue === 2 && (
                    <Stack spacing={3}>
                        <Typography variant="body2" color="text.secondary">
                            Qualities and modifiers management will be added here.
                        </Typography>
                    </Stack>
                )}
            </DialogContent>

            <DialogActions sx={{p: 3}}>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" startIcon={<SaveIcon/>} onClick={handleSave}>
                    Save Equipment
                </Button>
            </DialogActions>
        </Dialog>
    );
}