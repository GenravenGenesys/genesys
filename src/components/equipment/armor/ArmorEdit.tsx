import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import EquipmentService from '../../../services/EquipmentService';
import {EquipmentPath} from '../../../services/RootPath';
import {EditNumberFieldCard, EditStringFieldCard} from "../../common/ViewFieldCard";
import {EditPriceCheckBoxCard} from "../../common/NumberCheckBox";
import {Armor} from "../../../models/equipment/Armor";

interface Props {
    ar: Armor
}

export default function ArmorEdit(props: Props) {
    const {ar} = props
    const [armor, setArmor] = useState<Armor>(ar)

    let navigate = useNavigate()

    useEffect(() => {
        setArmor(ar)
    }, [ar])

    const onChange = async (key: keyof Armor, value: string) => {
        if (value === null) {
            return;
        }
        const copyArmor = {...armor} as Armor
        switch (key) {
            case 'defense':
                copyArmor.defense = Number(value)
                break
            case 'soak':
                copyArmor.soak = Number(value)
                break
            case 'description':
                copyArmor.description = value
                break
            case 'rarity':
                copyArmor.rarity = Number(value)
                break
            case 'price':
                copyArmor.price = Number(value)
                break;
            case "restricted":
                copyArmor.restricted = !Boolean(copyArmor.restricted)
                break
            case 'encumbrance':
                copyArmor.encumbrance = Number(value)
                break
            default:
                break
        }

        await updateArmor(copyArmor)
    }

    const updateArmor = async (copyArmor: Armor) => {
        setArmor(await EquipmentService.updateArmor(copyArmor))
    }

    const onView = () => {
        navigate(EquipmentPath.Armor + armor.armor_id + '/view');
    }

    return (
        <Card>
            <CardHeader title={armor.name} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <EditStringFieldCard defaultValue={armor.description} onCommit={(value: string): void => {
                            onChange('description', value)
                        }} title={'Description'}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={10}>
                        <EditNumberFieldCard value={armor.soak} title={'Soak'} onChange={(value: number): void => {
                            onChange('soak', String(value))
                        }} min={0} max={6}/>
                        <EditNumberFieldCard value={armor.defense} title={'Defense'}
                                             onChange={(value: number): void => {
                                                 onChange('defense', String(value))
                                             }} min={0} max={5}/>
                        <EditNumberFieldCard value={armor.encumbrance} title={'Encumbrance'}
                                             onChange={(value: number): void => {
                                                 onChange('encumbrance', String(value))
                                             }} min={0} max={10}/>
                        <EditPriceCheckBoxCard check={armor.restricted} value={armor.price} checkTitle={'Restricted'}
                                               onBooleanChange={(value: boolean): void => {
                                                   onChange('restricted', String(value))
                                               }} onNumberChange={(value: number): void => {
                            onChange('price', String(value))
                        }}/>
                        <EditNumberFieldCard value={armor.rarity} title={'Rarity'} onChange={(value: number): void => {
                            onChange('rarity', String(value))
                        }} min={0} max={11}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
