import {useState, useEffect} from 'react';
import {
    Box, Drawer, Typography, Stack, Button,
    Grid2 as Grid, Divider, IconButton, Collapse
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import {Activation, type Talent, TalentTier} from "../../../../api/model";
import GridContainer from "../../../common/grid/GridContainer.tsx";
import GenesysTextField from "../../../common/field/GenesysTextField.tsx";
import GenesysSelectField from "../../../common/field/GenesysSelectField.tsx";
import GenesysBooleanField from "../../../common/field/GenesysBooleanField.tsx";
import SelectSkillField from "./SelectSkillField.tsx";

interface Props {
    open: boolean;
    talent: Talent;
    onClose: () => void;
    onSave: (data: Talent) => void;
    isNew: boolean;
}

export default function TalentDrawer(props: Props) {
    const {open, talent, onClose, onSave, isNew} = props;
    const [formData, setFormData] = useState<Talent>(talent || {});
    const [modifierCollasped, setModifierCollapsed] = useState(false);

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
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
            slotProps={{paper: {sx: {width: {xs: '100%', sm: 450}, p: 3, bgcolor: '#0a1929'}}}}
        >
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
                <Typography variant="h5" fontWeight="bold">
                    {isNew ? "Create Custom Talent" : "Edit Talent"}
                </Typography>
                <IconButton onClick={handleClose}><CloseIcon/></IconButton>
            </Box>

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
                {/* AUTOMATION: MODIFIERS (Stats/Dice) */}
                {/*<Divider sx={{ my: 2 }}><Typography variant="caption" sx={{ fontWeight: 'bold', color: 'primary.main' }}>STAT & DICE MODIFIERS</Typography></Divider>*/}

                {/*{formData.modifiers.map((mod, index) => (*/}
                {/*    <Paper key={index} variant="outlined" sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)' }}>*/}
                {/*        <Grid container spacing={1} alignItems="center">*/}
                {/*            <Grid size={5}>*/}
                {/*                <TextField select label="Target" size="small" fullWidth value={mod.target} onChange={(e) => {*/}
                {/*                    const newMods = [...formData.modifiers];*/}
                {/*                    newMods[index].target = e.target.value;*/}
                {/*                    handleChange('modifiers', newMods);*/}
                {/*                }}>*/}
                {/*                    <MenuItem value="WOUND_THRESHOLD">Wounds</MenuItem>*/}
                {/*                    <MenuItem value="STRAIN_THRESHOLD">Strain</MenuItem>*/}
                {/*                    <MenuItem value="SOAK">Soak</MenuItem>*/}
                {/*                    <MenuItem value="DICE_BOOST">Boost Die [B]</MenuItem>*/}
                {/*                    <MenuItem value="DICE_SETBACK">Setback Die [S]</MenuItem>*/}
                {/*                </TextField>*/}
                {/*            </Grid>*/}
                {/*            <Grid size={3}>*/}
                {/*                <TextField label="Value" type="number" size="small" fullWidth value={mod.value} onChange={(e) => {*/}
                {/*                    const newMods = [...formData.modifiers];*/}
                {/*                    newMods[index].value = parseInt(e.target.value);*/}
                {/*                    handleChange('modifiers', newMods);*/}
                {/*                }} />*/}
                {/*            </Grid>*/}
                {/*            <Grid size={3}>*/}
                {/*                {mod.target.startsWith('DICE') && (*/}
                {/*                    <TextField select label="Talent" size="small" fullWidth value={mod.talentId} onChange={(e) => {*/}
                {/*                        const newMods = [...formData.modifiers];*/}
                {/*                        newMods[index].talentId = e.target.value;*/}
                {/*                        handleChange('modifiers', newMods);*/}
                {/*                    }}>*/}
                {/*                        {campaignTalents.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}*/}
                {/*                    </TextField>*/}
                {/*                )}*/}
                {/*            </Grid>*/}
                {/*            <Grid size={1}>*/}
                {/*                <IconButton onClick={() => removeModifier(index)} color="error"><DeleteIcon fontSize="small" /></IconButton>*/}
                {/*            </Grid>*/}
                {/*        </Grid>*/}
                {/*    </Paper>*/}
                {/*))}*/}
                {/*<Button startIcon={<AddIcon />} onClick={addModifier}>Add Modifier</Button>*/}

                <Collapse in={formData.activation === Activation["Active_(Action)"]}>
                    <Divider sx={{my: 2}}>
                        <Typography variant="caption" sx={{fontWeight: 'bold', color: 'primary.main'}}>
                            ACTION LOGIC
                        </Typography>
                    </Divider>
                    <Stack spacing={2} sx={{p: 2, mt: 1, bgcolor: 'rgba(0, 229, 255, 0.05)', borderRadius: 2}}>
                        <SelectSkillField currentSkill={{...formData.action?.skill || null}}
                                          handleSkillSelect={(selectedSkill) => handleChange('action', {
                                              ...formData.action,
                                              skill: {...selectedSkill, ranks: 0}
                                          })}/>
                        {/*<TextField*/}
                        {/*    select*/}
                        {/*    label="Roll Skill"*/}
                        {/*    fullWidth*/}
                        {/*    size="small"*/}
                        {/*    value={formData.action.skillId}*/}
                        {/*    onChange={(e) => handleChange('action', {...formData.action, skillId: e.target.value})}*/}
                        {/*>*/}
                        {/*    {campaignSkills.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}*/}
                        {/*</TextField>*/}

                        {/*<FormControlLabel*/}
                        {/*    control={*/}
                        {/*        <Switch*/}
                        {/*            size="small"*/}
                        {/*            checked={formData.action.isOpposed}*/}
                        {/*            onChange={(e) => handleChange('action', {*/}
                        {/*                ...formData.action,*/}
                        {/*                isOpposed: e.target.checked*/}
                        {/*            })}*/}
                        {/*        />*/}
                        {/*    }*/}
                        {/*    label="Is an Opposed Check?"*/}
                        {/*/>*/}

                        {/* 3. Nested Collapse for Opposed Skills */}
                        {/*<Collapse in={formData.action.isOpposed}>*/}
                        {/*    <Box sx={{pt: 1}}>*/}
                        {/*        /!*<TextField*!/*/}
                        {/*        /!*    select*!/*/}
                        {/*        /!*    label="Target Resists with..."*!/*/}
                        {/*        /!*    fullWidth*!/*/}
                        {/*        /!*    size="small"*!/*/}
                        {/*        /!*    value={formData.action.opposedSkillId}*!/*/}
                        {/*        /!*    onChange={(e) => handleChange('action', {*!/*/}
                        {/*        /!*        ...formData.action,*!/*/}
                        {/*        /!*        opposedSkillId: e.target.value*!/*/}
                        {/*        /!*    })}*!/*/}
                        {/*        /!*>*!/*/}
                        {/*        /!*    {campaignSkills.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}*!/*/}
                        {/*        /!*</TextField>*!/*/}
                        {/*    </Box>*/}
                        {/*</Collapse>*/}
                    </Stack>
                </Collapse>

                <Box sx={{mt: 4, display: 'flex', gap: 2}}>
                    <Button variant="contained" fullWidth startIcon={<SaveIcon/>} onClick={handleSave}>
                        Save Talent
                    </Button>
                    <Button variant="outlined" fullWidth onClick={onClose}>Cancel</Button>
                </Box>
            </Stack>
        </Drawer>
    );
}