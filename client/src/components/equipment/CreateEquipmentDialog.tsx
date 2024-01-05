import {EquipmentType} from "../../models/equipment/Equipment";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {EquipmentPath} from "../../services/Path";
import {Button, Dialog, DialogActions, DialogContentText, DialogTitle, Divider, TextField,} from "@mui/material";
import EquipmentService from "../../services/EquipmentService";

interface Props {
    open: boolean;
    onClose: () => void;
    type: EquipmentType
}

export default function CreateEquipmentDialog(props: Props) {
    const { open, onClose, type } = props
    const [ name, setName ] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        switch (type) {
            case EquipmentType.Armor:
                let armor = await EquipmentService.createArmor(name)
                navigate(EquipmentPath.Armor + armor?.id!! + '/view')
                break
            case EquipmentType.Weapon:
                let weapon = await EquipmentService.createWeapon(name)
                navigate(EquipmentPath.Weapon + weapon?.id!! + '/view')
                break
            case EquipmentType.Gear:
                let gear = await EquipmentService.createGear(name)
                navigate(EquipmentPath.Gear + gear?.id!! + '/view')
                break
        }
        onClose()
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value)
    }

    function getTitle():string {
        return 'Create ' + type
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogContentText>
                <TextField onChange={onNameChange} value={name} required/>
                <Divider />
            </DialogContentText>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={handleCreate}>CREATE</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}