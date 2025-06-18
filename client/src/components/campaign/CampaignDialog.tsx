import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router";
import {Dialog, DialogContentText, TextField} from "@mui/material";
import {CampaignPath} from "../../services/RootPath";
import GenesysDialogActions from "../common/dialog/GenesysDialogActions";
import CampaignService from "../../services/CampaignService";
import Campaign from "../../models/campaign/Campaign";
import CenteredDialogTitle from "../common/dialog/CenteredDialogTitle";

type Props ={
    open: boolean;
    onClose: () => void;
};

const CampaignDialog =(props: Props) => {
    const {open, onClose} = props;
    const [name, setName] = useState('');
    let navigate = useNavigate();

    const handleCreate = async (): Promise<void> => {
        let campaign = {name: name, current: true} as Campaign;
        await CampaignService.createCampaign(campaign);
        navigate(CampaignPath.Campaign + campaign.name);
        onClose();
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        setName(value);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title="Name New Campaign"/>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    );
};

export default CampaignDialog;