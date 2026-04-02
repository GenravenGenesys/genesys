import {MotivationType, type PlayerMotivation} from "../../../../../api/model";
import {Box, Card, CardContent, Stack, TextField, Typography} from "@mui/material";

interface Props {
    motivations: PlayerMotivation[];
    onSave: (motivations: PlayerMotivation[]) => void;
}

const ALL_MOTIVATION_TYPES = [
    MotivationType.Strength,
    MotivationType.Flaw,
    MotivationType.Desire,
    MotivationType.Fear,
] as const;

export default function ChooseMotivationsStep(props: Props) {
    const {motivations, onSave} = props;

    const getDescription = (type: MotivationType): string => {
        const motivation = motivations.find((m) => m.type === type);
        return motivation?.description ?? '';
    };

    const handleChange = (type: MotivationType, description: string) => {
        const updated: PlayerMotivation[] = ALL_MOTIVATION_TYPES.map((t) => ({
            type: t,
            description: t === type ? description : getDescription(t),
        }));
        onSave(updated);
    };

    return (
        <Box sx={{mt: 3}}>
            <Stack spacing={2}>
                {ALL_MOTIVATION_TYPES.map((type) => (
                    <Card key={type} variant="outlined">
                        <CardContent>
                            <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                                {type}
                            </Typography>
                            <TextField
                                label={`Describe your character's ${type.toLowerCase()}`}
                                multiline
                                rows={2}
                                fullWidth
                                value={getDescription(type)}
                                onChange={(e) => handleChange(type, e.target.value)}
                            />
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}
