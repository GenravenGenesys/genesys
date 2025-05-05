import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router";
import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import GenesysDialogActions from "../common/dialog/GenesysDialogActions";
import SpellService from "../../services/SpellService";
import { RootPath } from "../../services/RootPath";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CreateSpellDialog(props: Props) {
    const {open, onClose} = props
    const [name, setName] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let spell = await SpellService.createSpell(name)
        navigate(RootPath.Spell + spell.id + '/edit')
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Spell</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}