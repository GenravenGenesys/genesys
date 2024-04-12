import {Card, CardContent, Grid} from "@mui/material";
import {DefenseType} from "../../../models/actor/Defense";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";
import Player from "../../../models/actor/player/Player";
import {Fragment} from "react";
import {ArmorSlot} from "../../../models/equipment/Armor";

interface Props {
    player: Player;
}

export default function PlayerDefenseCard(props: Props) {
    const {player} = props;

    const calculateArmorDefense = () => {
        if (player.armors === undefined || player.armors.length === 0) {
            return 0;
        } else {
            let armor = player.armors.filter((armor) => armor.slot === ArmorSlot.Body).pop()
            if (armor) {
                return armor.defense
            } else {
                return 0;
            }
        }
    }

    const calculateMeleeDefense = () => {
        return String(calculateArmorDefense())
    }

    const calculateRangedDefense = () => {
        return String(calculateArmorDefense())
    }

    return (
        <Fragment>
            <Grid item xs>
                <Card>
                    <CenteredCardHeader title={DefenseType.Melee}/>
                    <CardContent>
                        <GenesysDescriptionTypography text={calculateMeleeDefense()}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs>
                <Card>
                    <CenteredCardHeader title={DefenseType.Ranged}/>
                    <CardContent>
                        <GenesysDescriptionTypography text={calculateRangedDefense()}/>
                    </CardContent>
                </Card>
            </Grid>
        </Fragment>
    )
}