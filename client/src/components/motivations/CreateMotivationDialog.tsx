import {type ChangeEvent, type FC, useState} from "react";
import {useNavigate} from "react-router";
import SpellService from "../../services/SpellService.ts";
import {RootPath} from "../../services/RootPath.ts";
import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import GenesysDialogActions from "../common/dialog/GenesysDialogActions.tsx";


interface Props {
    open: boolean
    onClose: () => void
}

const CreateMotivationDialog: FC<Props> = ({open, onClose}) => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleCreate = async (): Promise<void> => {
        const spell = await SpellService.createSpell(name);
        navigate(RootPath.Motivations + spell.id + '/edit');
        onClose();
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        setName(value);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Spell</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    );
};

export default CreateMotivationDialog;