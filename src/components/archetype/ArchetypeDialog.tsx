import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {RootPath} from "../../services/RootPath";
import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import ArchetypeService from "../../services/ArchetypeService";
import {GenesysDialogActions} from "../common/dialog/GenesysDialogActions";
import {useFetchCurrentSetting} from "../setting/SettingWorkflow";

interface Props {
    open: boolean
    onClose: () => void
}

export default function ArchetypeDialog(props: Props) {
    const {open,onClose} = props
    const [name,setName] = useState('')
    let current = useFetchCurrentSetting()
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let archetype = await ArchetypeService.createArchetype(name)
        archetype.settings = archetype.settings.concat(current)
        await ArchetypeService.updateArchetype(archetype.name, archetype)
        navigate(RootPath.Archetype + archetype?.name!! + '/edit')
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
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