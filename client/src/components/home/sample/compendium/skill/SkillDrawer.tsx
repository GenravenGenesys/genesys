import {useState, useEffect} from 'react';
import {
    Box, Typography, Drawer, Stack,
    Button, Grid
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import {type Skill, CharacteristicType, SkillType} from "../../../../../api/model";
import GenesysSelectField from "../../../../common/field/GenesysSelectField.tsx";
import GenesysBooleanField from "../../../../common/field/GenesysBooleanField.tsx";
import GenesysTextField from "../../../../common/field/GenesysTextField.tsx";
import GridContainer from "../../../../common/grid/GridContainer.tsx";

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

    const handleSave = () => {
        onSave(formData);
        setFormData({} as Skill);
        onClose();
    }

    const handleClose = () => {
        setFormData({} as Skill);
        onClose();
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
            slotProps={{paper: {sx: {width: {xs: '100%', sm: 450}, p: 3, bgcolor: '#0a1929'}}}}
        >
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 3}}>
                <Typography variant="h5" fontWeight="bold">
                    {isNew ? "Create New Skill" : "Edit Skill"}
                </Typography>
                <Button onClick={handleClose}><CloseIcon/></Button>
            </Box>
            <Stack spacing={3}>
                <GenesysTextField text={formData.name || ''} label={"Skill Name"}
                                  onChange={(e) => handleChange("name", e)} fullwidth={true}/>
                <GridContainer spacing={2}>
                    <Grid size={6}>
                        <GenesysSelectField value={formData.characteristic} label={"Characteristic"}
                                            onChange={(e) => handleChange("characteristic", e)}
                                            options={CharacteristicType}/>
                    </Grid>
                    <Grid size={6}>
                        <GenesysSelectField value={formData.type} label={"Type"}
                                            onChange={(e) => handleChange("type", e)} options={SkillType}/>
                    </Grid>
                </GridContainer>
                <GenesysBooleanField value={formData.initiative} onChange={(e) => handleChange("initiative", e)}
                                     label={"Used for Initiative"}/>
                <GenesysTextField text={formData.summary || ''} label={"Summary"}
                                  placeholder={"A short one-line description of the skill."}
                                  onChange={(e) => handleChange("summary", e)} fullwidth/>
                <GenesysTextField text={formData.description || ''} label={"Description"} rows={3}
                                  placeholder={"A longer description of the skill."}
                                  onChange={(e) => handleChange("description", e)} fullwidth/>
                <Box sx={{mt: 'auto', pt: 4, display: 'flex', gap: 2}}>
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<SaveIcon/>}
                        onClick={handleSave}
                    >
                        Save Changes
                    </Button>
                    <Button variant="outlined" fullWidth onClick={handleClose}>
                        Cancel
                    </Button>
                </Box>
            </Stack>
        </Drawer>
    );
}