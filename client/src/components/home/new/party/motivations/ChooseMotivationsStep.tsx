import {type Motivation, MotivationType} from "../../../../../api/model";
import {Box, Card, CardContent, Stack, TextField, Typography} from "@mui/material";

const ALL_MOTIVATION_TYPES: MotivationType[] = [
    MotivationType.Strength,
    MotivationType.Flaw,
    MotivationType.Desire,
    MotivationType.Fear,
];

interface Props {
    motivations: Motivation[];
    types?: MotivationType[];
    onSave: (motivations: Motivation[]) => void;
}

export default function ChooseMotivationsStep(props: Props) {
    const {motivations, types = ALL_MOTIVATION_TYPES, onSave} = props;

    const getDescription = (type: MotivationType): string => {
        const motivation = motivations.find((m) => m.type === type);
        return motivation?.description ?? '';
    };

    const handleChange = (type: MotivationType, description: string) => {
        const updated: Motivation[] = types.map((t) => ({
            type: t,
            description: t === type ? description : getDescription(t),
        }));
        onSave(updated);
    };

    return (
        <Box sx={{mt: 3}}>
            <Stack spacing={2}>
                {types.map((type) => (
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
