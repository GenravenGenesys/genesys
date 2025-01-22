import {Dialog} from "@mui/material";
import CenteredDialogTitle from "../../../common/dialog/CenteredDialogTitle";

interface Props {
    open: boolean
    onClose: () => void
}

export default function AddEncounterDialog(props: Props) {
    const {open, onClose} = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={'Add Encounter'}/>

        </Dialog>
    )
}