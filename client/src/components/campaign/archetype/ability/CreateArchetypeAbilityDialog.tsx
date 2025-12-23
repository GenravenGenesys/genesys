import {Dialog, DialogContent, DialogTitle, Divider} from "@mui/material";
import {useState} from "react";
import Archetype from "../../../../models/actor/player/Archetype";
import Ability from "../../../../models/Ability";
import {InputTextFieldCard} from "../../../common/InputTextFieldCard";
import InputSelectFieldCard from "../../../common/InlineSelectFieldCard";
import GenesysDialogActions from "../../../common/dialog/GenesysDialogActions";
import ArchetypeService from "../../../../services/ArchetypeService";
import Limit, {DefaultLimit, getLimitOptions} from "../../../../models/common/Limit";
import NumberRangeSelectCard from "../../../common/NumberRangeSelectCard";
import GridContainer from "../../../common/grid/GridContainer";
import ActivationCard from "../../../common/card/select/ActivationCard.tsx";
import {type Activation, type Cost, CostType, LimitType} from "../../../../api/model";
import CostCard from "../../../common/card/select/CostCard.tsx";

interface Props {
    archetype: Archetype
    open: boolean
    onClose: () => void
}

export default function CreateArchetypeAbilityDialog(props: Props) {
    const {archetype, open, onClose} = props
    const [ability, setAbility] = useState<Ability>()

    const onCreate = async (): Promise<void> => {
        if (ability) {
            if (!archetype.abilities.some(archetypeAbility => archetypeAbility.name === ability.name)) {
                if (!ability.cost) {
                    ability.cost = {
                        type: CostType.None,
                        amount: 0,
                    }
                }
                if (!ability.limiter) {
                    ability.limiter = DefaultLimit.create()
                }
                archetype.abilities.push(ability)
                await ArchetypeService.updateArchetype(archetype)
            }
        }
        onClose()
    }

    const onCostChange = async (key: keyof Cost, value: string) => {
        if (value === null) {
            return
        }
        const copyAbility = {...ability} as Ability
        switch (key) {
            case "type":
                copyAbility.cost.type = value as CostType
                break;
            case "amount":
                copyAbility.cost.amount = Number(value)
                break;
            default:
                break
        }
        setAbility(copyAbility)
    }

    const onLimitChange = async (key: keyof Limit, value: string) => {
        if (value === null) {
            return
        }
        const copyAbility = {...ability} as Ability
        switch (key) {
            case "type":
                copyAbility.limiter.type = value as LimitType
                break;
            case "limit":
                copyAbility.limiter.limit = Number(value)
                break;
            default:
                break
        }
        setAbility(copyAbility)
    }

    const onChange = async (key: keyof Ability, value: string) => {
        if (value === null) {
            return
        }
        const copyAbility = {...ability} as Ability
        switch (key) {
            case 'name':
                copyAbility.name = value
                break
            case "description":
                copyAbility.description = value
                break
            case "activation":
                copyAbility.activation = value as Activation
                break
            default:
                break
        }
        setAbility(copyAbility)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Custom Ability</DialogTitle>
            <DialogContent>
                <GridContainer spacing={10}>
                    <InputTextFieldCard defaultValue={ability?.name!} onCommit={(value: string): void => {
                        onChange('name', value)
                    }} title={'Name'} helperText={'Name'} placeholder={'Name'}/>
                </GridContainer>
                <Divider/>
                <GridContainer spacing={10}>
                    <InputTextFieldCard defaultValue={ability?.description!} onCommit={(value: string): void => {
                        onChange('description', value)
                    }} title={'Description'} helperText={'Description'} placeholder={'Description'}/>
                </GridContainer>
                <GridContainer spacing={10}>
                    <ActivationCard value={ability?.activation} onChange={(value: string): void => {
                        onChange('activation', value)
                    }} disabled={false}/>
                </GridContainer>
                <GridContainer spacing={10}>
                    <CostCard initialCost={ability?.cost?.type!} onChange={(value: string): void => {
                        onCostChange('type', value)
                    }} disabled={false}/>
                    <NumberRangeSelectCard defaultValue={ability?.cost?.amount!} title={'Amount'} onChange={(value: number): void => {
                        onCostChange('amount', String(value))
                    }} min={1} max={6}/>
                </GridContainer>
                <GridContainer spacing={10}>
                    <InputSelectFieldCard defaultValue={ability?.limiter?.type!} onCommit={(value: string): void => {
                        onLimitChange('type', value)
                    }} title={'Limit Type'} options={getLimitOptions()}/>
                    <NumberRangeSelectCard defaultValue={ability?.limiter?.limit!} title={'Limit'} onChange={(value: number): void => {
                        onLimitChange('limit', String(value))
                    }} min={1} max={6}/>
                </GridContainer>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose}/>
        </Dialog>
    )
}