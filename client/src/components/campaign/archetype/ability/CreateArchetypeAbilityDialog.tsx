import {Dialog, DialogContent, Divider} from "@mui/material";
import {useState} from "react";
import {type Archetype, type Ability} from "../../../../api/model";
import {InputTextFieldCard} from "../../../common/InputTextFieldCard";
import GenesysDialogActions from "../../../common/dialog/GenesysDialogActions";
import GridContainer from "../../../common/grid/GridContainer";
import ActivationCard from "../../../common/card/select/ActivationCard.tsx";
import {type Activation, type Cost, CostType, type Limit, LimitType} from "../../../../api/model";
import CostCard from "../../../common/card/select/CostCard.tsx";
import LimitCard from "../../../common/card/select/LimitCard.tsx";
import CenteredDialogTitle from "../../../common/dialog/CenteredDialogTitle.tsx";
import {getArchetypeController} from "../../../../api/generated/archetype-controller/archetype-controller.ts";

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
                if (!ability.limit) {
                    ability.limit = {
                        type: LimitType.None,
                        limit: 0,
                    }
                }
                archetype.abilities.push(ability)
                await getArchetypeController().updateArchetype(archetype.id, archetype);
            }
        }
        onClose()
    }

    const handleCostChange = async (value: Cost) => {
        if (ability) {
            setAbility({...ability, cost: value});
        }
    };

    const handleLimitChange = async (value: Limit) => {
        if (ability) {
            setAbility({...ability, limit: value});
        }
    };

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
            <CenteredDialogTitle title={'Add Custom Ability'}/>
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
                    <ActivationCard value={ability?.activation!} onChange={(value: string): void => {
                        onChange('activation', value)
                    }} disabled={false}/>
                </GridContainer>
                <GridContainer spacing={10}>
                    <CostCard initialCost={ability?.cost!} onChange={handleCostChange} disabled={false}/>
                    <LimitCard initialLimit={ability?.limit!} onChange={handleLimitChange} disabled={false}/>
                </GridContainer>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose}/>
        </Dialog>
    )
}