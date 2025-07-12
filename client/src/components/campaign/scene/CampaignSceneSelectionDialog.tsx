import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import SessionSceneSelectionTable from "../session/SessionSceneSelectionTable";
import React from "react";
import CenteredDialogTitle from "../../common/dialog/CenteredDialogTitle";
import CampaignSession from "../../../models/campaign/CampaignSession";
import CampaignSceneSelectionTable from "./CampaignSceneSelectionTable";

interface Props {
    open: boolean;
    onClose: () => void;
}

const CampaignSceneSelectionDialog: React.FC<Props> = ({open, onClose}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={'Add Scene to Campaign'}/>
            <DialogContent>
                <CampaignSceneSelectionTable/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CampaignSceneSelectionDialog;