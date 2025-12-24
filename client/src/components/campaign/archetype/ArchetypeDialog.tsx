import {type ChangeEvent, useState} from "react";
import {useNavigate} from "react-router";
import {RootPath} from "../../../services/RootPath";
import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import GenesysDialogActions from "../../common/dialog/GenesysDialogActions";
import {getArchetypeController} from "../../../api/generated/archetype-controller/archetype-controller.ts";

interface Props {
    open: boolean
    onClose: () => void
}

export default function ArchetypeDialog(props: Props) {
    const {open, onClose} = props
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        const archetype = await getArchetypeController().createArchetype(name);
        navigate(RootPath.Archetype + archetype.id + '/view')
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Name New Archetype</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}