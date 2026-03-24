import {type Quality} from "../../../../../api/model";
import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Dialog, DialogActions, DialogContent,
    DialogTitle, Divider, FormControl, FormGroup, Grid,
    Stack,
    Tabs,
    Typography,
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
            <DialogTitle>{isNew ? "Create Custom Talent" : "Edit Talent"}</DialogTitle>

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
                        <GenesysTextField text={formData.name || ''} label={"Talent Name"}
                                          onChange={(e) => handleChange("name", e)} fullwidth={true}/>
                        {/*<GenesysSelectField value={formData.activation} label={"Activation"}*/}
                        {/*                    onChange={(e) => handleChange('activation', e)} options={Activation}/>*/}
                        <GenesysTextField text={formData.description || ''} label={"Description"}
                                          onChange={(e) => handleChange("description", e)} fullwidth={true} rows={3}/>
                        <GenesysNumberField value={formData.cost || 2} fullwidth
                                            label="Number of Advantages to Activate"
                                            onChange={(e) => handleChange('cost', e)}
                                            min={0}
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
                        {/*<GenesysTextField text={formData.summary || ''} label={"Summary"}*/}
                        {/*                  onChange={(e) => handleChange("summary", e)} fullwidth={true} rows={3}/>*/}
                        {/*<Collapse in={formData.activation === Activation["Active_(Action)"]}>*/}
                        {/*    <Divider sx={{my: 2}}>*/}
                        {/*        <Typography variant="caption" sx={{fontWeight: 'bold', color: 'primary.main'}}>*/}
                        {/*            ACTION LOGIC*/}
                        {/*        </Typography>*/}
                        {/*    </Divider>*/}
                        {/*    <Stack spacing={2} sx={{p: 2, mt: 1, bgcolor: 'rgba(0, 229, 255, 0.05)', borderRadius: 2}}>*/}
                        {/*<SelectSkillField currentSkill={{...formData.action?.skill || null}}*/}
                        {/*                  handleSkillSelect={(selectedSkill) => handleChange('action', {*/}
                        {/*                      ...formData.action,*/}
                        {/*                      skill: {...selectedSkill, ranks: 0}*/}
                        {/*                  })}/>*/}
                        {/*    </Stack>*/}
                        {/*</Collapse>*/}
                    </Stack>
                )}

                {/* TAB 2: MECHANICS */}
                {/*{tabValue === 1 && (*/}
                {/*    <TalentModifyStatsTab talent={formData}*/}
                {/*                          updateTalentStats={(stats) => handleChange('statModifiers', stats)}/>*/}
                {/*)}*/}

                {/* TAB 3: ACTION LOGIC */}
                {tabValue === 2 && (
                    <Box>
                        {/*<ActionLogicBuilder action={formData.action}/>*/}
                    </Box>
                )}
            </DialogContent>
            <Divider sx={{my: 2}}>
                <Typography variant="caption" sx={{fontWeight: 'bold', color: 'primary.main'}}>
                    MODIFICATION OPTIONS
                </Typography>
            </Divider>
            <GridContainer centered>
                <FormControl component="fieldset" variant="standard">
                    {/*<FormControl sx={{m: 3}} component="fieldset" variant="standard">*/}
                    {/*<FormLabel component="legend" sx={{textAlign: 'center'}}>Talent Modifiers</FormLabel>*/}
                    <FormGroup row>
                        {/*<FormControlLabel*/}
                        {/*    control={*/}
                        {/*        <Checkbox checked={state.cost} onChange={handleChange} name="cost"/>*/}
                        {/*    }*/}
                        {/*    label="Cost"*/}
                        {/*/>*/}
                        {/*<FormControlLabel*/}
                        {/*    control={*/}
                        {/*        <Checkbox checked={state.careerSkill} onChange={handleChange} name="careerSkill"/>*/}
                        {/*    }*/}
                        {/*    label="Career Skills"*/}
                        {/*/>*/}
                        {/*<FormControlLabel*/}
                        {/*    control={*/}
                        {/*        <Checkbox checked={state.stats} onChange={handleStateChange} name="stats"/>*/}
                        {/*    }*/}
                        {/*    label="Stats"*/}
                        {/*    labelPlacement={"top"}*/}
                        {/*/>*/}
                    </FormGroup>
                </FormControl>
            </GridContainer>

            <DialogActions sx={{p: 3}}>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
                <Button variant="contained" startIcon={<SaveIcon/>} onClick={handleSave}>
                    Save Talent
                </Button>
            </DialogActions>
        </Dialog>
    );
}