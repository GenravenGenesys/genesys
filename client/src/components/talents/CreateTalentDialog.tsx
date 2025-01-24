import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import TalentService from "../../services/TalentService";
import GenesysDialogActions from "../common/dialog/GenesysDialogActions";
import {RootPath} from "../../services/RootPath";

interface Props {
    open: boolean
    onClose: () => void
}

export default function TalentDialog(props: Props) {
    const {open, onClose} = props
    const [name, setName] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let talent = await TalentService.createTalent(name)
        navigate(RootPath.Talent + talent.id + '/edit')
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Name New Talent</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}
