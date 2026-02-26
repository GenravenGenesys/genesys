import {Box, Card, CardContent, Chip, Grid, IconButton, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type {AdversaryTemplate} from "../../../../api/model";

interface Props {
    adversaries: AdversaryTemplate[];
    onRemoveNPC: (id: string) => void;
}

export default function EncounterNPCTab(props: Props) {
    const {adversaries, onRemoveNPC} = props;

    return (
        <Box>
            {adversaries.map(npc => (
                <Grid size={{xs: 12}} sx={{mt: 4}}>
                    <Card variant="outlined">
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            mb: 1,
                                        }}
                                    >
                                        <Typography variant="h6">
                                            {npc.name}
                                        </Typography>
                                        <Chip label={"NPC"} size="small" color={"default"}/>
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Wounds: {npc.derivedStats.woundThreshold.total} | Strain:{" "}
                                        {npc.derivedStats.strainThreshold.total}
                                    </Typography>
                                </Box>

                                <Box sx={{display: "flex", gap: 1}}>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() =>
                                            onRemoveNPC(npc.id)
                                        }
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Box>
    );
}