import {
    Box, Button, Checkbox, Container,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl, FormControlLabel, FormGroup,
    Grid, Paper,
    Stack, Step, StepLabel, Stepper,
    Tabs,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import Tab from "@mui/material/Tab";
import {Activation, type PlayerCharacter, type Talent, TalentTier} from "../../../../api/model";
import GenesysTextField from "../../../common/field/GenesysTextField.tsx";
import GridContainer from "../../../common/grid/GridContainer.tsx";
import GenesysSelectField from "../../../common/field/GenesysSelectField.tsx";
import GenesysBooleanField from "../../../common/field/GenesysBooleanField.tsx";
import TalentModifyStatsTab from "../compendium/talent/tabs/TalentModifyStatsTab.tsx";
import SaveIcon from "@mui/icons-material/Save";
import {useEffect, useState} from "react";
import {emptyTalent} from "../../../../models/Template.ts";

interface Props {
    open: boolean;
    talent: PlayerCharacter;
    onClose: () => void;
    onSave: (data: PlayerCharacter) => void;
}

export default function PlayerCreationDialog(props: Props) {
    const {open, talent, onClose, onSave} = props;
    const [formData, setFormData] = useState<PlayerCharacter>(talent || {});
    const [activeStep, setActiveStep] = useState(0);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (talent) setFormData(talent);
    }, [talent]);

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleChange = <K extends keyof PlayerCharacter>(field: K, value: PlayerCharacter[K]) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <StepIdentity/>;
            case 1:
                return <StepSkills/>;
            case 2:
                return <Typography sx={{mt: 4}}>Archetype Creator would go here...</Typography>;
            case 3:
                return <Typography sx={{mt: 4}}>Career Creator would go here...</Typography>;
            default:
                return null;
        }
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
            <Container maxWidth="md" sx={{py: 8}}>
                <Paper elevation={3} sx={{p: 6, borderRadius: 4}}>
                    <Box sx={{mb: 4, textAlign: 'center'}}>
                        <Typography variant="h4" fontWeight="bold" color="primary">
                            Create New Player Character
                        </Typography>
                        <Typography color="text.secondary">
                            Follow these steps to create a new Player Characters.
                        </Typography>
                    </Box>

                    <Stepper activeStep={activeStep}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Box sx={{minHeight: '400px'}}>
                        {renderStepContent(activeStep)}
                    </Box>

                    <Divider sx={{my: 4}}/>

                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                            Back
                        </Button>
                        <Box>
                            {activeStep === steps.length - 1 ? (
                                <Button variant="contained" color="success" startIcon={<SaveIcon/>}
                                        onClick={onCreate}>
                                    Create Setting
                                </Button>
                            ) : (
                                <Button variant="contained" onClick={handleNext}>
                                    Next Step
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Dialog>
    );
}