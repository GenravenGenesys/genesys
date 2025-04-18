import { Button, DialogActions } from "@mui/material";
import * as React from "react";

interface Props {
    handleCreate: () => void;
    onClose: () => void;
}

const GenesysDialogActions: React.FC<Props> = ({ handleCreate, onClose }) => {
    return (
        <DialogActions>
            <Button color='primary' variant='contained' onClick={handleCreate}>CREATE</Button>
            <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
        </DialogActions>
    );
};

export default GenesysDialogActions;
