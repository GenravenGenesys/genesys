import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import CampaignSceneSelectionTable from "./CampaignSceneSelectionTable";
import React from "react";
import CenteredDialogTitle from "../../common/dialog/CenteredDialogTitle";

interface Props {
    open: boolean;
    onClose: () => void;
}

const CampaignSceneSelectionDialog: React.FC<Props> = ({open, onClose}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={'Add Scene'}/>
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