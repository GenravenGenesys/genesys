import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid} from "@mui/material";
import Actor from "../../../../../models/actor/Actor";
import {SkillSelectCard} from "../../../../common/SkillSelectCard";
import Skill, {SkillType} from "../../../../../models/actor/Skill";
import NumberRangeSelectCard from "../../../../common/NumberRangeSelectCard";
import CheckButtonCard from "../../../../common/CheckButtonCard";
import InputSelectFieldCard from "../../../../common/InlineSelectFieldCard";
import {getRangeOptions, RangeBand} from "../../../../../models/common/RangeBand";
import * as React from "react";
import {useState} from "react";
import {ActorWeapon} from "../../../../../models/equipment/Weapon";
import ActorService from "../../../../../services/ActorService";
import {InputTextFieldCard} from "../../../../common/InputTextFieldCard";
import ActorWeaponQualityCard from "./ActorWeaponQualityCard";

interface Props {
    actor: Actor
    open: boolean
    onClose: () => void
}

export default function CreateWeaponDialog(props: Props) {
    const {actor, open, onClose} = props
    const [weapon, setWeapon] = useState<ActorWeapon>()

    const onCreate = async (): Promise<void> => {
        await ActorService.createRivalWeapon(actor.name, weapon!!)
        onClose()
    }

    const onSkillChange = async (value: Skill) => {
        const copyWeapon = {...weapon} as ActorWeapon
        copyWeapon.skill = value
        setWeapon(copyWeapon)
    }

    const onChange = async (key: keyof ActorWeapon, value: string) => {
        if (value === null) {
            return
        }
        const copyWeapon = {...weapon} as ActorWeapon
        switch (key) {
            case 'name':
                copyWeapon.name = value
                break
            case "brawn":
                copyWeapon.brawn = !Boolean(copyWeapon.brawn)
                break
            case "range":
                copyWeapon.range = value as RangeBand
                break
            case "damage":
                copyWeapon.damage = Number(value)
                break
            case "critical":
                copyWeapon.critical = Number(value)
                break
            default:
                break
        }
        setWeapon(copyWeapon)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Add Custom Weapon
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={10}>
                    <InputTextFieldCard defaultValue={weapon?.name!!} onCommit={(value: string): void => { onChange('name', value) }} title={'Name'} helperText={'Name'} placeholder={'Name'} />
                </Grid>
                <Divider />
                <Grid container spacing={10}>
                    <SkillSelectCard defaultValue={weapon?.skill!!} onCommit={(value: Skill): void => {onSkillChange(value)}} type={SkillType.Combat} />
                    <NumberRangeSelectCard title={'Damage'} defaultValue={weapon?.damage!!} onChange={(value: number): void => {onChange('damage', String(value))}} min={0} max={20} />
                    <CheckButtonCard title={'Brawn Powered'} value={weapon?.brawn!!} onChange={(value: boolean): void => {onChange('brawn', String(value))}} />
                    <NumberRangeSelectCard title={'Critical'} defaultValue={weapon?.critical!!} onChange={(value: number): void => {onChange('critical', String(value))}} min={1} max={7} />
                    <InputSelectFieldCard defaultValue={weapon?.range!!} onCommit={(value: string): void => { onChange('range', value) }} title={'Range'} options={getRangeOptions()} />
                </Grid>
                <Divider/>
                <Grid container>
                    <ActorWeaponQualityCard weapon={weapon!!}/>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={onCreate}>CREATE</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}