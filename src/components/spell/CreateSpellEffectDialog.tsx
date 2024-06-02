import {useState} from "react";
import {Dialog, DialogContent, DialogTitle, Grid} from "@mui/material";
import {InputTextFieldCard} from "../common/InputTextFieldCard";
import {GenesysDialogActions} from "../common/dialog/GenesysDialogActions";
import * as React from "react";
import Spell, {Effect} from "../../models/spell/Spell";
import SpellService from "../../services/SpellService";
import NumberRangeSelectCard from "../common/NumberRangeSelectCard";

interface Props {
    spell: Spell
    open: boolean
    onClose: () => void
}

export default function CreateSpellEffectDialog(props: Props) {
    const {spell, open, onClose} = props
    const [effect, setEffect] = useState<Effect>()

    const onCreate = async (): Promise<void> => {
        if (effect) {
            if (!spell.effects.some(spellEffects => spellEffects.name === effect.name)) {
                spell.effects.push(effect)
                await SpellService.updateSpell(spell.name, spell)
            }
        }
        onClose()
    }

    const onChange = async (key: keyof Effect, value: string) => {
        if (value === null) {
            return
        }
        const copyEffect = {...effect} as Effect
        switch (key) {
            case 'name':
                copyEffect.name = value
                break
            case "description":
                copyEffect.description = value
                break
            case "increase":
                copyEffect.increase = Number(value)
                break;
            default:
                break
        }
        setEffect(copyEffect)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Spell Effect</DialogTitle>
            <DialogContent>
                <Grid container spacing={10}>
                    <InputTextFieldCard defaultValue={effect?.name!!} onCommit={(value: string): void => {
                        onChange('name', value)
                    }} title={'Name'} helperText={'Name'} placeholder={'Name'}/>
                </Grid>
                <Grid container spacing={10}>
                    <InputTextFieldCard defaultValue={effect?.description!} onCommit={(value: string): void => {
                        onChange('description', value)
                    }} title={'Description'} helperText={'Description'} placeholder={'Description'}/>
                </Grid>
                <Grid container spacing={10}>
                    <NumberRangeSelectCard defaultValue={effect?.increase!} title={'Difficulty Modifier'}
                                           onChange={(value: number): void => {
                                               onChange('increase', String(value))
                                           }} min={0} max={4}/>
                </Grid>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose}/>
        </Dialog>
    )
}