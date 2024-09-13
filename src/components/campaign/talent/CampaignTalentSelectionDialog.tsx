import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CampaignTalentSelectionTable from "./CampaignTalentSelectionTable";

interface Props {
    campaign_id: string
    open: boolean
    onClose: () => void
}

export default function CampaignTalentSelectionDialog(props: Props) {
    const {campaign_id, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Talent'}/>
            <DialogContent>
                <CampaignTalentSelectionTable campaign_id={campaign_id}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}