import {type Archetype, OldStatsType, CharacteristicType} from "../../../../../api/model";
import {useEffect, useState} from "react";
import {
    Box, Button, Dialog, DialogActions,
    DialogContent,
    DialogTitle, Divider, Grid,
    Stack,
    Tabs, Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {emptyArchetype} from "../../../../../models/Template.ts";
import Tab from "@mui/material/Tab";
import GenesysTextField from "../../../../common/field/GenesysTextField.tsx";
import SaveIcon from "@mui/icons-material/Save";
import GenesysNumberField from "../../../../common/field/GenesysNumberField.tsx";
import GridContainer from "../../../../common/grid/GridContainer.tsx";

interface Props {
    open: boolean;
    archetype: Archetype;
    onClose: () => void;
    onSave: (data: Archetype) => void;
    isNew: boolean;
}

export default function ArchetypeDialog(props: Props) {
    const {open, archetype, onClose, onSave, isNew} = props;
    const [formData, setFormData] = useState<Archetype>(archetype || {});
    const [tabValue, setTabValue] = useState(0);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (archetype) setFormData(archetype);
    }, [archetype]);

    const handleChange = <K extends keyof Archetype>(field: K, value: Archetype[K]) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleSave = () => {
        onSave(formData);
        setFormData(emptyArchetype);
        onClose();
    }

    const handleClose = () => {
        setFormData(emptyArchetype);
        onClose();
    };

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
            <DialogTitle>{isNew ? "Create Custom Archetype" : "Edit Archetype"}</DialogTitle>

            <Box sx={{borderBottom: 1, borderColor: 'divider', px: 3}}>
                <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} color="primary" centered>
                    <Tab label="Basic Information"/>
                    <Tab label="Modify Stats"/>
                </Tabs>
            </Box>

            <DialogContent sx={{minHeight: '500px', py: 3}} dividers>
                {tabValue === 0 && (
                    <Stack spacing={3}>
                        <GenesysTextField text={formData.name || ''} label={"Archetype Name"}
                                          onChange={(e) => handleChange("name", e)} fullwidth/>
                        <GenesysTextField text={formData.description || ''} label={"Description"}
                                          onChange={(e) => handleChange("description", e)} fullwidth rows={3}/>
                        <Divider sx={{my: 2}}>
                            <Typography variant="caption" sx={{fontWeight: 'bold', color: 'primary.main'}}>
                                Characteristics
                            </Typography>
                        </Divider>
                        <GridContainer>
                            <Grid size={4}>
                                <GenesysNumberField value={formData.brawn}
                                                    label={CharacteristicType.Brawn}
                                                    onChange={(e) => handleChange('brawn', e)} min={1} max={5}
                                                    fullwidth/>
                                <GenesysNumberField value={formData.cunning}
                                                    label={CharacteristicType.Cunning}
                                                    onChange={(e) => handleChange('cunning', e)} min={1} max={5}
                                                    fullwidth/>
                            </Grid>
                            <Grid size={4}>
                                <GenesysNumberField value={formData.agility}
                                                    label={CharacteristicType.Agility}
                                                    onChange={(e) => handleChange('agility', e)} min={1} max={5}
                                                    fullwidth/>
                                <GenesysNumberField value={formData.willpower}
                                                    label={CharacteristicType.Willpower}
                                                    onChange={(e) => handleChange('willpower', e)} min={1} max={5}
                                                    fullwidth/>
                            </Grid>
                            <Grid size={4}>
                                <GenesysNumberField value={formData.intellect}
                                                    label={CharacteristicType.Intellect}
                                                    onChange={(e) => handleChange('intellect', e)} min={1} max={5}
                                                    fullwidth/>
                                <GenesysNumberField value={formData.presence}
                                                    label={CharacteristicType.Presence}
                                                    onChange={(e) => handleChange('presence', e)} min={1} max={5}
                                                    fullwidth/>
                            </Grid>
                        </GridContainer>
                        <GridContainer>
                            <Grid size={6}>
                                <GenesysNumberField value={formData.wounds || 0} fullwidth
                                                    label={OldStatsType.Wounds + ' Threshold'}
                                                    onChange={(e) => handleChange('wounds', e)}/>
                            </Grid>
                            <Grid size={6}>
                                <GenesysNumberField value={formData.strain || 0} fullwidth
                                                    label={OldStatsType.Strain + ' Threshold'}
                                                    onChange={(e) => handleChange('strain', e)}/>
                            </Grid>
                        </GridContainer>
                        <GridContainer>
                            <Grid size={12}>
                                <GenesysNumberField value={formData.experience || 0} fullwidth
                                                    label={'Starting Experience'}
                                                    onChange={(e) => handleChange('experience', e)}/>
                            </Grid>
                        </GridContainer>
                    </Stack>
                )}
            </DialogContent>
            <DialogActions sx={{p: 3}}>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
                <Button variant="contained" startIcon={<SaveIcon/>} onClick={handleSave}>
                    Save Archetype
                </Button>
            </DialogActions>
        </Dialog>
    );
}