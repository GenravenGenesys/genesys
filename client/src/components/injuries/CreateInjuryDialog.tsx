import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material"
import GenesysDialogActions from "../common/dialog/GenesysDialogActions";
import {type ChangeEvent, useState} from "react";
import {useNavigate} from "react-router";
import {RootPath} from "../../services/RootPath";
import {getInjuryController} from "../../api/generated/injury-controller/injury-controller.ts";


interface Props {
    open: boolean
    onClose: () => void
}

export default function CreateInjuryDialog(props: Props) {
    const {open, onClose} = props;
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleCreate = async (): Promise<void> => {
        const injury = await getInjuryController().createInjury(name);
        navigate(RootPath.Injury + injury.id + '/edit');
        onClose();
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        setName(value);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Critical Injury</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    );
}
