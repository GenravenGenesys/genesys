import {Card, CardContent, CardHeader, Divider, IconButton} from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';
import CheckIcon from '@mui/icons-material/Check';
import GearService from '../../../../services/equipment/GearService';
import {EquipmentPath} from "../../../../services/RootPath";
import {InputTextFieldCard} from "../../../common/InputTextFieldCard";
import Skill from "../../../../models/actor/Skill";
import {RangeBand, getRangeOptions} from "../../../../models/common/RangeBand";
import InputSelectFieldCard from "../../../common/InlineSelectFieldCard";
import {Gear} from "../../../../models/equipment/Gear";
import {useFetchAllSkills} from "../../../skills/SkillWorkflow";
import NumberTextFieldCard from "../../../common/card/NumberTextFieldCard";
import BooleanTextFieldCard from "../../../common/card/BooleanTextFieldCard";
import PriceTextFieldCard from "../../../common/card/PriceTextFieldCard";
import SkillAutocompleteCard from "../../../common/card/SkillAutocompleteCard";
import GridContainer from "../../../common/grid/GridContainer";

interface Props {
    gea: Gear
}

export default function GearEdit(props: Props) {
    const {gea} = props;
    const [gear, setGear] = useState<Gear>(gea);
    const pathname = useLocation().pathname;
    const navigate = useNavigate()

    useEffect(() => {
        setGear(gea)
    }, [gea])

    const onSkillChange = async (value: Skill) => {
        const copyGear = {...gear} as Gear
        copyGear.skill = value
        setGear(copyGear)
        await GearService.updateGear(copyGear)
    }

    const onChange = async (key: keyof Gear, value: string) => {
        if (value === null || (gear !== null && gear[key] === value)) {
            return;
        }
        const copyGear = {...gear} as Gear
        switch (key) {
            case 'description':
                copyGear.description = value
                break
            case "restricted":
                copyGear.restricted = !copyGear.restricted
                break
            case "range":
                copyGear.range = value as RangeBand
                break
            case "price":
                copyGear.price = Number(value)
                break
            case "rarity":
                copyGear.rarity = Number(value)
                break
            case "encumbrance":
                copyGear.encumbrance = Number(value)
                break
            default:
                break
        }
        updateGear(copyGear)
    }

    const updateGear = async (copyGear: Gear) => {
        setGear(copyGear)
        await GearService.updateGear(copyGear)
    }

    const onView = () => {
        navigate(EquipmentPath.Gear + gear.name + '/view');
    }

    return (
        <Card>
            <CardHeader title={gear.name} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}/>
            <Divider/>
            <CardContent>
                <GridContainer centered>
                    <GridContainer spacing={10}>
                        <InputTextFieldCard defaultValue={gear.description} onCommit={(value: string): void => {
                            onChange('description', value)
                        }} title={'Description'} helperText={'Description'} placeholder={'Description'}/>
                    </GridContainer>
                    <Divider/>
                    <GridContainer spacing={10}>
                        <SkillAutocompleteCard title={"Required Skill"} disabled={pathname.endsWith('/view')} handleSkillChange={(value: Skill): void => {
                            onSkillChange(value)
                        }} skills={useFetchAllSkills()} startingSkill={gear?.skill!}/>
                        <InputSelectFieldCard defaultValue={gear.range} onCommit={(value: string): void => {
                            onChange('range', value)
                        }} title={'Range'} options={getRangeOptions()}/>
                    </GridContainer>
                    <Divider/>
                    <GridContainer spacing={10}>
                        <NumberTextFieldCard title={'Encumbrance'} value={gear.encumbrance}
                                             onChange={(value: number): void => {
                                                 onChange('encumbrance', String(value))
                                             }} min={1}
                                             max={10} disabled={pathname.endsWith('/view')}/>
                        <BooleanTextFieldCard title={'Restricted'} value={gear.restricted}
                                              disabled={pathname.endsWith('/view')} onChange={(value: boolean): void => {
                            onChange('restricted', String(value))
                        }}/>
                        <PriceTextFieldCard price={gear.price} restricted={gear.restricted}
                                            onChange={(value: number): void => {
                                                onChange('price', String(value))
                                            }} min={1} max={10000000}
                                            disabled={pathname.endsWith('/view')}/>
                        <NumberTextFieldCard title={'Rarity'} value={gear.rarity} onChange={(value: number): void => {
                            onChange('rarity', String(value))
                        }}
                                             min={0}
                                             max={10} disabled={pathname.endsWith('/view')}/>
                    </GridContainer>
                </GridContainer>
            </CardContent>
        </Card>
    );
}
