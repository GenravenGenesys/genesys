import {useState, useEffect} from 'react';
import {
    Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Tabs, Tab, Stack, IconButton,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import {type Career, type Skill} from "../../../../../api/model";
import GenesysTextField from "../../../common/field/GenesysTextField.tsx";
import CareerSkillSelectField from "./CareerSkillSelectField.tsx";
import CareerGearTab from "./CareerGearTab.tsx";
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
    const [formData, setFormData] = useState<Career>(emptyCareer);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        if (open) {
            setFormData(career ?? emptyCareer);
            setTab(0);
        }
    }, [open, career]);

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
        setTab(0);
        onClose();
    };

    const handleClose = () => {
        setFormData(emptyCareer);
        setTab(0);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{sx: {bgcolor: '#0a1929', minHeight: '60vh'}}}
        >
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1}}>
                <Typography variant="h5" component="span" fontWeight="bold">
                    {isNew ? "Create New Career" : "Edit Career"}
                </Typography>
                <IconButton onClick={handleClose} size="small">
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            <Box sx={{px: 3, pb: 1}}>
                <GenesysTextField text={formData.name || ''} label={"Career Name"}
                                  onChange={(e) => handleChange("name", e)} fullwidth/>
                <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{mt: 2}}>
                    <Tab label="Career Skills"/>
                    <Tab label="Starting Gear"/>
                </Tabs>
            </Box>

            <DialogContent dividers sx={{pt: 2}}>
                {tab === 0 && (
                    <Stack spacing={2}>
                        {formData.skills.map((_skill, index) => (
                            <CareerSkillSelectField
                                key={index}
                                skill={formData.skills[index]}
                                formData={formData}
                                onChange={handleSkillChange}
                                index={index}
                            />
                        ))}
                    </Stack>
                )}
                {tab === 1 && (
                    <CareerGearTab formData={formData} onChange={handleChange}/>
                )}
            </DialogContent>

            <DialogActions sx={{px: 3, pb: 2}}>
                <Button variant="outlined" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" startIcon={<SaveIcon/>} onClick={handleSave}>
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}