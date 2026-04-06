import {useState, useEffect} from 'react';
import {
    Box, Typography, Stack, Button,
    Grid, Divider, Dialog, useTheme, useMediaQuery, DialogActions, DialogTitle,
    DialogContent, FormControlLabel, Tabs, FormControl, FormGroup, Checkbox
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import {Activation, LimitType, type Talent, Tier} from "../../../../../api/model";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import GenesysTextField from "../../../common/field/GenesysTextField.tsx";
import GenesysSelectField from "../../../common/field/GenesysSelectField.tsx";
import GenesysBooleanField from "../../../common/field/GenesysBooleanField.tsx";
import Tab from "@mui/material/Tab";
import TalentModifyStatsTab from "./tabs/TalentModifyStatsTab.tsx";
import * as React from "react";
import {emptyTalent} from "../../../../../models/Template.ts";

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
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [state, setState] = useState({
        // cost: !(talent.cost.type === CostType.None && talent.limit.type === LimitType.None),
        // careerSkill: talent.talentSkills.potentialCareerSkills.length > 0,
        stats: talent.statModifiers.wounds > 0 || talent.statModifiers.strain > 0 || talent.statModifiers.soak > 0 || talent.statModifiers.defense > 0
    });

    useEffect(() => {
        if (talent) setFormData(talent);
    }, [talent]);

    const handleDescriptionChange = (value: string) => {
        const lowerDescription = value.toLowerCase();
        const updates: Partial<Talent> = {description: value};

        if (lowerDescription.includes('once per session')) {
            updates.limit = {...(formData.limit ?? {}), type: LimitType.Per_Session, limit: 1};
        } else if (lowerDescription.includes('once per encounter')) {
            updates.limit = {...(formData.limit ?? {}), type: LimitType.Per_Encounter, limit: 1};
        } else if (lowerDescription.includes('once per round')) {
            updates.limit = {...(formData.limit ?? {}), type: LimitType.Per_Round, limit: 1};
        }

        if (lowerDescription.includes('use this talent')) {
            updates.activation = Activation['Active_(Action)'];
        }

        setFormData((prev: Talent) => ({...prev, ...updates}));
    };

    const handleChange = <K extends keyof Talent>(field: K, value: Talent[K]) => {
        setFormData((prev: Talent) => ({...prev, [field]: value}));
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const handleSave = () => {
        onSave(formData);
        setFormData(emptyTalent);
        onClose();
    }

    const handleClose = () => {
        setFormData(emptyTalent);
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
                                                    onChange={(e) => handleChange('tier', e)} options={Tier}/>
                            </Grid>
                            <Grid size={6}>
                                <GenesysBooleanField value={formData.ranked} onChange={(e) => handleChange('ranked', e)}
                                                     label={"Ranked Talent"}/>
                            </Grid>
                        </GridContainer>
                        <GenesysSelectField value={formData.activation} label={"Activation"}
                                            onChange={(e) => handleChange('activation', e)} options={Activation}/>
                        <GenesysTextField text={formData.description || ''} label={"Description"}
                                          onChange={(e) => handleDescriptionChange(e)} fullwidth={true} rows={3}/>
                        <GenesysTextField text={formData.summary || ''} label={"Summary"}
                                          onChange={(e) => handleChange("summary", e)} fullwidth={true} rows={3}/>
                        {/*<Collapse in={formData.activation === Activation["Active_(Action)"]}>*/}
                        {/*    <Divider sx={{my: 2}}>*/}
                        {/*        <Typography variant="caption" sx={{fontWeight: 'bold', color: 'primary.main'}}>*/}
                        {/*            ACTION LOGIC*/}
                        {/*        </Typography>*/}
                        {/*    </Divider>*/}
                        {/*    <Stack spacing={2} sx={{p: 2, mt: 1, bgcolor: 'rgba(0, 229, 255, 0.05)', borderRadius: 2}}>*/}
                        {/*<SelectSkillAutocomplete currentSkill={{...formData.action?.skill || null}}*/}
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
                    <TalentModifyStatsTab talent={formData}
                                          updateTalentStats={(stats) => handleChange('statModifiers', stats)}/>
                )}

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
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.stats} onChange={handleStateChange} name="stats"/>
                            }
                            label="Stats"
                            labelPlacement={"top"}
                        />
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