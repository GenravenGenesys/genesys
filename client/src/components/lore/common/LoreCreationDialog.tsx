import {LoreType} from "../../../models/lore/Lore";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router";
import {LorePath} from "../../../services/RootPath";
import {Dialog, DialogContentText, TextField} from "@mui/material";
import GenesysDialogActions from "../../common/dialog/GenesysDialogActions";
import OrganizationService from "../../../services/lore/OrganizationService";
import CenteredDialogTitle from "../../common/dialog/CenteredDialogTitle";


interface Props {
    open: boolean
    onClose: () => void
    lore: LoreType
    path: LorePath
}

export default function LoreCreationDialog(props: Props) {
    const {open, onClose, lore, path} = props;
    const [name, setName] = useState('');
    let navigate = useNavigate();

    const handleCreate = async (): Promise<void> => {
        switch (lore) {
            case LoreType.ORGANIZATION:
                let organization = await OrganizationService.createOrganization(name);
                navigate(path + organization.id + '/view');
        }
        onClose();
    };

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        setName(value);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={'Create ' + lore}/>
            <DialogContentText>
                <TextField onChange={onNameChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions onClose={onClose} handleCreate={handleCreate}/>
        </Dialog>
    );
}