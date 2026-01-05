import {Dialog, DialogActions, type SelectChangeEvent} from "@mui/material";
import {useState} from "react";
import CampaignSelection from "./CampaignSelection";
import CenteredDialogTitle from "../../common/dialog/CenteredDialogTitle.tsx";
import {
    getCurrentCampaignController
} from "../../../api/generated/current-campaign-controller/current-campaign-controller.ts";
import type {Campaign} from "../../../api/model";

interface Props {
    open: boolean;
    onClose: () => void;
    current: Campaign;
}

export default function CampaignSelectionDialog(props: Props) {
    const {open, onClose, current} = props;
    const [campaign, setCampaign] = useState<Campaign>(current);

    const onChange = async (event: SelectChangeEvent) => {
        setCampaign(await getCurrentCampaignController().setCurrentCampaign(event.target.value));
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={'Current: ' + campaign.name}/>
            <DialogActions>
                <CampaignSelection onChange={onChange}/>
            </DialogActions>
        </Dialog>
    )
}