import {MenuItem, Select, TableCell} from "@mui/material";
import {useLocation} from "react-router";
import {type ActorArmor, ActorArmorSlot, type ActorWeapon, ActorWeaponSlot} from "../../../api/model";

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
                onChange={(e) => onChange({...armor, slot: e.target.value as ActorArmorSlot})}
                disabled={!useLocation().pathname.endsWith('/edit')}
                fullWidth
                label={'Armor Slot'}
                variant={'standard'}>
                <MenuItem key={ActorArmorSlot.None} value={ActorArmorSlot.None}>
                    {ActorArmorSlot.None}
                </MenuItem>
                <MenuItem key={ActorArmorSlot.Body} value={ActorArmorSlot.Body}>
                    {ActorArmorSlot.Body}
                </MenuItem>
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
                    onChange={(e) => onChange({...weapon, slot: e.target.value as ActorWeaponSlot})}
                    disabled={!pathname.endsWith('/edit')}
                    fullWidth
                    label={'Weapon Slot'}
                    variant={'standard'}>
                    <MenuItem key={ActorWeaponSlot.None} value={ActorWeaponSlot.None}>
                        {ActorWeaponSlot.None}
                    </MenuItem>
                    <MenuItem key={ActorWeaponSlot.Both} value={ActorWeaponSlot.Both}>
                        {ActorWeaponSlot.Both}
                    </MenuItem>
                </Select>
            )
        } else {
            return (
                <Select
                    value={weapon.slot}
                    onChange={(e) => onChange({...weapon, slot: e.target.value as ActorWeaponSlot})}
                    disabled={!pathname.endsWith('/edit')}
                    fullWidth
                    label={'Weapon Slot'}
                    variant={'standard'}>
                    <MenuItem key={ActorWeaponSlot.None} value={ActorWeaponSlot.None}>
                        {ActorWeaponSlot.None}
                    </MenuItem>
                    <MenuItem key={ActorWeaponSlot.Main} value={ActorWeaponSlot.Main}>
                        {ActorWeaponSlot.Main}
                    </MenuItem>
                    <MenuItem key={ActorWeaponSlot.Off} value={ActorWeaponSlot.Off}>
                        {ActorWeaponSlot.Off}
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