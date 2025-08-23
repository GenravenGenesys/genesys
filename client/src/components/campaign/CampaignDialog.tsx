import {type ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {CampaignPath} from "../../services/RootPath";
import GenesysDialogActions from "../common/dialog/GenesysDialogActions";
import CampaignService from "../../services/CampaignService";
import type Campaign from "../../models/campaign/Campaign";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CampaignDialog(props: Props) {
    const {open, onClose} = props
    const [name, setName] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let campaign = {name: name, current: true} as Campaign
        await CampaignService.createCampaign(campaign)
        navigate(CampaignPath.Campaign + campaign.name)
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Name New Campaign</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}