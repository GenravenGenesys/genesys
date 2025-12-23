import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import CampaignService from "../../../services/CampaignService";
import SkillBackdrop from "../../skills/SkillBackdrop";
import {useFetchAllSkills} from "../../../hooks/useFetchAllSkills.tsx";
import type {Skill} from "../../../api/model";

export default function CampaignSkillSelectionTable() {
    const {skills} = useFetchAllSkills();
    const [openSkillBackDrop, setOpenSkillBackDrop] = useState(false);
    const headers = ['Name', 'Add'];

    const addSkill = async (skill: Skill) => {
        await CampaignService.addCampaignSkill(skill);
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {skills.sort((a, b) => a.name.localeCompare(b.name)).map((skill: Skill) => (
                        <TableRow key={skill.id}>
                            <TableCell>
                                <Button onClick={(): void => setOpenSkillBackDrop(true)}>{skill.name}</Button>
                                {openSkillBackDrop &&
                                    <SkillBackdrop open={openSkillBackDrop}
                                                   onClose={(): void => setOpenSkillBackDrop(false)}
                                                   skill={skill}/>}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => addSkill(skill)}>Add</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}