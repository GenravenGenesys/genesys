import React, {useState} from "react";
import {Button, TableCell, Typography} from "@mui/material";
import GenesysDescriptionTypography from "../typography/GenesysDescriptionTypography";
import Actor, {ActorSkill, getCharacteristicRanks} from "../../../models/actor/Actor";
import GenesysSkillDiceTypography from "../typography/GenesysSkillDiceTypography";
import {Difficulty} from "../../../models/common/Difficulty";
import GenesysDifficultyDiceTypography from "../typography/GenesysDifficultyDiceTypography";
import Cost, {CostType} from "../../../models/common/Cost";
import Limit, {LimitType} from "../../../models/common/Limit";
import RollDialog from "../../roll/RollDialog";
import Roll, {DefaultRoll, DieType} from "../../../models/Roll";
import {renderSingleRowTableHeader} from "./TableRenders";

interface LeftProps {
    value: string
}

export function TypographyLeftTableCell(props: LeftProps): JSX.Element {
    const {value} = props
    return (
        <TableCell style={{textAlign: 'left'}}>
            <Typography>{value}</Typography>
        </TableCell>
    )
}

interface CenterProps {
    value: string
    span?: number
}

export function TypographyCenterTableCell(props: CenterProps): JSX.Element {
    const {value, span} = props
    return (
        <TableCell style={{textAlign: 'center'}} colSpan={span}>
            <Typography>{value}</Typography>
        </TableCell>
    )
}

interface CostProps {
    cost: Cost
    span?: number
}

export function CostTableCell(props: CostProps): JSX.Element {
    const {cost, span} = props

    const renderCost = () => {
        switch (cost.type) {
            case CostType.None:
                return 'None'
            case CostType.Strain:
                return cost.amount + ' Strain'
            case CostType.StoryPoint:
                return cost.amount + ' Story Point'
        }
    }

    return (
        <TableCell style={{textAlign: 'center'}} colSpan={span}>
            <Typography>{renderCost()}</Typography>
        </TableCell>
    )
}

interface LimitProps {
    limit: Limit
    span?: number
}

export function LimitTableCell(props: LimitProps): JSX.Element {
    const {limit, span} = props

    const renderLimit = () => {
        switch (limit.type) {
            case LimitType.PerRound:
                return limit.limit + ' Per Round'
            case LimitType.PerEncounter:
                return limit.limit + ' Per Encounter'
            case LimitType.PerSession:
                return limit.limit + ' Per Session'
            case LimitType.None:
                return 'None'
        }
    }

    return (
        <TableCell style={{textAlign: 'center'}} colSpan={span}>
            <Typography>{renderLimit()}</Typography>
        </TableCell>
    )
}

interface DescriptionCenterProps {
    value: string
    span?: number
}

export function GenesysDescriptionTypographyCenterTableCell(props: DescriptionCenterProps): JSX.Element {
    const {value, span} = props
    return (
        <TableCell style={{textAlign: 'center'}} colSpan={span}>
            <GenesysDescriptionTypography text={value}/>
        </TableCell>
    )
}

interface SkillCenterProps {
    actor: Actor
    skill: ActorSkill
}

export function GenesysDicePoolCenterTableCell(props: SkillCenterProps): JSX.Element {
    const {actor, skill} = props
    const [openRollDialog, setOpenRollDialog] = useState(false)

    const createCharacteristicRoll = (): Roll => {
        let roll = DefaultRoll.create()
        let characteristicRanks = getCharacteristicRanks(actor, skill)
        let skillRanks = skill.ranks

        while (characteristicRanks > 0 && skillRanks > 0) {
            roll.proficiency = roll.proficiency + 1
            characteristicRanks--
            skillRanks--
        }
        if (characteristicRanks > 0) {
            while (characteristicRanks > 0) {
                roll.ability= roll.ability + 1
                characteristicRanks--
            }
        }
        if (skillRanks > 0) {
            while (skillRanks > 0) {
                roll.ability= roll.ability + 1
                skillRanks--
            }
        }
        console.log(roll)
        return roll
    }

    const renderSkillDice = () => {
        return <GenesysSkillDiceTypography characteristicRanks={getCharacteristicRanks(actor, skill)}
                                           skillRanks={skill.ranks}/>
    }

    return (
        <TableCell style={{textAlign: 'center'}}>
            <Button onClick={(): void => setOpenRollDialog(true)}>{renderSkillDice()}</Button>
            {openRollDialog && <RollDialog open={openRollDialog} onClose={(): void => setOpenRollDialog(false)} diceRoll={createCharacteristicRoll}/>}
        </TableCell>
    )
}

interface DifficultyProps {
    difficulty: Difficulty
}

export function GenesysDifficultyCenterTableCell(props: DifficultyProps): JSX.Element {
    const {difficulty} = props
    return (
        <TableCell style={{textAlign: 'center'}}>
            <GenesysDifficultyDiceTypography difficulty={difficulty}/>
        </TableCell>
    )
}