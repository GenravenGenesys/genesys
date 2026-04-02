import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import SessionSceneSelectionTable from "./SessionSceneSelectionTable";
import React from "react";
import CenteredDialogTitle from "../../common/dialog/CenteredDialogTitle";
import CampaignSession from "../../../models/campaign/CampaignSession";

interface Props {
    session: CampaignSession;
    open: boolean;
    onClose: () => void;
}

const SessionSceneSelectionDialog: React.FC<Props> = ({session, open, onClose}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={'Add Scene to Session'}/>
            <DialogContent>
                <SessionSceneSelectionTable session={session}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SessionSceneSelectionDialog;