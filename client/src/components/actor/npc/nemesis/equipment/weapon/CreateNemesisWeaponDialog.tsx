import {Dialog, DialogContent, DialogTitle, Divider, Grid} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Nemesis from "../../../../../../models/actor/npc/Nemesis";
import {ActorWeapon} from "../../../../../../models/equipment/Weapon";
import Skill, {SkillType} from "../../../../../../models/actor/Skill";
import {getRangeOptions, RangeBand} from "../../../../../../models/common/RangeBand";
import {InputTextFieldCard} from "../../../../../common/InputTextFieldCard";
import SkillSelectCard from "../../../../../common/skill/SkillSelectCard";
import NumberRangeSelectCard from "../../../../../common/NumberRangeSelectCard";
import CheckButtonCard from "../../../../../common/CheckButtonCard";
import InputSelectFieldCard from "../../../../../common/InlineSelectFieldCard";
import NonPlayerCharacterWeaponQualityCard from "../../../equipment/weapon/NonPlayerCharacterWeaponQualityCard";
import {GenesysDialogActions} from "../../../../../common/dialog/GenesysDialogActions";
import ActorService from "../../../../../../services/ActorService";
import {useFetchSkillsByType} from "../../../../../skills/SkillWorkflow";

interface Props {
    nemesis: Nemesis
    open: boolean
    onClose: () => void
}

export default function CreateNemesisWeaponDialog(props: Props) {
    const {nemesis, open, onClose} = props
    const [weapon, setWeapon] = useState<ActorWeapon>()

    const onCreate = async (): Promise<void> => {
        if (weapon) {
            nemesis.weapons.push({...weapon})
            await ActorService.updateNemesis(nemesis.name, nemesis)
        }
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
            <DialogTitle>Add Custom Weapon</DialogTitle>
            <DialogContent>
                <Grid container spacing={10}>
                    <InputTextFieldCard defaultValue={weapon?.name!!} onCommit={(value: string): void => {
                        onChange('name', value)
                    }} title={'Name'} helperText={'Name'} placeholder={'Name'}/>
                </Grid>
                <Divider/>
                <Grid container spacing={10}>
                    <SkillSelectCard defaultValue={weapon?.skill!!} onCommit={(value: Skill): void => {
                        onSkillChange(value)
                    }} skills={useFetchSkillsByType(SkillType.Combat)} title={'Required Skill'}/>
                    <NumberRangeSelectCard title={'Damage'} defaultValue={weapon?.damage!!}
                                           onChange={(value: number): void => {
                                               onChange('damage', String(value))
                                           }} min={0} max={20}/>
                    <CheckButtonCard title={'Brawn Powered'} value={weapon?.brawn!!}
                                     onChange={(value: boolean): void => {
                                         onChange('brawn', String(value))
                                     }}/>
                    <NumberRangeSelectCard title={'Critical'} defaultValue={weapon?.critical!!}
                                           onChange={(value: number): void => {
                                               onChange('critical', String(value))
                                           }} min={1} max={7}/>
                    <InputSelectFieldCard defaultValue={weapon?.range!!} onCommit={(value: string): void => {
                        onChange('range', value)
                    }} title={'Range'} options={getRangeOptions()}/>
                </Grid>
                <Divider/>
                <Grid container>
                    <NonPlayerCharacterWeaponQualityCard weapon={weapon!!}/>
                </Grid>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose}/>
        </Dialog>
    )
}