import {Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useState} from "react";
import Skill from "../../../../../models/actor/Skill";
import Player, {PlayerSkill} from "../../../../../models/actor/player/Player";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import TableCell from "@mui/material/TableCell";

interface Props {
    open: boolean
    onSelect: (skills: PlayerSkill[]) => void
    onClose: () => void
    player: Player
}

export default function CareerSkillSelectDialog(props: Props) {
    const {open, onClose, onSelect, player} = props;
    const skills = player.career.skills;
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

    const handleSkillChange = (skill: Skill) => {
        const isSelected = selectedSkills.some(selectedSkill => selectedSkill.name === skill.name);
        if (isSelected) {
            setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill.name !== skill.name));
        } else if (selectedSkills.length < 4) {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const isSelected = (skill: Skill) => selectedSkills.some(selectedSkill => selectedSkill.name === skill.name);

    const handleSelect = async (): Promise<void> => {
        let playerSkills: PlayerSkill[] = [];
        for (const skill of selectedSkills) {
            playerSkills = playerSkills.concat({ ...skill, career: true, ranks: 1 });
        }
        onSelect(playerSkills);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Select Career Skills</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {skills.map((skill, index) => (
                                <TableRow key={skill.name}>
                                    <TableCell>{skill.name}</TableCell>
                                    <TableCell sx={{"width": .5}}>
                                        <Checkbox
                                            checked={isSelected(skill)}
                                            onChange={() => handleSkillChange(skill)}
                                            disabled={!isSelected(skill) && selectedSkills.length >= 4}
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