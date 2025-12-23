import {type ChangeEvent, useState} from "react";
import {useNavigate} from "react-router";
import {RootPath} from "../../../services/RootPath";
import {Dialog, DialogContentText, TextField} from "@mui/material";
import GenesysDialogActions from "../../common/dialog/GenesysDialogActions";
import {getCareerController} from "../../../api/generated/career-controller/career-controller.ts";
import CenteredDialogTitle from "../../common/dialog/CenteredDialogTitle.tsx";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CareerDialog(props: Props) {
    const {open,onClose} = props;
    const [name,setName] = useState('');
    const navigate = useNavigate();

    const handleCreate = async (): Promise<void> => {
        const career = await getCareerController().createCareer(name);
        navigate(RootPath.Career + career.id + '/view');
        onClose();
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setName(value);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={"Create New Career"}/>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    );
}