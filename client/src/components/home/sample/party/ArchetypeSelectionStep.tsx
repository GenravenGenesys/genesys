import {type Archetype, OldStatsType, SkillCharacteristic} from "../../../../api/model";
import {Autocomplete, Box, Divider, Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import GenesysTextField from "../../../common/field/GenesysTextField.tsx";
import GridContainer from "../../../common/grid/GridContainer.tsx";
import GenesysNumberField from "../../../common/field/GenesysNumberField.tsx";

interface Props {
    archetype: Archetype;
    archetypes: Archetype[];
    onSave: (archetype: Archetype) => void;
}

export default function ArchetypeSelectionStep(props: Props) {
    const {archetype, archetypes, onSave} = props;
    const [selectedArchetype, setSelectedArchetype] = useState(archetype);
    const headers = ["Name", "Add"];

    const onChangeArchetype = (newArchetype: Archetype) => {
        setSelectedArchetype(newArchetype);
    }

    return (
        <Box sx={{mt: 3}}>
            <Paper sx={{p: 2, mb: 3, gap: 2, alignItems: 'center'}}>
                <Typography variant="subtitle2" color="primary" gutterBottom sx={{fontWeight: 'bold'}}>
                    SELECT Archetype
                </Typography>
                <Autocomplete
                    sx={{mb: 2}}
                    options={archetypes}
                    getOptionLabel={(option) => option.name}
                    value={selectedArchetype}
                    onChange={(_, newValue) => onChangeArchetype(newValue as Archetype)}
                    renderInput={(params) => (
                        <TextField {...params} label="Search Campaign Library..." size="small"
                                   placeholder="Select a archetype..." fullWidth/>)}
                />
            </Paper>
            <Divider sx={{my: 2}}>
                <Typography variant="caption" sx={{fontWeight: 'bold', color: 'primary.main'}}>
                    {selectedArchetype.name}
                </Typography>
            </Divider>
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
                                            label={SkillCharacteristic.Brawn}
                                            onChange={(e) => handleChange('brawn', e)} min={1} max={5}
                                            fullwidth/>
                        <GenesysNumberField value={formData.cunning}
                                            label={SkillCharacteristic.Cunning}
                                            onChange={(e) => handleChange('cunning', e)} min={1} max={5}
                                            fullwidth/>
                    </Grid>
                    <Grid size={4}>
                        <GenesysNumberField value={formData.agility}
                                            label={SkillCharacteristic.Agility}
                                            onChange={(e) => handleChange('agility', e)} min={1} max={5}
                                            fullwidth/>
                        <GenesysNumberField value={formData.willpower}
                                            label={SkillCharacteristic.Willpower}
                                            onChange={(e) => handleChange('willpower', e)} min={1} max={5}
                                            fullwidth/>
                    </Grid>
                    <Grid size={4}>
                        <GenesysNumberField value={formData.intellect}
                                            label={SkillCharacteristic.Intellect}
                                            onChange={(e) => handleChange('intellect', e)} min={1} max={5}
                                            fullwidth/>
                        <GenesysNumberField value={formData.presence}
                                            label={SkillCharacteristic.Presence}
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
            </Stack>
        </Box>
    );
}