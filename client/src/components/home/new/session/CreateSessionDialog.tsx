import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import {useState} from "react";
import GenesysTextField from "../../../common/field/GenesysTextField.tsx";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    onCreate: (name: string) => void;
}

export default function CreateSessionDialog(props: Props) {
    const {open, setOpen, onCreate} = props;
    const [name, setName] = useState("");

    return (
        <Dialog open={open} onClose={() => setOpen(false)}
                slotProps={{paper: {sx: {bgcolor: '#1a1a1a', color: 'white'}}}}
        >
            <DialogTitle>Plan New Session</DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{mt: 1, minWidth: 400}}>
                    <GenesysTextField text={name} label={"Session Title"} onChange={setName} fullwidth/>
                </Stack>
            </DialogContent>
            <DialogActions sx={{p: 3}}>
                <Button onClick={() => setOpen(false)} sx={{color: 'gray'}}>Cancel</Button>
                <Button variant="contained" onClick={() => onCreate}>Save Plan</Button>
            </DialogActions>
        </Dialog>
    )
}