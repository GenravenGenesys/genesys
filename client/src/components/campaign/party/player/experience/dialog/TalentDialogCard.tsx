import {Button, Card, CardContent, Stack} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TierTalentDialog from "./TierTalentDialog";
import {Tier} from "../../../../../../models/Talent";
import CenteredCardHeader from "../../../../../common/card/header/CenteredCardHeader";
import GenesysDescriptionTypography from "../../../../../common/typography/GenesysDescriptionTypography";
import * as React from "react";
import {useState} from "react";
import Player from "../../../../../../models/actor/player/Player";
import GridContainer from "../../../../../common/grid/GridContainer";
import GridItem from "../../../../../common/grid/GridItem";

interface Props {
    player: Player
    size: number
    tier: Tier
    updatePlayer: (player: Player) => void
}

export default function TalentDialogCard(props: Props) {
    const {player, size, tier, updatePlayer} = props;
    const [openTalentDialog, setOpenTalentDialog] = useState(false);
    const talents = player.talents.filter(talent => talent.tier === tier);

    return (
        <GridContainer centered>
            <Button variant='contained' color='primary' startIcon={<AddIcon/>}
                    onClick={() => setOpenTalentDialog(true)}>
                Add Talent
            </Button>
            {openTalentDialog && <TierTalentDialog open={openTalentDialog} onClose={() => setOpenTalentDialog(false)}
                                                   currentPlayer={player} tier={tier} updatePlayer={updatePlayer}/>}
            <Stack spacing={2}>
            {/*<Stack container direction="column" spacing={2}>*/}
                {new Array(size).map((talent) => (
                    <GridItem>
                        <Card>
                            <CenteredCardHeader title={talent.name}/>
                            <CardContent>
                                <GenesysDescriptionTypography text={talent.summary}/>
                            </CardContent>
                        </Card>
                    </GridItem>
                ))}
                {talents.map((talent) => (
                    <GridItem>
                        <Card>
                            <CenteredCardHeader title={talent.name}/>
                            <CardContent>
                                <GenesysDescriptionTypography text={talent.summary}/>
                            </CardContent>
                        </Card>
                    </GridItem>
                ))}
            </Stack>
        </GridContainer>
    );
}