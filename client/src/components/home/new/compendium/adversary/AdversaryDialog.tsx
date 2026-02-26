import {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Stack,
    Tabs,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import {type AdversaryTemplate, AdversaryTemplateType,} from "../../../../../api/model";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import GenesysTextField from "../../../common/field/GenesysTextField.tsx";
import Tab from "@mui/material/Tab";
import GenesysNumberField from "../../../common/field/GenesysNumberField.tsx";
import AdversaryCharacteristics from "./AdversaryCharacteristics.tsx";
import AdversaryRatings from "./AdversaryRatings.tsx";
import AdversarySkillManager from "./AdversarySkillManager.tsx";
import {StatsType} from "../../../../../models/StatsType.ts";

interface Props {
    open: boolean;
    adversary: AdversaryTemplate;
    onClose: () => void;
    onSave: (data: AdversaryTemplate) => void;
    isNew: boolean;
}

export default function AdversaryDialog(props: Props) {
    const {open, adversary, onClose, onSave, isNew} = props;
    const [formData, setFormData] = useState<AdversaryTemplate>(adversary || {});
    const [tabValue, setTabValue] = useState(0);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (adversary) setFormData(adversary);
    }, [adversary]);

    const handleChange = <K extends keyof AdversaryTemplate>(field: K, value: AdversaryTemplate[K]) => {
        setFormData((prev: AdversaryTemplate) => ({...prev, [field]: value}));
    };

    const handleThresholdChange = <K extends StatsType>(field: K, value: number) => {
        setFormData((prev: AdversaryTemplate) => ({
            ...prev,
            derivedStats: {
                ...prev.derivedStats,
                [field === StatsType.Wounds ? 'woundThreshold' : 'strainThreshold']: {
                    ...prev.derivedStats[field === StatsType.Wounds ? 'woundThreshold' : 'strainThreshold'],
                    total: value
                }
            }
        }));
    };

    const handleSave = () => {
        onSave(formData);
        setFormData({} as AdversaryTemplate);
        onClose();
    }

    const handleClose = () => {
        setFormData({} as AdversaryTemplate);
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
            <DialogTitle>{isNew ? "Create Custom " + formData.type : "Edit Adversary"}</DialogTitle>
            <GenesysTextField text={formData.name || ''} label={"Adversary Name"}
                              onChange={(e) => handleChange("name", e)} fullwidth/>
            <Box sx={{borderBottom: 1, borderColor: 'divider', px: 3}}>
                <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} color="primary" centered>
                    <Tab label="Basic Information"/>
                    <Tab label="Skills"/>
                    <Tab label="Talents and Abilities"/>
                    <Tab label="Equipment"/>
                </Tabs>
            </Box>

            <DialogContent sx={{minHeight: '500px', py: 3}} dividers>
                {tabValue === 0 && (
                    <Stack spacing={3}>
                        <ToggleButtonGroup
                            exclusive
                            fullWidth
                            value={formData.type}
                            onChange={(_, val) => val && handleChange("type", val)}
                        >
                            {Object.values(AdversaryTemplateType).map((type: AdversaryTemplateType) => (
                                <ToggleButton key={type} value={type}>
                                    {type}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                        <GenesysTextField text={formData.description || ''} label={"Description"}
                                          onChange={(e) => handleChange("description", e)} fullwidth rows={3}/>
                        <Divider sx={{my: 2}}>
                            <Typography variant="caption" sx={{fontWeight: 'bold', color: 'primary.main'}}>
                                CHARACTERISTICS
                            </Typography>
                        </Divider>
                        <AdversaryCharacteristics characteristics={formData.characteristics}
                                                  updateCharacteristics={(characteristics) => handleChange('characteristics', characteristics)}/>
                        <Divider sx={{my: 2}}>
                            <Typography variant="caption" sx={{fontWeight: 'bold', color: 'primary.main'}}>
                                RATINGS
                            </Typography>
                        </Divider>
                        <AdversaryRatings ratings={formData.ratings}
                                          updateRatings={(updatedRating) => handleChange('ratings', updatedRating)}/>
                        <GridContainer>
                            <Grid size={formData.type === AdversaryTemplateType.Nemesis ? 6 : 12}>
                                <GenesysNumberField value={formData.derivedStats.woundThreshold.total || 0} fullwidth
                                                    label={StatsType.Wounds + ' Threshold'}
                                                    onChange={(e) => handleThresholdChange(StatsType.Wounds, e)}/>
                            </Grid>
                            {formData.type === AdversaryTemplateType.Nemesis && <Grid size={6}>
                                <GenesysNumberField value={formData.derivedStats.strainThreshold.total || 0} fullwidth
                                                    label={StatsType.Strain + ' Threshold'}
                                                    onChange={(e) => handleThresholdChange(StatsType.Strain, e)}/>
                            </Grid>}
                        </GridContainer>
                    </Stack>
                )}
                {tabValue === 1 && (
                    <AdversarySkillManager npcSkills={formData.skills}
                                           onUpdate={(skills) => handleChange('skills', skills)}
                                           isMinion={formData.type === AdversaryTemplateType.Minion}/>
                )}
            </DialogContent>
            <DialogActions sx={{p: 3}}>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
                <Button variant="contained" startIcon={<SaveIcon/>} onClick={handleSave}>
                    Save Adversary
                </Button>
            </DialogActions>
        </Dialog>
    );
}