import React, {Fragment} from "react";
import {TableCell, Typography} from "@mui/material";
import GenesysDescriptionTypography from "../typography/GenesysDescriptionTypography";
import Actor, {ActorSkill, getCharacteristicRanks} from "../../../models/actor/Actor";
import GenesysSkillDiceTypography from "../typography/GenesysSkillDiceTypography";
import {Difficulty} from "../../../models/common/Difficulty";
import GenesysDifficultyDiceTypography from "../typography/GenesysDifficultyDiceTypography";
import {SkillSelectField} from "../SkillSelectCard";
import Skill from "../../../models/actor/Skill";

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
    return (
        <TableCell style={{textAlign: 'center'}}>
            <GenesysSkillDiceTypography characteristicRanks={getCharacteristicRanks(actor, skill)}
                                        skillRanks={skill.ranks}/>
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

interface SkillSelectProps {
    skill: Skill
    skills: Skill[]
    onCommit: (value: Skill) => void
}

export function GenesysSkillSelectTableCell(props: SkillSelectProps): JSX.Element {
    const {skill, skills, onCommit} = props

    return (
        <TableCell style={{textAlign: 'center'}}>
            <SkillSelectField defaultValue={skill} skills={skills} onCommit={onCommit}/>
        </TableCell>
    )
}