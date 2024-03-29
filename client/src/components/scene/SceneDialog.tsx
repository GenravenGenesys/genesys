import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Path} from "../../services/Path";
import {Button, Dialog, DialogActions, DialogContentText, DialogTitle, TextField} from "@mui/material";
import SceneService from "../../services/SceneService";

interface Props {
    open: boolean
    onClose: () => void
}
export default function SceneDialog(props: Props): JSX.Element {
    const {open,onClose} = props
    const [name,setName] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let scene = await SceneService.createScene(name)
        navigate(Path.Scene + scene?.id!!  + '/edit')
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Name New Scene</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={handleCreate}>CREATE</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}