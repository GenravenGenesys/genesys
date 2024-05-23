import Player from "../../../../models/actor/player/Player";
import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import ViewPlayerSkillTable from "./ViewPlayerSkillTable";

interface Props {
    player: Player;
}

export default function PlayerSkillCard(props: Props) {
    const { player } = props;

    return (
        <Card  sx={{"width": 1}}>
            <CenteredCardHeader title={'Skills'}/>
            <CardContent>
                <ViewPlayerSkillTable player={player}/>
            </CardContent>
        </Card>
    )
}