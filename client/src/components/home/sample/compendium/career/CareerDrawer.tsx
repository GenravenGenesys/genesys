import {useState, useEffect} from 'react';
import {
    Box, Typography, Drawer, Stack,
    Button,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import {type Career, type Skill} from "../../../../../api/model";
import GenesysTextField from "../../../../common/field/GenesysTextField.tsx";
import CareerSkillSelectField from "./CareerSkillSelectField.tsx";
import {emptyCareer} from "../../../../../models/Template.ts";

interface Props {
    open: boolean;
    career: Career;
    onClose: () => void;
    onSave: (data: Career) => void;
    isNew: boolean;
}

export default function CareerDrawer(props: Props) {
    const {open, career, onClose, onSave, isNew} = props;
    const [formData, setFormData] = useState<Career>(career || {});

    useEffect(() => {
        if (career) setFormData(career);
    }, [career]);

    const handleSkillChange = async (index: number, value: Skill) => {
        const updatedSkills = formData.skills.map((row, i) =>
            i === index ? {...value} : row
        );
        handleChange('skills', updatedSkills);
    };

    const handleChange = <K extends keyof Career>(field: K, value: Career[K]) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleSave = () => {
        onSave(formData);
        setFormData(emptyCareer);
        onClose();
    }

    const handleClose = () => {
        setFormData(emptyCareer);
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
                    {isNew ? "Create New Career" : "Edit Career"}
                </Typography>
                <Button onClick={handleClose}><CloseIcon/></Button>
            </Box>
            <Stack spacing={3}>
                <GenesysTextField text={formData.name || ''} label={"Career Name"}
                                  onChange={(e) => handleChange("name", e)} fullwidth/>
                {formData.skills.map((_skill, index) => (
                        <CareerSkillSelectField skill={formData.skills[index]} formData={formData}
                                                onChange={handleSkillChange} index={index}/>
                    )
                )}
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