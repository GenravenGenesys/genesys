import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import {CharacteristicType} from "../../../../models/character/Characteristic";
import {StatsType} from "../../../../models/actor/Stats";
import {EditCharacteristicCard} from "../../CharacteristicCard";
import RatingCard from "../RatingCard";
import {NonPlayerCharacterKey, RatingType} from "../../../../models/actor/npc/NonPlayerActor";
import SoakCard from "../../SoakCard";
import {EditStatsCard} from "../../StatsCard";
import {ActorPath} from "../../../../services/Path";
import CheckIcon from "@mui/icons-material/Check";
import {ActorKey} from "../../../../models/actor/Actor";
import Minion from "../../../../models/actor/npc/Minion";
import Setting from "../../../../models/Setting";
import EditSettingsCard from "../../../common/setting/EditSettingsCard";
import SettingService from "../../../../services/SettingService";
import MinionTalentCard from "./talent/MinionTalentCard";
import MinionSkillCard from "./skill/MinionSkillCard";
import * as React from "react";
import MinionAbilityCard from "./ability/MinionAbilityCard";
import MinionEquipmentCard from "./equipment/MinionEquipmentCard";
import NonPlayerActorDefenseCard from "../NonPlayerActorDefenseCard";

interface Props {
    min: Minion
    settings: Setting[]
}

export default function MinionEdit(props: Props) {
    const {min, settings} = props
    const [minion, setMinion] = useState<Minion>(min)
    let navigate = useNavigate()

    useEffect(() => {
        setMinion(min)
    }, [min])

    const onSettingAddition = async (name: string) => {
        const copyMinion = {...minion} as Minion
        let setting = await SettingService.getSetting(name)
        copyMinion.settings = copyMinion.settings.concat(setting)
        await updateMinion(copyMinion)
    }

    const onSettingRemoval = async (name: string) => {
        const copyMinion = {...minion} as Minion
        copyMinion.settings.forEach((set, index) => {
            if (set.name === name) {
                copyMinion.settings.splice(index, 1)
            }
        })
        await updateMinion(copyMinion)
    }

    const onChange = async (key: keyof Minion, value: number) => {
        if (value === null) {
            return
        }
        const copyMinion = {...minion} as Minion
        switch (key) {
            case "brawn":
                copyMinion.brawn = value
                break
            case "agility":
                copyMinion.agility = value
                break
            case "intellect":
                copyMinion.intellect = value
                break
            case "cunning":
                copyMinion.cunning = value
                break
            case "willpower":
                copyMinion.willpower = value
                break
            case "presence":
                copyMinion.presence = value
                break
            case "wounds":
                copyMinion.wounds = value
                break
            case "combat":
                copyMinion.combat = value
                break
            case "social":
                copyMinion.social = value
                break
            case "general":
                copyMinion.general = value
                break
            default:
                break
        }

        await updateMinion(copyMinion)
    }

    const updateMinion = async (copyMinion: Minion) => {
        copyMinion.soak = copyMinion.brawn
        setMinion(copyMinion)
        await ActorService.updateMinion(copyMinion.name, copyMinion)
    }

    const onView = () => {
        navigate(ActorPath.Minion + minion.name + '/view')
    }

    return (
        <Card>
            <CardHeader title={minion?.name!!} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}/>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <EditCharacteristicCard characteristic={minion?.brawn!!} type={CharacteristicType.Brawn}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Brawn, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={minion?.agility!!} type={CharacteristicType.Agility}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Agility, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={minion?.intellect!!} type={CharacteristicType.Intellect}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Intellect, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={minion?.cunning!!} type={CharacteristicType.Cunning}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Cunning, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={minion?.willpower!!} type={CharacteristicType.Willpower}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Willpower, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={minion?.presence!!} type={CharacteristicType.Presence}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Presence, value)
                                                }}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={10}>
                        <SoakCard actor={minion}/>
                        <EditStatsCard stats={minion?.wounds!!} type={StatsType.Wounds} onChange={(value: number): void => {
                            onChange(ActorKey.Wounds, value)
                        }}/>
                        <NonPlayerActorDefenseCard npc={minion}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={10}>
                        <RatingCard rating={minion?.combat!!} type={RatingType.Combat}
                                    onChange={(value: number): void => {
                                        onChange(NonPlayerCharacterKey.Combat, value)
                                    }}/>
                        <RatingCard rating={minion?.social!!} type={RatingType.Social}
                                    onChange={(value: number): void => {
                                        onChange(NonPlayerCharacterKey.Social, value)
                                    }}/>
                        <RatingCard rating={minion?.general!!} type={RatingType.General}
                                    onChange={(value: number): void => {
                                        onChange(NonPlayerCharacterKey.General, value)
                                    }}/>
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
                <EditSettingsCard settings={minion?.settings!!} onSettingAddition={onSettingAddition}
                                  onSettingRemoval={onSettingRemoval} allSettings={settings}/>
            </CardContent>
        </Card>
    )
}
