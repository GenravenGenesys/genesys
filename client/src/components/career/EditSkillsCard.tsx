import {
    Card,
    CardContent,
} from "@mui/material";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import Career from "../../models/actor/player/Career";
import Skill from "../../models/actor/Skill";
import {useEffect, useState} from "react";
import CareerService from "../../services/CareerService";
import {useFetchCurrentSettingSkills} from "../skills/SkillWorkflow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import * as React from "react";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import CheckboxTableCell from "../common/table/CheckboxTableCell";

interface Props {
    car: Career
}

export default function EditSkillsCard(props: Props): JSX.Element {
    const {car} = props
    const [career, setCareer] = useState<Career>(car)

    useEffect(() => {
        setCareer(car)
    }, [car])

    const onSkillAddition = async (skill: Skill) => {
        career.skills = career.skills.concat(skill)
        if (career.skills.length > 8) {
            career.skills.pop()
        }
        await updateCareer()
    }

    const onSkillRemoval = async (skill: Skill) => {
        career.skills.forEach((sk, index) => {
            if (sk.name === skill.name) {
                career.skills = career.skills.splice(index, 1)
            }
        })
        await updateCareer()
    }

    const updateCareer = async () => {
        await CareerService.updateCareer(career.name, career)
    }

    const renderTableBody = (settingSKills: Skill[]): JSX.Element => {
        if (!career.skills) {
            return <GenesysDescriptionTypography text={'None'}/>
        } else {
            return (
                <TableBody>
                    {settingSKills.map((skill: Skill) => (
                        <TableRow key={skill.name}>
                            <TypographyCenterTableCell value={skill.name}/>
                            <CheckboxTableCell value={career.skills.some(sk => sk.name === skill.name)}
                                               onAddition={() => onSkillAddition(skill)}
                                               onRemoval={() => onSkillRemoval(skill)}/>
                        </TableRow>
                    ))}
                </TableBody>
            )
        }
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Career Skills'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderTableBody(useFetchCurrentSettingSkills())}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}