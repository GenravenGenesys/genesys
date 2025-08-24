import {Dialog, DialogContent, DialogTitle, TextField} from "@mui/material";
import GenesysDialogActions from "../../common/dialog/GenesysDialogActions";
import {useNavigate} from "react-router";
import {ChangeEvent, useState} from "react";
import SceneService from "../../../services/SceneService";
import {RootPath} from "../../../services/RootPath";

interface Props {
    open: boolean
    onClose: () => void
}

export default function SceneCreationDialog(props: Props){
    const {open, onClose} = props;
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        setName(value);
    };

    const handleCreate = async (): Promise<void> => {
        const scene = await SceneService.createScene(name);
        navigate(RootPath.Scenes + scene.id + '/edit');
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{textAlign: 'center'}}>Create Scene</DialogTitle>
            <DialogContent>
                <TextField onChange={onChange} value={name} required/>
            </DialogContent>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    );
}