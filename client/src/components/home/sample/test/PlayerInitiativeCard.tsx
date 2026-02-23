import React from "react";
import {Box, Button, Card, CardContent, Chip, Grid, Typography} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import type {PlayerCharacter, PlayerSkill} from "../../../../api/model";
import PlayerSkillSelectWithDice from "../../common/PlayerSkillSelectWithDice.tsx";

interface Props {
    player: PlayerCharacter;
    participantHasSlot: boolean;
    handleRollInitiative: (player: PlayerCharacter, skill: PlayerSkill) => void;
}

const PlayerInitiativeCard: React.FC<Props> = ({player, participantHasSlot, handleRollInitiative}) => {
    const [skill, setSkill] = React.useState<PlayerSkill | null>(null);

    return (
        <Grid size={{xs: 12}} sx={{mt: 4}}>
            <Card variant="outlined">
                <CardContent>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center",}}>
                        <Box>
                            <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 1,}}>
                                <Typography variant="h6">{player.name}</Typography>
                                <Chip label={"Player"} size="small" color={"primary"}/>
                                {participantHasSlot && (
                                    <Chip label="Initiative Rolled" size="small" color="success" icon={<CasinoIcon/>}/>
                                )}
                            </Box>

                            <Typography variant="body2" color="text.secondary">
                                Wounds: {player.derivedStats.woundThreshold.total} | Strain:{" "}
                                {player.derivedStats.strainThreshold.total}
                            </Typography>
                        </Box>

                        <Box sx={{display: "flex", gap: 1, flex: "1 1 auto", maxWidth: "50%"}}>
                            <PlayerSkillSelectWithDice player={player} onChange={(sk) => setSkill(sk)}/>
                        </Box>

                        <Box sx={{display: "flex", gap: 1}}>
                            <Button variant="contained" size="small" startIcon={<CasinoIcon/>}
                                    onClick={() => handleRollInitiative(player, skill!)}
                                    disabled={skill === null || participantHasSlot}>
                                {participantHasSlot ? "Rolled" : "Roll"}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default PlayerInitiativeCard;