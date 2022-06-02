import {Box, Card, CardContent, CardHeader, Divider, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import Nemesis, {DefaultNemesis, NemesisKey} from "../../../../models/actor/npc/Nemesis";
import {CharacteristicType} from "../../../../models/actor/Characteristics";
import {DefenseType} from "../../../../models/actor/Defense";
import {StatsType} from "../../../../models/actor/Stats";
import CharacteristicCard from "../../CharacteristicCard";
import RatingCard from "../RatingCard";
import {RatingType} from "../../../../models/actor/npc/NonPlayerCharacter";
import SoakCard from "../../SoakCard";
import StatsCard from "../../StatsCard";
import DefenseCard from "../../DefenseCard";
import NemesisSkillTable from "./NemesisSkillTable";

export default function NemesisView() {
    const { name } = useParams<{ name: string }>();
    const [nemesis, setNemesis] = useState<Nemesis | null>(null);
    const [errors, setErrors] = useState({} as any);

    useEffect(() => {
        if (!name) {
            return;
        }
        (async (): Promise<void> => {
            const nemesisData = await ActorService.getNemesis(name);
            setNemesis(nemesisData);
        })();
    }, [name])

    function getName(nemesis: Nemesis | null): string {
        if (!nemesis) {
            return 'Nemesis View'
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
        if (type === CharacteristicType.Brawn) {
            copyNemesis.brawn.current = value
        }
        else if(type === CharacteristicType.Agility) {
            copyNemesis.agility.current = value
        }
        else if(type === CharacteristicType.Intellect) {
            copyNemesis.intellect.current = value
        }
        else if(type === CharacteristicType.Cunning) {
            copyNemesis.cunning.current = value
        }
        else if(type === CharacteristicType.Willpower) {
            copyNemesis.willpower.current = value
        }
        else if(type === CharacteristicType.Presence) {
            copyNemesis.presence.current = value
        }
    }

    const onStatChange = (copyNemesis: Nemesis, value: number, type: StatsType) => {
        if (type === StatsType.Wounds) {
            copyNemesis.wounds.max = value
        }
        else if (type === StatsType.Strain) {
            copyNemesis.strain.max = value
        }
    }

    const onDefenseChange = (copyNemesis: Nemesis, value: number, type: DefenseType) => {
        if (type === DefenseType.Melee) {
            copyNemesis.melee.current = value
        }
        else if (type === DefenseType.Ranged) {
            copyNemesis.ranged.current = value
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
            case "name":
                break;
        }

        await updateNemesis(copyNemesis)
    }

    const updateNemesis = async (copyNemesis: Nemesis) => {
        copyNemesis.soak = copyNemesis.brawn.current

        setNemesis(copyNemesis)
        console.log(copyNemesis)
        await ActorService.updateNemesis(copyNemesis.name, copyNemesis)
    }

    return (
        <Card>
            <CardHeader title={getName(nemesis)} />
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <CharacteristicCard characteristic={getNemesis(nemesis).brawn}  type={CharacteristicType.Brawn} onChange={(value: number): void => { onChange(NemesisKey.Brawn, value) }}/>
                        <CharacteristicCard characteristic={getNemesis(nemesis).agility}  type={CharacteristicType.Agility} onChange={(value: number): void => { onChange(NemesisKey.Agility, value) }}/>
                        <CharacteristicCard characteristic={getNemesis(nemesis).intellect}  type={CharacteristicType.Intellect} onChange={(value: number): void => { onChange(NemesisKey.Intellect, value) }}/>
                        <CharacteristicCard characteristic={getNemesis(nemesis).cunning}  type={CharacteristicType.Cunning} onChange={(value: number): void => { onChange(NemesisKey.Cunning, value) }}/>
                        <CharacteristicCard characteristic={getNemesis(nemesis).willpower}  type={CharacteristicType.Willpower} onChange={(value: number): void => { onChange(NemesisKey.Willpower, value) }}/>
                        <CharacteristicCard characteristic={getNemesis(nemesis).presence}  type={CharacteristicType.Presence} onChange={(value: number): void => { onChange(NemesisKey.Presence, value) }}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <SoakCard soak={getNemesis(nemesis).soak} />
                        <StatsCard stats={getNemesis(nemesis).wounds} type={StatsType.Wounds} onChange={(value: number): void => { onChange(NemesisKey.Wounds, value) }}/>
                        <StatsCard stats={getNemesis(nemesis).strain} type={StatsType.Strain} onChange={(value: number): void => { onChange(NemesisKey.Social, value) }}/>
                        <DefenseCard defense={getNemesis(nemesis).melee} type={DefenseType.Melee} onChange={(value: number): void => { onChange(NemesisKey.Melee, value) }}/>
                        <DefenseCard defense={getNemesis(nemesis).ranged} type={DefenseType.Ranged} onChange={(value: number): void => { onChange(NemesisKey.Ranged, value) }}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <RatingCard  rating={getNemesis(nemesis).combat} type={RatingType.Combat} onChange={(value: number): void => { onChange(NemesisKey.Combat, value) }}/>
                        <RatingCard  rating={getNemesis(nemesis).social} type={RatingType.Social} onChange={(value: number): void => { onChange(NemesisKey.Social, value) }}/>
                        <RatingCard  rating={getNemesis(nemesis).general} type={RatingType.General} onChange={(value: number): void => { onChange(NemesisKey.General, value) }}/>
                    </Grid>
                    <NemesisSkillTable nemesis={getNemesis(nemesis)} />
                </Grid>
            </CardContent>
        </Card>
    )
}