import {Button, Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import Nemesis, {DefaultNemesis, NemesisKey} from "../../../../models/actor/npc/Nemesis";
import {CharacteristicType} from "../../../../models/actor/Characteristics";
import {DefenseType} from "../../../../models/actor/Defense";
import {StatsType} from "../../../../models/actor/Stats";
import EditCharacteristicCard from "../../EditCharacteristicCard";
import RatingCard from "../RatingCard";
import {RatingType} from "../../../../models/actor/npc/NonPlayerCharacter";
import SoakCard from "../../SoakCard";
import StatsCard from "../../StatsCard";
import DefenseCard from "../../DefenseCard";
import SkillTable from "./NemesisSkillTable";
import NemesisTalentTable from "./NemesisTalentTable";
import NPCTalentSelectionDialog from "../NPCTalentSelectionDialog";
import {Path} from "../../../../services/Path";
import CheckIcon from '@mui/icons-material/Check';

export default function NemesisEdit() {
    const { name } = useParams<{ name: string }>();
    const [nemesis, setNemesis] = useState<Nemesis | null>(null);
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false);
    const [errors, setErrors] = useState({} as any);
    let navigate = useNavigate()

    useEffect(() => {
        if (!name) {
            return;
        }
        (async (): Promise<void> => {
            const nemesisData = await ActorService.getNemesis(name);
            if (!nemesisData) {return}
            setNemesis(nemesisData);
        })();
    }, [name])

    function getName(nemesis: Nemesis | null): string {
        if (!nemesis) {
            return 'Nemesis Edit'
        }
        return nemesis.name
    }

    function getNemesis(nemesis: Nemesis | null): Nemesis {
        if (!nemesis) {
            return DefaultNemesis.create();
        }
        return nemesis
    }

    const onCharacteristicChange = (copyNemesis: Nemesis, value: number, type: CharacteristicType) => {
        switch (type) {
            case CharacteristicType.Brawn:
                copyNemesis.brawn.current = value
                break;
            case CharacteristicType.Agility:
                copyNemesis.agility.current = value
                break;
            case CharacteristicType.Intellect:
                copyNemesis.intellect.current = value
                break;
            case CharacteristicType.Cunning:
                copyNemesis.cunning.current = value
                break;
            case CharacteristicType.Willpower:
                copyNemesis.willpower.current = value
                break;
            case CharacteristicType.Presence:
                copyNemesis.presence.current = value
                break;
        }
    }

    const onStatChange = (copyNemesis: Nemesis, value: number, type: StatsType) => {
        switch (type) {
            case StatsType.Wounds:
                copyNemesis.wounds.max = value
                break;
            case StatsType.Strain:
                copyNemesis.strain.max = value
                break;
        }
    }

    const onDefenseChange = (copyNemesis: Nemesis, value: number, type: DefenseType) => {
        switch (type) {
            case DefenseType.Melee:
                copyNemesis.melee.current = value
                break;
            case DefenseType.Ranged:
                copyNemesis.ranged.current = value
                break;
        }
    }

    const onRatingChange = (copyNemesis: Nemesis, value: number, type: RatingType) => {
        switch (type) {
            case RatingType.Combat:
                copyNemesis.combat = value
                break
            case RatingType.Social:
                copyNemesis.social = value
                break
            case RatingType.General:
                copyNemesis.general = value
                break
        }
    }

    const onChange = async (key: keyof Nemesis, value: number) => {
        if (value === null || (nemesis !== null && nemesis[key] === value)) {
            return;
        }
        const copyNemesis = {...nemesis} as Nemesis
        switch (key) {
            case "brawn":
                onCharacteristicChange(copyNemesis, value, CharacteristicType.Brawn)
                break;
            case "agility":
                onCharacteristicChange(copyNemesis, value, CharacteristicType.Agility)
                break;
            case "intellect":
                onCharacteristicChange(copyNemesis, value, CharacteristicType.Intellect)
                break;
            case "cunning":
                onCharacteristicChange(copyNemesis, value, CharacteristicType.Cunning)
                break;
            case "willpower":
                onCharacteristicChange(copyNemesis, value, CharacteristicType.Willpower)
                break;
            case "presence":
                onCharacteristicChange(copyNemesis, value, CharacteristicType.Presence)
                break;
            case 'talents':
                break
            case "soak":
                copyNemesis.soak = copyNemesis.brawn.current
                break;
            case "melee":
                onDefenseChange(copyNemesis, value, DefenseType.Melee)
                break;
            case "ranged":
                onDefenseChange(copyNemesis, value, DefenseType.Ranged)
                break;
            case "wounds":
                onStatChange(copyNemesis, value, StatsType.Wounds)
                break;
            case "strain":
                onStatChange(copyNemesis, value, StatsType.Strain)
                break;
            case "combat":
                onRatingChange(copyNemesis, value, RatingType.Combat)
                break
            case "social":
                onRatingChange(copyNemesis, value, RatingType.Social)
                break
            case "general":
                onRatingChange(copyNemesis, value, RatingType.General)
                break
            case "name":
                break;
        }

        await updateNemesis(copyNemesis)
    }

    const updateNemesis = async (copyNemesis: Nemesis): Promise<Nemesis> => {
        copyNemesis.soak = copyNemesis.brawn.current
        setNemesis(copyNemesis)
        await ActorService.updateNemesis(copyNemesis.name, copyNemesis)
        return nemesis!!
    }

    const onView = () => {
        navigate(Path.Nemesis + name + '/view');
    }

    return (
        <Card>
            <CardHeader title={getName(nemesis)} style={{ textAlign: 'center' }} action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                <CheckIcon color='primary' fontSize='small' />
            </IconButton>}/>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <EditCharacteristicCard characteristic={getNemesis(nemesis).brawn} type={CharacteristicType.Brawn} onChange={(value: number): void => { onChange(NemesisKey.Brawn, value) }}/>
                        <EditCharacteristicCard characteristic={getNemesis(nemesis).agility} type={CharacteristicType.Agility} onChange={(value: number): void => { onChange(NemesisKey.Agility, value) }}/>
                        <EditCharacteristicCard characteristic={getNemesis(nemesis).intellect} type={CharacteristicType.Intellect} onChange={(value: number): void => { onChange(NemesisKey.Intellect, value) }}/>
                        <EditCharacteristicCard characteristic={getNemesis(nemesis).cunning} type={CharacteristicType.Cunning} onChange={(value: number): void => { onChange(NemesisKey.Cunning, value) }}/>
                        <EditCharacteristicCard characteristic={getNemesis(nemesis).willpower} type={CharacteristicType.Willpower} onChange={(value: number): void => { onChange(NemesisKey.Willpower, value) }}/>
                        <EditCharacteristicCard characteristic={getNemesis(nemesis).presence} type={CharacteristicType.Presence} onChange={(value: number): void => { onChange(NemesisKey.Presence, value) }}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <SoakCard soak={getNemesis(nemesis).soak} />
                        <StatsCard stats={getNemesis(nemesis).wounds} type={StatsType.Wounds} onChange={(value: number): void => { onChange(NemesisKey.Wounds, value) }}/>
                        <StatsCard stats={getNemesis(nemesis).strain} type={StatsType.Strain} onChange={(value: number): void => { onChange(NemesisKey.Strain, value) }}/>
                        <DefenseCard defense={getNemesis(nemesis).melee} type={DefenseType.Melee} onChange={(value: number): void => { onChange(NemesisKey.Melee, value) }}/>
                        <DefenseCard defense={getNemesis(nemesis).ranged} type={DefenseType.Ranged} onChange={(value: number): void => { onChange(NemesisKey.Ranged, value) }}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <RatingCard  rating={getNemesis(nemesis).combat} type={RatingType.Combat} onChange={(value: number): void => { onChange(NemesisKey.Combat, value) }}/>
                        <RatingCard  rating={getNemesis(nemesis).social} type={RatingType.Social} onChange={(value: number): void => { onChange(NemesisKey.Social, value) }}/>
                        <RatingCard  rating={getNemesis(nemesis).general} type={RatingType.General} onChange={(value: number): void => { onChange(NemesisKey.General, value) }}/>
                    </Grid>
                    <Divider />
                    <SkillTable  nemesis={getNemesis(nemesis)}/>
                    <Divider />
                    <Button onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                    {openSelectTalentDialog && <NPCTalentSelectionDialog nemesis={getNemesis(nemesis)} open={openSelectTalentDialog} onClose={(): void => setOpenSelectTalentDialog(false)}/>}
                    <NemesisTalentTable nemesis={getNemesis(nemesis)}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
