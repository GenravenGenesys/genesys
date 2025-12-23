import {Button, Checkbox, Dialog, DialogActions, DialogContent} from "@mui/material";
import CenteredDialogTitle from "../../common/dialog/CenteredDialogTitle";
import {useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useFetchAllSkills} from "../../../hooks/useFetchAllSkills.ts";
import type {Skill} from "../../../api/model";

interface Props {
    open: boolean
    onClose: () => void
    updateSkills: (skills: Skill[]) => void
    initialSkills: Skill[]
}

export default function TalentCareerSkillDialog(props: Props) {
    const {open, onClose, updateSkills, initialSkills} = props;
    const {skills} = useFetchAllSkills();
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>(initialSkills);

    const handleSkillChange = (skill: Skill) => {
        const isSelected = selectedSkills.some(selectedSkill => selectedSkill.name === skill.name);
        if (isSelected) {
            setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill.name !== skill.name));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const isSelected = (skill: Skill) => selectedSkills.some(selectedSkill => selectedSkill.name === skill.name);

    const handleSelect = async (): Promise<void> => {
        updateSkills(selectedSkills);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={'Add Talent Career Skill'}/>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {skills.map((skill) => (
                                <TableRow key={skill.name}>
                                    <TableCell>{skill.name}</TableCell>
                                    <TableCell sx={{"width": .5}}>
                                        <Checkbox
                                            checked={isSelected(skill)}
                                            onChange={() => handleSkillChange(skill)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={handleSelect}>SELECT</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}