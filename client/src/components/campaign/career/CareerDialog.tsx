import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {RootPath} from "../../../services/RootPath";
import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import CareerService from "../../../services/CareerService";
import GenesysDialogActions from "../../common/dialog/GenesysDialogActions";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CareerDialog(props: Props) {
    const {open,onClose} = props
    const [name,setName] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let career = await CareerService.createCareer(name)
        navigate(RootPath.Career + career.id + '/edit')
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Name New Career</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}