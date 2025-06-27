import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {Fragment, useState} from "react";
import {
    GenesysDicePoolCenterTableCellButton,
    TypographyCenterTableCell,
    TypographyLeftTableCell
} from "../../../../common/table/TypographyTableCell";
import {renderQualities} from "../../../../../models/equipment/EquipmentHelper";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import {Button, TableFooter} from "@mui/material";
import {useLocation} from "react-router";
import {ActorWeapon, Weapon, WeaponSlot} from "../../../../../models/equipment/Weapon";
import Actor from "../../../../../models/actor/Actor";
import CreateWeaponDialog from "./CreateWeaponDialog";
import WeaponSelectionDialog from "./WeaponSelectionDialog";
import WeaponEquipDialog from "./WeaponEquipDialog";
import {getActorSkill} from "../../../../common/skill/SkillRenders";
import NonPlayerActor from "../../../../../models/actor/npc/NonPlayerActor";

interface Props {
    actor: Actor
    updateWeapons: (weapons: ActorWeapon[]) => void
}

export default function WeaponTable(props: Props) {
    const {actor, updateWeapons} = props;
    const weapons = actor.weapons;
    const headers = ['Name', 'Equipped Slot', 'Skill', 'Damage', 'Critical', 'Range', 'Special Qualities', 'Dice Pool'];
    const [openCreateWeaponDialog, setOpenCreateWeaponDialog] = useState(false);
    const [openSelectWeaponDialog, setOpenSelectWeaponDialog] = useState(false);
    const [openEquipWeaponDialog, setOpenEquipWeaponDialog] = useState(false);
    const pathname = useLocation().pathname;

    const renderTableBody = () => {
        if (!weapons) {
            return <Fragment/>
        } else {
            return (
                <TableBody>
                    {weapons.map((weapon: ActorWeapon) => (
                        <TableRow key={weapon.id}>
                            <TypographyLeftTableCell value={weapon.name}/>
                            <TypographyCenterTableCell value={weapon.slot}/>
                            <TypographyCenterTableCell value={weapon.skill.name || ''}/>
                            <TypographyCenterTableCell
                                value={weapon.brawn ? String(actor.brawn.current + weapon.damage) : String(weapon.damage)}/>
                            <TypographyCenterTableCell value={String(weapon.critical)}/>
                            <TypographyCenterTableCell value={weapon.range}/>
                            <TypographyCenterTableCell value={renderQualities(weapon)}/>
                            <GenesysDicePoolCenterTableCellButton actor={actor}
                                                                  skill={getActorSkill(actor as NonPlayerActor, weapon.skill)}/>
                        </TableRow>
                    ))}
                </TableBody>
            )
        }
    }

    const createWeapon = async (weapon: ActorWeapon) => {
        updateWeapons([...weapons, weapon]);
    };

    const addWeapon = async (weapon: Weapon) => {
        updateWeapons([...weapons, {
            slot: WeaponSlot.None,
            ...weapon
        }]);
    };

    const equipWeapon = async (updatedWeapons: ActorWeapon[]) => {
        updateWeapons(updatedWeapons);
    }

    const renderTableFooter = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <TableFooter>
                    <TableRow key={'Footer'}>
                        <Button color='primary' variant='contained'
                                onClick={(): void => setOpenCreateWeaponDialog(true)}>Create
                            Weapon</Button>
                        {openCreateWeaponDialog && <CreateWeaponDialog open={openCreateWeaponDialog}
                                                                       onClose={(): void => setOpenCreateWeaponDialog(false)}
                                                                       onCreateWeapon={createWeapon}/>}
                        <Button color='primary' variant='contained'
                                onClick={(): void => setOpenSelectWeaponDialog(true)}>Add
                            Weapon</Button>
                        {openSelectWeaponDialog && <WeaponSelectionDialog open={openSelectWeaponDialog}
                                                                          onClose={(): void => setOpenSelectWeaponDialog(false)}
                                                                          addWeapon={addWeapon}/>}
                        <Button color='primary' variant='contained'
                                onClick={(): void => setOpenEquipWeaponDialog(true)}>Equip
                            Weapon</Button>
                        {openEquipWeaponDialog && <WeaponEquipDialog open={openEquipWeaponDialog}
                                                                     onClose={(): void => setOpenEquipWeaponDialog(false)}
                                                                     updateWeapons={equipWeapon} weapons={weapons}/>}
                    </TableRow>
                </TableFooter>
            )
        } else {
            return <Fragment/>
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                {renderTableBody()}
                {renderTableFooter()}
            </Table>
        </TableContainer>
    )
}