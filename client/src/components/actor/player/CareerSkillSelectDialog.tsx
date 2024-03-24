import {
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {GenesysDialogActions} from "../../common/dialog/GenesysDialogActions";
import Player, {PlayerSkill} from "../../../models/actor/player/Player";
import {useEffect, useState} from "react";
import * as React from "react";
import ActorService from "../../../services/ActorService";

interface Props {
    open: boolean
    onClose: () => void
    player: Player
}

export default function CareerSkillSelectDialog(props: Props): JSX.Element {
    const {open, onClose, player} = props
    const [skills, setSkills] = useState<PlayerSkill[]>([])

    useEffect(() => {
        setSkills(player.skills)
    }, [player.skills])

    const handleChange = (event: SelectChangeEvent<typeof skills>) => {
        const {value} = event.target
        console.log(skills.length)
        if (skills.length > 4) {

        }
    }

    const handleCreate = async (): Promise<void> => {
        player.skills = skills
        await ActorService.updatePlayer(player.name, player)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} keepMounted>
            <DialogTitle>Select Career Skills</DialogTitle>
            <DialogContent>
                <FormControl>
                    <InputLabel>Career Skills</InputLabel>
                    <Select multiple value={skills} onChange={handleChange}>
                        {player.skills.map((skill) => (
                            <MenuItem key={skill.name} value={skill.name}>{skill.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}