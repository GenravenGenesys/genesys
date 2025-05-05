import {Card, CardContent, CardHeader, Divider, IconButton} from '@mui/material';
import {useNavigate} from 'react-router';
import Player from '../../../../models/actor/player/Player';
import EditIcon from "@mui/icons-material/Edit";
import PlayerEquipmentCard from "./equipment/PlayerEquipmentCard";
import ViewFieldCard from "../../../common/ViewFieldCard";
import { ActorPath } from '../../../../services/RootPath';
import CharacteristicRow from "../../actor/common/CharacteristicRow";
import DerivedPlayerStatsRow from "./DerivedPlayerStatsRow";
import GridContainer from "../../../common/grid/GridContainer";

interface Props {
    player: Player
}

export default function PlayerView(props: Props) {
    const {player} = props
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(ActorPath.Player + player.id + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}} title={player.name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <GridContainer centered>
                    <GridContainer spacing={2}>
                        <ViewFieldCard name={'Archetype'} value={player?.archetype?.name!}/>
                        <ViewFieldCard name={'Career'} value={player?.career?.name!}/>
                        <ViewFieldCard name={'Encumbrance'} value={String(player.encumbrance)}/>
                    </GridContainer>
                    <Divider/>
                    <CharacteristicRow actor={player}/>
                    <Divider/>
                    <DerivedPlayerStatsRow player={player}/>
                    <Divider/>
                    {/*<PlayerSkillCard player={player}/>*/}
                    <Divider/>
                    <PlayerEquipmentCard player={player}/>
                    <Divider/>
                    {/*<PlayerTalentCard player={player}/>*/}
                </GridContainer>
            </CardContent>
        </Card>
    );
}
