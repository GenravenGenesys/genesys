import {MenuItem, Select, TableCell} from "@mui/material";
import React from "react";
import {ActorArmor, ArmorSlot} from "../../../models/equipment/Armor";
import {useLocation} from "react-router";
import {ActorWeapon, WeaponSlot} from "../../../models/equipment/Weapon";

interface ArmorProps {
    armor: ActorArmor
    onChange: (armor: ActorArmor) => void
}

export function ArmorSlotTableCell(props: ArmorProps) {
    const {armor, onChange} = props;

    return (
        <TableCell style={{textAlign: 'center'}}>
            <Select
                value={armor.slot}
                onChange={(e) => onChange({...armor, slot: e.target.value as ArmorSlot})}
                disabled={!useLocation().pathname.endsWith('/edit')}
                fullWidth
                label={'Armor Slot'}
                variant={'standard'}>
                {Object.values(ArmorSlot).map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </TableCell>
    )
}

interface WeaponProps {
    weapon: ActorWeapon
    onChange: (weapon: ActorWeapon) => void
}

export function WeaponSlotTableCell(props: WeaponProps) {
    const {weapon, onChange} = props;
    const pathname = useLocation().pathname

    const renderWeaponSlotSelect = () => {
        if (weapon.hands === 2) {
            return (
                <Select
                    value={weapon.slot}
                    onChange={(e) => onChange({...weapon, slot: e.target.value as WeaponSlot})}
                    disabled={!pathname.endsWith('/edit')}
                    fullWidth
                    label={'Weapon Slot'}
                    variant={'standard'}>
                    <MenuItem key={WeaponSlot.None} value={WeaponSlot.None}>
                        {WeaponSlot.None}
                    </MenuItem>
                    <MenuItem key={WeaponSlot.Both} value={WeaponSlot.Both}>
                        {WeaponSlot.Both}
                    </MenuItem>
                </Select>
            )
        } else {
            return (
                <Select
                    value={weapon.slot}
                    onChange={(e) => onChange({...weapon, slot: e.target.value as WeaponSlot})}
                    disabled={!pathname.endsWith('/edit')}
                    fullWidth
                    label={'Weapon Slot'}
                    variant={'standard'}>
                    <MenuItem key={WeaponSlot.None} value={WeaponSlot.None}>
                        {WeaponSlot.None}
                    </MenuItem>
                    <MenuItem key={WeaponSlot.Main} value={WeaponSlot.Main}>
                        {WeaponSlot.Main}
                    </MenuItem>
                    <MenuItem key={WeaponSlot.Off} value={WeaponSlot.Off}>
                        {WeaponSlot.Off}
                    </MenuItem>
                </Select>
            )
        }
    }

    return (
        <TableCell style={{textAlign: 'center'}}>
            {renderWeaponSlotSelect()}
        </TableCell>
    )
}