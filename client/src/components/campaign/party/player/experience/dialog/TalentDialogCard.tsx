import {Button, Card, CardContent, Stack} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TierTalentDialog from "./TierTalentDialog";
import CenteredCardHeader from "../../../../../common/card/header/CenteredCardHeader";
import GenesysDescriptionTypography from "../../../../../home/common/typography/GenesysDescriptionTypography.tsx";
import * as React from "react";
import {useState} from "react";
import GridContainer from "../../../../../common/grid/GridContainer";
import GridItem from "../../../../../common/grid/GridItem";
import type {Player, Tier, ActorTalent} from "../../../../../../api/model";

interface Props {
    player: Player;
    size: number;
    tier: Tier;
    updatePlayer: (player: Player) => void;
}

const TalentDialogCard: React.FC<Props> = ({player, size, tier, updatePlayer})=> {
    const [openTalentDialog, setOpenTalentDialog] = useState(false);
    const talents = player.talents.filter((talent: ActorTalent) => talent.tier === tier);

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
                {talents.map((talent: ActorTalent) => (
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
};

export default TalentDialogCard;