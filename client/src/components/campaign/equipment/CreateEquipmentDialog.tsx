import {EquipmentType} from "../../../models/equipment/Equipment";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router";
import {EquipmentPath} from "../../../services/RootPath";
import {Dialog, DialogContentText, DialogTitle, TextField,} from "@mui/material";
import EquipmentService from "../../../services/equipment/EquipmentService";
import GenesysDialogActions from "../../common/dialog/GenesysDialogActions";
import ArmorService from "../../../services/equipment/ArmorService";
import WeaponService from "../../../services/equipment/WeaponService";

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
                let armor = await ArmorService.createArmor(name);
                navigate(EquipmentPath.Armor + armor.id + '/view');
                break;
            case EquipmentType.Weapon:
                let weapon = await WeaponService.createWeapon(name)
                navigate(EquipmentPath.Weapon + weapon.id + '/view');
                break;
            case EquipmentType.Gear:
                let gear = await EquipmentService.createGear(name)
                navigate(EquipmentPath.Gear + gear.id + '/view');
                break;
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
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}