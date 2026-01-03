import {type ChangeEvent, useState} from "react";
import {useNavigate} from "react-router";
import {EquipmentPath} from "../../../services/RootPath";
import {Dialog, DialogContentText, TextField,} from "@mui/material";
import GearService from "../../../services/equipment/GearService";
import GenesysDialogActions from "../../common/dialog/GenesysDialogActions";
import {getArmorController} from "../../../api/generated/armor-controller/armor-controller.ts";
import {getWeaponController} from "../../../api/generated/weapon-controller/weapon-controller.ts";
import {EquipmentType} from "../../../api/model";
import CenteredDialogTitle from "../../common/dialog/CenteredDialogTitle.tsx";

interface Props {
    open: boolean;
    onClose: () => void;
    type: EquipmentType;
}

export default function CreateEquipmentDialog(props: Props) {
    const { open, onClose, type } = props;
    const [ name, setName ] = useState('');
    const navigate = useNavigate();

    const handleCreate = async (): Promise<void> => {
        switch (type) {
            case EquipmentType.Armor:
                const armor = await getArmorController().createArmor(name);
                navigate(EquipmentPath.Armor + armor.id + '/view');
                break;
            case EquipmentType.Weapon:
                const weapon = await getWeaponController().createWeapon(name);
                navigate(EquipmentPath.Weapon + weapon.id + '/view');
                break;
            case EquipmentType.Gear:
                const gear = await GearService.createGear(name)
                navigate(EquipmentPath.Gear + gear.id + '/view');
                break;
        }
        onClose();
    };

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setName(value);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={'Create ' + type}/>
            <DialogContentText>
                <TextField onChange={onNameChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    );
}