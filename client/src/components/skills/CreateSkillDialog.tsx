import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import SkillService from "../../services/SkillService";
import {RootPath} from "../../services/Path";
import {GenesysDialogActions} from "../common/dialog/GenesysDialogActions";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CreateSkillDialog(props: Props) {
    const {open, onClose} = props
    const [name, setName] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let skill = await SkillService.createSkill(name)
        navigate(RootPath.Skills + skill.name + '/edit')
        onClose()
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Skill</DialogTitle>
            <DialogContentText>
                <TextField onChange={onNameChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}
