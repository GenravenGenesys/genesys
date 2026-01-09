import {useState, useEffect} from 'react';
import {
    Box, Drawer, Typography, Stack, Button,
    Grid2 as Grid, Divider, IconButton, Collapse, Dialog, useTheme, useMediaQuery, DialogActions, DialogTitle,
    DialogContent, TextField, FormControlLabel, Switch, Tabs
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import {Activation, type Talent, TalentTier} from "../../../../../api/model";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import GenesysTextField from "../../../../common/field/GenesysTextField.tsx";
import GenesysSelectField from "../../../../common/field/GenesysSelectField.tsx";
import GenesysBooleanField from "../../../../common/field/GenesysBooleanField.tsx";
import SelectSkillField from "../SelectSkillField.tsx";
import Tab from "@mui/material/Tab";
import TalentModifierTab from "./tabs/TalentModifierTab.tsx";

interface Props {
    open: boolean;
    talent: Talent;
    onClose: () => void;
    onSave: (data: Talent) => void;
    isNew: boolean;
}

export default function TalentDialog(props: Props) {
    const {open, talent, onClose, onSave, isNew} = props;
    const [formData, setFormData] = useState<Talent>(talent || {});
    const [tabValue, setTabValue] = useState(0);
    const theme = useTheme();
    // Check if screen is smaller than 'md' (960px)
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (talent) setFormData(talent);
    }, [talent]);

    const handleChange = <K extends keyof Talent>(field: K, value: Talent[K]) => {
        setFormData((prev: Talent) => ({...prev, [field]: value}));
    };

    const handleSave = () => {
        onSave(formData);
        setFormData({} as Talent);
        onClose();
    }

    const handleClose = () => {
        setFormData({} as Talent);
        onClose();
    };

    // 2. Modifier Logic (Wounds, Strain, Boost Dice)
    const addModifier = () => {
        const newMod = {target: 'WOUND_THRESHOLD', value: 1, type: 'ADD', talentId: null, diceType: null};
        handleChange('modifiers', [...formData.modifiers, newMod]);
    };

    const removeModifier = (index: number) => {
        handleChange('modifiers', formData.modifiers.filter((_, i) => i !== index));
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
                    <Tab label="Modifiers"/>
                    <Tab label="Action Logic" disabled={formData.activation !== Activation["Active_(Action)"]}/>
                </Tabs>
            </Box>

            <DialogContent sx={{minHeight: '500px', py: 3}} dividers>
                {tabValue === 0 && (
                    <Stack spacing={3}>
                        <GenesysTextField text={formData.name || ''} label={"Talent Name"}
                                          onChange={(e) => handleChange("name", e)} fullwidth={true}/>
                        <GridContainer spacing={2}>
                            <Grid size={6}>
                                <GenesysSelectField value={formData.tier} label={"Tier"}
                                                    onChange={(e) => handleChange('tier', e)} options={TalentTier}/>
                            </Grid>
                            <Grid size={6}>
                                <GenesysBooleanField value={formData.ranked} onChange={(e) => handleChange('ranked', e)}
                                                     label={"Ranked Talent"}/>
                            </Grid>
                        </GridContainer>
                        <GenesysSelectField value={formData.activation} label={"Activation"}
                                            onChange={(e) => handleChange('activation', e)} options={Activation}/>
                        <GenesysTextField text={formData.description || ''} label={"Description"}
                                          onChange={(e) => handleChange("description", e)} fullwidth={true} rows={3}/>
                        <GenesysTextField text={formData.summary || ''} label={"Summary"}
                                          onChange={(e) => handleChange("summary", e)} fullwidth={true} rows={3}/>
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
                {tabValue === 1 && (
                    <TalentModifierTab talent={formData}
                                       updateTalentStats={(stats) => handleChange('talentStats', stats)}/>
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
                    Save Talent
                </Button>
            </DialogActions>
        </Dialog>
        // <Dialog
        //     open={open}
        //     onClose={handleClose}
        //     fullWidth
        //     fullScreen={fullScreen}
        //     maxWidth="md"
        //     scroll="paper"
        //     slotProps={{paper: {sx: {borderRadius: 4, bgcolor: '#050c14', backgroundImage: 'none'}}}}
        // >
        //     <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        //         <Typography variant="h5" fontWeight="bold">{isNew ? "Create Custom Talent" : "Edit Talent"}</Typography>
        //         <IconButton onClick={handleClose}><CloseIcon/></IconButton>
        //     </DialogTitle>
        //     <DialogContent dividers>
        //         <Stack spacing={3}>
        //             <GenesysTextField text={formData.name || ''} label={"Talent Name"}
        //                               onChange={(e) => handleChange("name", e)} fullwidth={true}/>
        //             <GridContainer spacing={2}>
        //                 <Grid size={6}>
        //                     <GenesysSelectField value={formData.tier} label={"Tier"}
        //                                         onChange={(e) => handleChange('tier', e)} options={TalentTier}/>
        //                 </Grid>
        //                 <Grid size={6}>
        //                     <GenesysBooleanField value={formData.ranked} onChange={(e) => handleChange('ranked', e)}
        //                                          label={"Ranked Talent"}/>
        //                 </Grid>
        //             </GridContainer>
        //             <GenesysSelectField value={formData.activation} label={"Activation"}
        //                                 onChange={(e) => handleChange('activation', e)} options={Activation}/>
        //             <GenesysTextField text={formData.description || ''} label={"Description"}
        //                               onChange={(e) => handleChange("description", e)} fullwidth={true} rows={3}/>
        //             <Collapse in={formData.activation === Activation["Active_(Action)"]}>
        //                 <Divider sx={{my: 2}}>
        //                     <Typography variant="caption" sx={{fontWeight: 'bold', color: 'primary.main'}}>
        //                         ACTION LOGIC
        //                     </Typography>
        //                 </Divider>
        //                 <Stack spacing={2} sx={{p: 2, mt: 1, bgcolor: 'rgba(0, 229, 255, 0.05)', borderRadius: 2}}>
        //                     <SelectSkillField currentSkill={{...formData.action?.skill || null}}
        //                                       handleSkillSelect={(selectedSkill) => handleChange('action', {
        //                                           ...formData.action,
        //                                           skill: {...selectedSkill, ranks: 0}
        //                                       })}/>
        //                 </Stack>
        //             </Collapse>
        //         </Stack>
        //     </DialogContent>
        //     <DialogActions sx={{p: 3}}>
        //         <Button variant="outlined" onClick={onClose}>Cancel</Button>
        //         <Button variant="contained" startIcon={<SaveIcon/>} onClick={handleSave}>
        //             Save Talent
        //         </Button>
        //     </DialogActions>
        // </Dialog>
    );
}