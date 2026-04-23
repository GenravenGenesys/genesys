import {useState, useEffect} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {Difficulty, RangeBand, type Skill, type Spell, type SpellEffect} from '../../../../../api/model';
import GenesysTextField from '../../../common/field/GenesysTextField.tsx';
import GenesysSelectField from '../../../common/field/GenesysSelectField.tsx';
import GenesysBooleanField from '../../../common/field/GenesysBooleanField.tsx';
import {emptySpell, emptySpellEffect} from '../../../../../models/Template.ts';
import GridContainer from '../../../../common/grid/GridContainer.tsx';

interface Props {
    open: boolean;
    spell: Spell;
    campaignSkills: Skill[];
    onClose: () => void;
    onSave: (data: Spell) => void;
    isNew: boolean;
}

export default function SpellDialog(props: Props) {
    const {open, spell, campaignSkills, onClose, onSave, isNew} = props;
    const [formData, setFormData] = useState<Spell>(spell || emptySpell);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (open) {
            setFormData(spell ?? emptySpell);
        }
    }, [open, spell]);

    const handleChange = <K extends keyof Spell>(field: K, value: Spell[K]) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleSkillToggle = (skill: Skill) => {
        const alreadySelected = formData.skills.some(s => s.id === skill.id);
        const updatedSkills = alreadySelected
            ? formData.skills.filter(s => s.id !== skill.id)
            : [...formData.skills, skill];
        handleChange('skills', updatedSkills);
    };

    const handleAddEffect = () => {
        handleChange('effects', [...formData.effects, {...emptySpellEffect}]);
    };

    const handleEffectChange = <K extends keyof SpellEffect>(index: number, field: K, value: SpellEffect[K]) => {
        const updated = formData.effects.map((effect, i) =>
            i === index ? {...effect, [field]: value} : effect
        );
        handleChange('effects', updated);
    };

    const handleRemoveEffect = (index: number) => {
        handleChange('effects', formData.effects.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        onSave(formData);
        setFormData(emptySpell);
        onClose();
    };

    const handleClose = () => {
        setFormData(emptySpell);
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
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1}}>
                <Typography variant="h5" component="span" fontWeight="bold">
                    {isNew ? "Create New Spell" : "Edit Spell"}
                </Typography>
                <IconButton onClick={handleClose} size="small">
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{py: 3}} dividers>
                <Stack spacing={3}>
                    {/* Basic Info */}
                    <GenesysTextField
                        text={formData.name || ''}
                        label="Spell Name"
                        onChange={(e) => handleChange('name', e)}
                        fullwidth
                    />

                    <GridContainer spacing={2}>
                        <Grid size={4}>
                            <GenesysSelectField
                                value={formData.difficulty}
                                label="Base Difficulty"
                                onChange={(e) => handleChange('difficulty', e)}
                                options={Difficulty}
                            />
                        </Grid>
                        <Grid size={4}>
                            <GenesysSelectField
                                value={formData.range}
                                label="Range"
                                onChange={(e) => handleChange('range', e)}
                                options={RangeBand}
                            />
                        </Grid>
                        <Grid size={4}>
                            <GenesysBooleanField
                                value={formData.concentration}
                                onChange={(e) => handleChange('concentration', e)}
                                label="Concentration"
                            />
                        </Grid>
                    </GridContainer>

                    {/* Magic Skills */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Magic Skills
                        </Typography>
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                            {campaignSkills.map(skill => {
                                const selected = formData.skills.some(s => s.id === skill.id);
                                return (
                                    <Button
                                        key={skill.id}
                                        variant={selected ? 'contained' : 'outlined'}
                                        size="small"
                                        onClick={() => handleSkillToggle(skill)}
                                        sx={{borderRadius: 4}}
                                    >
                                        {skill.name}
                                    </Button>
                                );
                            })}
                            {campaignSkills.length === 0 && (
                                <Typography variant="body2" color="text.secondary">
                                    No skills available in this campaign.
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    <Divider sx={{opacity: 0.2}}/>

                    {/* Spell Effects */}
                    <Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Spell Effects
                            </Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<AddIcon/>}
                                onClick={handleAddEffect}
                            >
                                Add Effect
                            </Button>
                        </Box>

                        <Stack spacing={2}>
                            {formData.effects.map((effect, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        p: 2,
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: 2,
                                        position: 'relative'
                                    }}
                                >
                                    <IconButton
                                        size="small"
                                        onClick={() => handleRemoveEffect(index)}
                                        sx={{position: 'absolute', top: 8, right: 8}}
                                    >
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>

                                    <Stack spacing={2}>
                                        <GridContainer spacing={2}>
                                            <Grid size={8}>
                                                <GenesysTextField
                                                    text={effect.name || ''}
                                                    label="Effect Name"
                                                    onChange={(e) => handleEffectChange(index, 'name', e)}
                                                    fullwidth
                                                />
                                            </Grid>
                                            <Grid size={4}>
                                                <GenesysTextField
                                                    text={String(effect.difficultyIncrease ?? 1)}
                                                    label="Difficulty Increase"
                                                    onChange={(e) => handleEffectChange(index, 'difficultyIncrease', parseInt(e, 10) || 1)}
                                                    fullwidth
                                                />
                                            </Grid>
                                        </GridContainer>
                                        <GenesysTextField
                                            text={effect.description || ''}
                                            label="Effect Description"
                                            onChange={(e) => handleEffectChange(index, 'description', e)}
                                            fullwidth
                                            rows={2}
                                        />
                                    </Stack>
                                </Box>
                            ))}

                            {formData.effects.length === 0 && (
                                <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center', py: 2}}>
                                    No effects added yet. Click "Add Effect" to get started.
                                </Typography>
                            )}
                        </Stack>
                    </Box>
                </Stack>
            </DialogContent>

            <DialogActions sx={{p: 3}}>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" startIcon={<SaveIcon/>} onClick={handleSave}>
                    Save Spell
                </Button>
            </DialogActions>
        </Dialog>
    );
}
