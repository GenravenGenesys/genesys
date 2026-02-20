import {Box, Card, CardContent, Chip, Divider, Grid, IconButton, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type {Party} from "../../../../api/model";

interface Props {
    party: Party;
    onRemovePartyMember: (id: string) => void;
    onRemovePartyNPC: (id: string) => void;
}

export default function EncounterPartyTab(props: Props) {
    const {party, onRemovePartyMember, onRemovePartyNPC} = props;

    return (
        <Box>
            <Divider>Party Members</Divider>
            {party.players.map(player => (
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
                                            {player.name}
                                        </Typography>
                                        <Chip label={"Player"} size="small" color={"primary"}/>
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Wounds: {player.derivedStats.woundThreshold.total} | Strain:{" "}
                                        {player.derivedStats.strainThreshold.total}
                                    </Typography>
                                </Box>

                                <Box sx={{display: "flex", gap: 1}}>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() =>
                                            onRemovePartyMember(player.id)
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
            <Divider>Party NPCs</Divider>
            {party.adversaryTemplates.map(npc => (
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
                                        <Chip label={"NPC"} size="small" color={"primary"}/>
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
                                            onRemovePartyNPC(npc.id)
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