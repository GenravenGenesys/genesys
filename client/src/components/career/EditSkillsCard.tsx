import {
    Card,
    CardContent,
} from "@mui/material";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import Career from "../../models/actor/player/Career";
import Skill, {DefaultSkill} from "../../models/actor/Skill";
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
import {GenesysSkillSelectTableCell, TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import CheckboxTableCell from "../common/table/CheckboxTableCell";

interface Props {
    car: Career
}

export default function EditSkillsCard(props: Props): JSX.Element {
    const {car} = props
    const [career, setCareer] = useState<Career>(car)
    const [skills, setSkills] = useState<Skill[]>(useFetchCurrentSettingSkills)
    const [skillOne, setSkillOne] = useState<Skill>(DefaultSkill.create)
    const [skillTwo, setSkillTwo] = useState<Skill>(DefaultSkill.create)
    const [skillThree, setSkillThree] = useState<Skill>(DefaultSkill.create)
    const [skillFour, setSkillFour] = useState<Skill>(DefaultSkill.create)
    const [skillFive, setSkillFive] = useState<Skill>(DefaultSkill.create)
    const [skillSix, setSkillSix] = useState<Skill>(DefaultSkill.create)
    const [skillSeven, setSkillSeven] = useState<Skill>(DefaultSkill.create)
    const [skillEight, setSkillEight] = useState<Skill>(DefaultSkill.create)

    useEffect(() => {
        setCareer(car)
    }, [car])

    const updateCareer = async (num: number) => {
        switch (num) {
            case 1:
                break
            case 2:
                break
            case 3:
                break
            case 4:
                break
            case 5:
                break
            case 6:
                break
            case 7:
                break
            case 8:
                break
        }
        career.skills = [skillOne, skillTwo, skillThree, skillFour, skillFive, skillSix, skillSeven, skillEight]
        await CareerService.updateCareer(career.name, career)
    }

    const renderTableBody = (settingSkills: Skill[]): JSX.Element => {
        if (!career.skills) {
            return <GenesysDescriptionTypography text={'None'}/>
        } else {
            return (
                <TableBody>
                    <TableRow key={skillOne.name}>
                        <TypographyCenterTableCell value={skillOne.name}/>
                        <GenesysSkillSelectTableCell skill={skillOne} skills={settingSkills} onCommit={(value) => setSkillOne(value)}/>
                    </TableRow>
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