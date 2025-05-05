import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material"
import GenesysDialogActions from "../common/dialog/GenesysDialogActions";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router";
import {RootPath} from "../../services/RootPath";
import InjuryService from "../../services/InjuryService";


interface Props {
    open: boolean
    onClose: () => void
}

export default function CreateInjuryDialog(props: Props) {
    const {open, onClose} = props
    const [name, setName] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let injury = await InjuryService.createInjury(name)
        navigate(RootPath.Injury + injury.id + '/edit')
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Critical Injury</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}
