import {useState, useEffect} from 'react';
import {
    Box, Typography, Drawer, TextField, Stack,
    Button, MenuItem, Grid2 as Grid, Divider
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import {CharacteristicType, type Skill, SkillType} from "../../../../api/model";
import GenesysSelectField from "../../../common/field/GenesysSelectField.tsx";

interface Props {
    open: boolean;
    skill: Skill;
    onClose: () => void;
    onSave: (data: Skill) => void;
    isNew: boolean;
}

export default function SkillDrawer(props: Props) {
    const {open, skill, onClose, onSave, isNew} = props;
    const [formData, setFormData] = useState<Skill>(skill || {});

    useEffect(() => {
        if (skill) setFormData(skill);
    }, [skill]);

    const handleChange = <K extends keyof Skill>(field: K, value: Skill[K]) => {
        setFormData((prev: Skill) => ({...prev, [field]: value}));
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            slotProps={{paper: {sx: {width: {xs: '100%', sm: 450}, p: 3, bgcolor: '#0a1929'}}}}
        >
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 3}}>
                <Typography variant="h5" fontWeight="bold">
                    {isNew ? "Create New Skill" : "Edit Skill"}
                </Typography>
                <Button onClick={onClose}><CloseIcon/></Button>
            </Box>

            <Stack spacing={3}>
                <TextField
                    label="Skill Name"
                    fullWidth
                    value={formData.name || ''}
                    onChange={(e) => handleChange("name", e.target.value)}
                />

                <Grid container spacing={2}>
                    <Grid size={6}>
                        <GenesysSelectField value={formData.characteristic} label={"Characteristic"}
                                            onChange={(e) => handleChange("characteristic", e)} options={CharacteristicType}/>
                    </Grid>
                    <Grid size={6}>
                        <GenesysSelectField value={formData.type} label={"Type"}
                                            onChange={(e) => handleChange("type", e)} options={SkillType}/>
                    </Grid>
                </Grid>

                <TextField
                    select
                    label="Range"
                    fullWidth
                    value={formData.range || 'Engaged'}
                    onChange={(e) => handleChange('range', e.target.value)}
                >
                    {['Engaged', 'Short', 'Medium', 'Long', 'Extreme'].map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </TextField>

                <Divider>System Stats</Divider>

                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="Encumbrance"
                            type="number"
                            fullWidth
                            value={formData.encumbrance || 0}
                            onChange={(e) => handleChange('encumbrance', e.target.value)}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Hard Points"
                            type="number"
                            fullWidth
                            value={formData.hp || 0}
                            onChange={(e) => handleChange('hp', e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Box sx={{mt: 'auto', pt: 4, display: 'flex', gap: 2}}>
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<SaveIcon/>}
                        onClick={() => onSave(formData)}
                    >
                        Save Changes
                    </Button>
                    <Button variant="outlined" fullWidth onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Stack>
        </Drawer>
    );
}