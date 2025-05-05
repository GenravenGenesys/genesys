import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router";
import {RootPath} from "../../services/RootPath";
import QualityService from "../../services/QualityService";
import GenesysDialogActions from "../common/dialog/GenesysDialogActions";

interface Props {
    open: boolean
    onClose: () => void
}

export default function QualityDialog(props: Props) {
    const {open, onClose} = props
    const [name, setName] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let quality = await QualityService.createQuality(name)
        navigate(RootPath.Qualities + quality.id + '/view')
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Name New Equipment Quality</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required fullWidth/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}
