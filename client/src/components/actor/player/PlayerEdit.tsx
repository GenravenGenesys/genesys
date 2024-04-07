import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Player, {Experience, PlayerSkill} from '../../../models/actor/player/Player';
import ActorService from '../../../services/ActorService';
import {StatsType} from '../../../models/actor/Stats';
import {DefenseType} from '../../../models/actor/Defense';
import {ActorPath} from '../../../services/Path';
import {useEffect, useState} from 'react';
import CheckIcon from "@mui/icons-material/Check";
import {ViewStatsCard} from "../StatsCard";
import SoakCard from "../SoakCard";
import {ActorKey} from '../../../models/actor/Actor';
import PlayerEditSkillTable from "./skill/PlayerEditSkillTable";
import PlayerEquipmentCard from "./equipment/PlayerEquipmentCard";
import Setting from "../../../models/Setting";
import EditSettingsCard from "../../common/setting/EditSettingsCard";
import * as React from "react";
import SettingService from "../../../services/SettingService";
import {EditDefenseCard} from "../DefenseCard";
import PlayerTalentCard from "./talent/PlayerTalentCard";
import CareerSelectCard from "./CareerSelectCard";
import Career from "../../../models/actor/player/Career";
import CareerSkillSelectDialog from "./skill/CareerSkillSelectDialog";
import Skill from "../../../models/actor/Skill";
import ArchetypeSelectCard from "./ArchetypeSelectCard";
import Archetype from "../../../models/actor/player/Archetype";
import ViewCharacteristicRow from "../common/ViewCharacteristicRow";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import ExperienceCard from "../../common/ExperienceCard";

interface Props {
    play: Player
    settings: Setting[]
}

export default function PlayerView(props: Props) {
    const {play, settings} = props
    const [player, setPlayer] = useState<Player>(play)
    const [openCareerSkillDialog, setOpenCareerSkillDialog] = useState(false)
    let navigate = useNavigate()

    useEffect(() => {
        setPlayer(play)
    }, [play])

    const onSettingAddition = async (name: string) => {
        const copyPlayer = {...player} as Player
        let setting = await SettingService.getSetting(name)
        copyPlayer.settings = copyPlayer.settings.concat(setting)
        await updatePlayer(copyPlayer)
    }

    const onSettingRemoval = async (name: string) => {
        const copyPlayer = {...player} as Player
        copyPlayer.settings.forEach((set, index) => {
            if (set.name === name) {
                copyPlayer.settings.splice(index, 1)
            }
        })
        await updatePlayer(copyPlayer)
    }

    const onSkillChange = async (skill: PlayerSkill) => {
        player.skills.forEach((playerSkill) => {
            if (skill.name === playerSkill.name) {
                playerSkill.ranks = skill.ranks
            }
        })
        await updatePlayer(player)
    }

    const onArchetypeChange = async (archetype: Archetype) => {
        player.archetype = archetype
        player.brawn = archetype.brawn
        player.agility = archetype.agility
        player.intellect = archetype.intellect
        player.cunning = archetype.cunning
        player.willpower = archetype.willpower
        player.presence = archetype.presence
        player.wounds = archetype.wounds + archetype.brawn
        player.strain = archetype.strain + archetype.willpower
        player.experience = {total: archetype.experience, available: archetype.experience} as Experience
        player.skills.forEach((playerSkill) => {
            if (archetype.skill.name === playerSkill.name) {
                playerSkill.ranks = 1
            }
        })
        await updatePlayer(player)
    }

    const onCareerChange = async (value: Career) => {
        player.career = value
        player.skills.forEach((playerSkill, index) => {
            player.career.skills.forEach((skill: Skill) => {
                if (skill.name === playerSkill.name) {
                    playerSkill.career = true
                    player.skills[index] = playerSkill
                }
            })
        })
        setOpenCareerSkillDialog(true)
        await updatePlayer(player)
    }

    const onChange = async (key: keyof Player, value: number) => {
        if (value === null || (player !== null && player[key] === value)) {
            return;
        }
        const copyPlayer = {...player} as Player
        switch (key) {
            case 'melee':
                copyPlayer.melee = value
                break;
            case 'ranged':
                copyPlayer.ranged = value
                break;
            default:
                break
        }

        await updatePlayer(copyPlayer)
    }

    const onPurchase = () => {

    }

    const updatePlayer = async (copyPlayer: Player) => {
        copyPlayer.soak = copyPlayer.brawn
        copyPlayer.encumbrance = 5 + copyPlayer.brawn
        setPlayer(copyPlayer)
        await ActorService.updatePlayer(copyPlayer.name, copyPlayer)
    }

    const onView = () => {
        navigate(ActorPath.Player + player.name + '/view')
    }

    return (
        <Card>
            <CardHeader title={player.name} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}/>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <ArchetypeSelectCard defaultValue={player.archetype} onCommit={(value: Archetype): void => {
                            onArchetypeChange(value)
                        }}/>
                        <CareerSelectCard defaultValue={player.career} onCommit={(value: Career): void => {
                            onCareerChange(value)
                        }}/>
                        <ViewFieldCard name={'Encumbrance'} value={String(player.encumbrance)}/>
                        {openCareerSkillDialog && <CareerSkillSelectDialog open={openCareerSkillDialog}
                                                                           onClose={(): void => setOpenCareerSkillDialog(false)}
                                                                           player={player}/>}
                        <ExperienceCard experience={player.experience}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={2}>
                        <ViewCharacteristicRow actor={player}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={2}>
                        <SoakCard actor={player}/>
                        <ViewStatsCard stats={player.wounds} type={StatsType.Wounds}/>
                        <ViewStatsCard stats={player.strain} type={StatsType.Strain}/>
                        <EditDefenseCard defense={player?.melee!!} type={DefenseType.Melee}
                                         onChange={(value: number): void => {
                                             onChange(ActorKey.Melee, value)
                                         }}/>
                        <EditDefenseCard defense={player?.ranged!!} type={DefenseType.Ranged}
                                         onChange={(value: number): void => {
                                             onChange(ActorKey.Ranged, value)
                                         }}/>
                    </Grid>
                    <Divider/>
                    <PlayerEditSkillTable player={player} onSkillChange={onSkillChange}/>
                    <Divider/>
                    <PlayerEquipmentCard player={player}/>
                    <Divider/>
                    <PlayerTalentCard player={player}/>
                </Grid>
                <EditSettingsCard settings={player.settings} onSettingAddition={onSettingAddition}
                                  onSettingRemoval={onSettingRemoval} allSettings={settings}/>
            </CardContent>
        </Card>
    )
}
