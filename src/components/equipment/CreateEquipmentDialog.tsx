import {EquipmentType} from "../../models/equipment/Equipment";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {EquipmentPath} from "../../services/RootPath";
import {Dialog, DialogContentText, DialogTitle, Divider, TextField,} from "@mui/material";
import EquipmentService from "../../services/EquipmentService";
import {GenesysDialogActions} from "../common/dialog/GenesysDialogActions";

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
        let path = ''
        switch (type) {
            case EquipmentType.Armor:
                let armor = await EquipmentService.createArmor(name)
                navigate(EquipmentPath.Armor + armor.armor_id + '/view')
                break
            case EquipmentType.Weapon:
                await EquipmentService.createWeapon(name)
                path = EquipmentPath.Weapon
                navigate(path + name + '/view')
                break
            case EquipmentType.Gear:
                await EquipmentService.createGear(name)
                path = EquipmentPath.Gear
                navigate(path + name + '/view')
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
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}