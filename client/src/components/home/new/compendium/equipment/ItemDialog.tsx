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
    type ItemTemplate,
    EquipmentType,
} from "../../../../../api/model";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import GenesysTextField from "../../../common/field/GenesysTextField.tsx";
import GenesysNumberField from "../../../common/field/GenesysNumberField.tsx";
import WeaponStatsTab from "./tabs/WeaponStatsTab.tsx";
import ArmorStatsTab from "./tabs/ArmorStatsTab.tsx";
import GearModifiersTab from "./tabs/GearModifiersTab.tsx";
import WeaponModifiersTab from "./tabs/WeaponModifiersTab.tsx";

interface Props {
    open: boolean;
    item: ItemTemplate;
    onClose: () => void;
    onSave: (data: ItemTemplate) => void;
    isNew: boolean;
}

export default function ItemDialog(props: Props) {
    const {open, item, onClose, onSave, isNew} = props;
    const [formData, setFormData] = useState<ItemTemplate>(item || {} as ItemTemplate);
    const [tabValue, setTabValue] = useState(0);
    const [itemType, setItemType] = useState<EquipmentType>(EquipmentType.Weapon);
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

    const handleTypeChange = (newType: EquipmentType) => {
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

    const renderGearFields = () => (
        <Stack spacing={3}>
            <GenesysNumberField
                value={formData.amount}
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
                text={formData.name}
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
                            <ToggleButton value={EquipmentType.Weapon}>Weapon</ToggleButton>
                            <ToggleButton value={EquipmentType.Armor}>Armor</ToggleButton>
                            <ToggleButton value={EquipmentType.Gear}>Gear</ToggleButton>
                        </ToggleButtonGroup>

                        <GenesysTextField
                            text={formData.description}
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
                                    value={formData.price}
                                    fullwidth
                                    label="Price (Credits)"
                                    onChange={(e) => handleChange('price', e)}
                                />
                            </Grid>
                            <Grid size={4}>
                                <GenesysNumberField
                                    value={formData.encumbrance}
                                    fullwidth
                                    label="Encumbrance"
                                    onChange={(e) => handleChange('encumbrance', e)}
                                />
                            </Grid>
                            <Grid size={4}>
                                <GenesysNumberField
                                    value={formData.rarity}
                                    fullwidth
                                    label="Rarity"
                                    onChange={(e) => handleChange('rarity', e)}
                                />
                            </Grid>
                        </GridContainer>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.restricted}
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
                            {itemType === EquipmentType.Weapon && 'Weapon Statistics'}
                            {itemType === EquipmentType.Armor && 'Armor Statistics'}
                            {itemType === EquipmentType.Gear && 'Gear Information'}
                        </Typography>
                        {itemType === EquipmentType.Weapon && <WeaponStatsTab weaponStats={formData.weaponStats}
                                                                              updateWeaponStats={(e) => handleChange("weaponStats", e)}/>}
                        {itemType === EquipmentType.Armor && <ArmorStatsTab armorStats={formData.armorStats}
                                                                            updateArmorStats={(e) => handleChange('armorStats', e)}/>}
                        {itemType === EquipmentType.Gear && renderGearFields()}
                    </Stack>
                )}

                {tabValue === 2 && (
                    <Stack spacing={3}>
                        <Typography variant="h6" color="primary">
                            {itemType === EquipmentType.Weapon && 'Weapon Modifiers'}
                            {itemType === EquipmentType.Armor && 'Armor Modifiers'}
                            {itemType === EquipmentType.Gear && 'Gear Modifiers'}
                        </Typography>
                        {itemType === EquipmentType.Weapon &&
                            <WeaponModifiersTab item={formData} updateItem={setFormData}/>}
                        {itemType === EquipmentType.Gear && <GearModifiersTab
                            gearModifiers={formData.gearModifiers ?? {
                                diceModifiers: [],
                                resultsModifiers: [],
                                upgradeModifiers: [],
                                statModifiers: {wounds: 0, strain: 0, soak: 0, defense: 0, encumbranceThreshold: 0},
                            }}
                            updateGearModifiers={(e) => handleChange('gearModifiers', e)}
                        />}
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