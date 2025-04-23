import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Player from '../../../../models/actor/player/Player';
import EditIcon from "@mui/icons-material/Edit";
import PlayerEquipmentCard from "./equipment/PlayerEquipmentCard";
import ViewFieldCard from "../../../common/ViewFieldCard";
import { ActorPath } from '../../../../services/RootPath';
import CharacteristicRow from "../../actor/common/CharacteristicRow";
import DerivedPlayerStatsRow from "./DerivedPlayerStatsRow";

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
                <Grid container sx={{
                    justifyContent: 'center'
                }}>
                    <Grid container spacing={2}>
                        <ViewFieldCard name={'Archetype'} value={player?.archetype?.name!}/>
                        <ViewFieldCard name={'Career'} value={player?.career?.name!}/>
                        <ViewFieldCard name={'Encumbrance'} value={String(player.encumbrance)}/>
                    </Grid>
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
                </Grid>
            </CardContent>
        </Card>
    );
}
