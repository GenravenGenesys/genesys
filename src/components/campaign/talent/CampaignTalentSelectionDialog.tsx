import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Campaign from "../../../models/campaign/Campaign";
import CampaignTalentSelectionTable from "./CampaignTalentSelectionTable";

interface Props {
    campaign: Campaign
    open: boolean
    onClose: () => void
}

export default function CampaignTalentSelectionDialog(props: Props) {
    const {campaign, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Talent'}/>
            <DialogContent>
                <CampaignTalentSelectionTable campaign={campaign}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}