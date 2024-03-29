import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {DefenseType} from "../../../../models/actor/Defense";
import {StatsType} from "../../../../models/actor/Stats";
import SoakCard from "../../SoakCard";
import * as React from "react";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import EditIcon from "@mui/icons-material/Edit";
import {ActorPath} from "../../../../services/Path";
import Minion from "../../../../models/actor/npc/Minion";
import ViewCharacteristicRow from "../../common/ViewCharacteristicRow";
import {getRatings} from "../../../../models/actor/npc/NonPlayerActor";
import Setting from "../../../../models/Setting";
import ViewSettingsCard from "../../../common/setting/ViewSettingsCard";
import {ViewStatsCard} from "../../StatsCard";
import {ViewDefenseCard} from "../../DefenseCard";
import MinionTalentCard from "./talent/MinionTalentCard";
import MinionSkillCard from "./skill/MinionSkillCard";
import MinionAbilityCard from "./ability/MinionAbilityCard";
import MinionEquipmentCard from "./equipment/MinionEquipmentCard";

interface Props {
    minion: Minion
    settings: Setting[]
}

export default function MinionView(props: Props) {
    const {minion, settings} = props
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(ActorPath.Minion + minion.name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={minion.name}
                subheader={<GenesysDescriptionTypography text={getRatings(minion)}/>}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <ViewCharacteristicRow actor={minion}/>
                    <Divider/>
                    <Grid container spacing={2}>
                        <SoakCard soak={minion?.soak!!}/>
                        <ViewStatsCard stats={minion?.wounds!!} type={StatsType.Wounds}/>
                        <ViewDefenseCard defense={minion?.melee!!} type={DefenseType.Melee}/>
                        <ViewDefenseCard defense={minion?.ranged!!} type={DefenseType.Ranged}/>
                    </Grid>
                    <Divider/>
                    <MinionSkillCard minion={minion}/>
                    <Divider/>
                    <MinionEquipmentCard minion={minion}/>
                    <Divider/>
                    <MinionAbilityCard minion={minion}/>
                    <Divider/>
                    <MinionTalentCard minion={minion}/>
                </Grid>
                <ViewSettingsCard settings={minion?.settings!!} allSettings={settings}/>
            </CardContent>
        </Card>
    )
}
