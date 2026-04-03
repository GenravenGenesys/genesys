import {type Quality} from "../../../../../api/model";
import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Dialog, DialogActions, DialogContent,
    DialogTitle, Grid,
    Stack,
    Tabs,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {emptyQuality} from "../../../../../models/Template.ts";
import GenesysTextField from "../../../common/field/GenesysTextField.tsx";
import SaveIcon from "@mui/icons-material/Save";
import Tab from "@mui/material/Tab";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import GenesysNumberField from "../../../common/field/GenesysNumberField.tsx";
import GenesysBooleanField from "../../../common/field/GenesysBooleanField.tsx";
import QualityDialogStatsTab from "./QualityDialogStatsTab.tsx";

interface Props {
    open: boolean;
    quality: Quality;
    onClose: () => void;
    onSave: (data: Quality) => void;
    isNew: boolean;
}

export default function QualityDialog(props: Props) {
    const {open, quality, onClose, onSave, isNew} = props;
    const [formData, setFormData] = useState<Quality>(quality || {});
    const [tabValue, setTabValue] = useState(0);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (quality) setFormData(quality);
    }, [quality]);

    const handleChange = <K extends keyof Quality>(field: K, value: Quality[K]) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleSave = () => {
        onSave(formData);
        setFormData(emptyQuality);
        onClose();
    }

    const handleClose = () => {
        setFormData(emptyQuality);
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
            <DialogTitle>{isNew ? "Create Custom Quality" : "Edit Quality"}</DialogTitle>

            <Box sx={{borderBottom: 1, borderColor: 'divider', px: 3}}>
                <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} color="primary" centered>
                    <Tab label="Basic Information"/>
                    <Tab label="Modify Stats"/>
                    {/*<Tab label="Action Logic" disabled={formData.activation !== Activation["Active_(Action)"]}/>*/}
                </Tabs>
            </Box>

            <DialogContent sx={{minHeight: '500px', py: 3}} dividers>
                {tabValue === 0 && (
                    <Stack spacing={3}>
                        <GenesysTextField text={formData.name || ''} label={"Quality Name"}
                                          onChange={(e) => handleChange("name", e)} fullwidth={true}/>
                        <GenesysTextField text={formData.description || ''} label={"Description"}
                                          onChange={(e) => handleChange("description", e)} fullwidth={true} rows={3}/>
                        <GenesysNumberField value={formData.cost} fullwidth
                                            label="Number of Advantages to Activate"
                                            onChange={(e) => handleChange('cost', e)}
                        />
                        <GridContainer>
                            <Grid size={6}>
                                <GenesysBooleanField value={formData.weapon} onChange={(e) => handleChange('weapon', e)}
                                                     label={"Applies to Weapons"}/>
                            </Grid>
                            <Grid size={6}>
                                <GenesysBooleanField value={formData.armor} onChange={(e) => handleChange('armor', e)}
                                                     label={"Applies to Armor"}/>
                            </Grid>
                        </GridContainer>
                    </Stack>
                )}

                {/* TAB 2: MECHANICS */}
                {tabValue === 1 && (
                    <QualityDialogStatsTab stats={formData.stats} updateStats={(e) => handleChange('stats', e)}/>
                )}

                {/* TAB 3: ACTION LOGIC */}
                {tabValue === 2 && (
                    <Box>
                        {/*<ActionLogicBuilder action={formData.action}/>*/}
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{p: 3}}>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
                <Button variant="contained" startIcon={<SaveIcon/>} onClick={handleSave}>
                    Save Quality
                </Button>
            </DialogActions>
        </Dialog>
    );
}