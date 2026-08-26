import type {CriticalInjury, Quality} from "../../../../../api/model";
import {useEffect, useState} from "react";
import {
    Box, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Tabs,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {emptyCriticalInjury} from "../../../../../models/Template.ts";
import Tab from "@mui/material/Tab";
import GenesysTextField from "../../../common/field/GenesysTextField.tsx";
import GenesysNumberField from "../../../common/field/GenesysNumberField.tsx";
import QualityDialogStatsTab from "../quality/QualityDialogStatsTab.tsx";
import SaveIcon from "@mui/icons-material/Save";
import CriticalInjuryStatsTab from "./CriticalInjuryStatsTab.tsx";

interface Props {
    open: boolean;
    injury: CriticalInjury;
    onClose: () => void;
    onSave: (data: CriticalInjury) => void;
    isNew: boolean;
}

export default function CriticalInjuryDialog(props: Props) {
    const {open, injury, onClose, onSave, isNew} = props;
    const [formData, setFormData] = useState<CriticalInjury>(injury || {});
    const [tabValue, setTabValue] = useState(0);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (injury) setFormData(injury);
    }, [injury]);

    const handleChange = <K extends keyof CriticalInjury>(field: K, value: CriticalInjury[K]) => {
        setFormData((prev: CriticalInjury) => ({...prev, [field]: value}));
    };

    const handleSave = () => {
        onSave(formData);
        setFormData(emptyCriticalInjury);
        onClose();
    }

    const handleClose = () => {
        setFormData(emptyCriticalInjury);
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
            <DialogTitle>{isNew ? "Create Custom Injury" : "Edit Injury"}</DialogTitle>

            <Box sx={{borderBottom: 1, borderColor: 'divider', px: 3}}>
                <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} color="primary" centered>
                    <Tab label="Basic Information"/>
                    <Tab label="Modify Stats"/>
                </Tabs>
            </Box>

            <DialogContent sx={{minHeight: '500px', py: 3}} dividers>
                {tabValue === 0 && (
                    <Stack spacing={3}>
                        <GenesysTextField text={formData.name || ''} label={"Injury Name"}
                                          onChange={(e) => handleChange("name", e)} fullwidth={true}/>
                        <GenesysTextField text={formData.description || ''} label={"Description"}
                                          onChange={(e) => handleChange("description", e)} fullwidth={true} rows={3}/>
                    </Stack>
                )}

                {tabValue === 1 && (
                    <CriticalInjuryStatsTab stats={formData.stats} updateStats={(e) => handleChange('stats', e)}/>
                )}
            </DialogContent>

            <DialogActions sx={{p: 3}}>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
                <Button variant="contained" startIcon={<SaveIcon/>} onClick={handleSave}>
                    Save Critical Injury
                </Button>
            </DialogActions>
        </Dialog>
    );
}