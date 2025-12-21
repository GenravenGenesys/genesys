import {Dialog, DialogContentText, TextField} from "@mui/material";
import {type ChangeEvent, useState} from "react";
import {useNavigate} from "react-router";
import {RootPath} from "../../services/RootPath";
import GenesysDialogActions from "../common/dialog/GenesysDialogActions";
import CenteredDialogTitle from "../common/dialog/CenteredDialogTitle.tsx";
import {getQualityController} from "../../api/generated/quality-controller/quality-controller.ts";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function QualityDialog(props: Props) {
    const {open, onClose} = props;
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleCreate = async (): Promise<void> => {
        const quality = await getQualityController().createQuality(name);
        navigate(RootPath.Qualities + quality.id + '/view');
        onClose();
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        setName(value);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={"Name New Equipment Quality"}/>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required fullWidth/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    );
}
