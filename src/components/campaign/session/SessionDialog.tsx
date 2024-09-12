import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CampaignPath} from "../../../services/RootPath";
import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import CampaignService from "../../../services/CampaignService";
import {GenesysDialogActions} from "../../common/dialog/GenesysDialogActions";

interface Props {
    open: boolean
    onClose: () => void
    campaignName: string
}
export default function SessionDialog(props: Props) {
    const {open,onClose,campaignName} = props
    const [sessionName,setSessionName] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let session = await CampaignService.createSession(campaignName,sessionName)
        navigate(CampaignPath.Campaign + campaignName + CampaignPath.Session + session.name  + '/edit')
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setSessionName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Session</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={sessionName} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}