import {Dialog, DialogContentText, TextField} from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router";
import TalentService from "../../services/TalentService";
import GenesysDialogActions from "../common/dialog/GenesysDialogActions";
import {RootPath} from "../../services/RootPath";
import CenteredDialogTitle from "../common/dialog/CenteredDialogTitle";

type Props = {
    open: boolean;
    onClose: () => void;
};

const TalentDialog: React.FC<Props> = ({open, onClose}) => {
    const [name, setName] = useState('');
    let navigate = useNavigate();

    const handleCreate = async () => {
        let talent = await TalentService.createTalent(name);
        navigate(RootPath.Talent + talent.id + '/edit');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={'Name New Talent'}/>
            <DialogContentText>
                <TextField onChange={(event) => setName(event.target.value)} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    );
};

export default TalentDialog;
