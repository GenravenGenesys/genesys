import Spell from "../../models/spell/Spell";
import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import {useLocation} from "react-router";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../common/card/header/CenteredCardHeader";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import CheckboxTableCell from "../common/table/CheckboxTableCell";
import SkillService from "../../services/SkillService";
import Skill, {SkillType} from "../../models/actor/Skill";

interface Props {
    spell: Spell
    onSkillAddition: (name: string) => void
    onSkillRemoval: (name: string) => void
}

export default function SpellSkillCard(props: Props) {
    const {spell, onSkillAddition, onSkillRemoval} = props
    const [skills, setSkills] = useState<Skill[]>([])
    const pathname = useLocation().pathname

    useEffect(() => {
        (async (): Promise<void> => {
            const skillList = await SkillService.getSkills()
            if (!skillList) {
                return
            }
            setSkills(skillList.filter((skill) => skill.type === SkillType.Magic))
        })()
    }, [])

    const renderTableBody = () => {
        return (
            <TableBody>
                {skills.map((skill: Skill) => (
                    <TableRow key={skill.name}>
                        <TypographyCenterTableCell value={skill.name}/>
                        {renderSkillSelection(skill)}
                    </TableRow>
                ))}
            </TableBody>
        )
    }

    const renderSkillSelection = (skill: Skill) => {
        if (pathname.endsWith('/edit')) {
            return <CheckboxTableCell value={spell.skills.some(magic => magic.name === skill.name)}
                                      onAddition={() => onSkillAddition(skill.name)}
                                      onRemoval={() => onSkillRemoval(skill.name)}/>
        } else {
            return <Fragment/>
        }
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Skills'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderTableBody()}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}

interface ViewProps {
    spell: Spell
}

export function ViewSpellSkillCard(props: ViewProps) {
    const {spell} = props

    const renderTableBody = () => {
        return (
            <TableBody>
                {spell.skills.map((skill: Skill) => (
                    <TableRow key={skill.name}>
                        <TypographyCenterTableCell value={skill.name}/>
                    </TableRow>
                ))}
            </TableBody>
        )
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Skills'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderTableBody()}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}