import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import type {ActorWeapon} from "../../../../../../models/equipment/Weapon";
import {WeaponSlot} from "../../../../../../models/equipment/Weapon";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import {
    GenesysDicePoolCenterTableCellButton,
    TypographyCenterTableCell
} from "../../../../../common/table/TypographyTableCell";
import {renderActorDamage, renderQualities} from "../../../../../../models/equipment/EquipmentHelper";
import type Player from "../../../../../../models/actor/player/Player";
import type {ActorSkill} from "../../../../../../models/actor/Actor";
import {Fragment} from "react";


interface Props {
    weapons: ActorWeapon[];
    player: Player;
}

const PlayerWeaponTable: React.FC<Props> = (props: Props)=> {
    const {weapons, player} = props
    const headers = ['Name', 'Equipped', 'Skill', 'Damage', 'Critical', 'Range', 'Special Qualities', 'Dice Pool']

    const renderEquipped = (weapon: ActorWeapon): string => {
        return weapon.slot !== WeaponSlot.None ? 'True' : 'False';
    }

    const getActorSkill = (weapon: ActorWeapon): ActorSkill => {
        let actorSkill = {} as ActorSkill;
        for (const skill of player.skills) {
            if (skill.name === weapon.skill.name) {
                actorSkill = skill as ActorSkill;
            }
        }
        return actorSkill;
    };

    const renderTableBody = () => {
        if (!weapons) {
            return <Fragment/>
        } else {
            return (
                <TableBody>
                    {weapons.map((weapon: ActorWeapon) => (
                        <TableRow key={weapon.id}>
                            <TypographyCenterTableCell value={weapon.name}/>
                            <TypographyCenterTableCell value={renderEquipped(weapon)}/>
                            <TypographyCenterTableCell value={weapon.skill.name}/>
                            <TypographyCenterTableCell value={renderActorDamage(weapon, player.brawn.current)}/>
                            <TypographyCenterTableCell value={String(weapon.critical)}/>
                            <TypographyCenterTableCell value={weapon.range}/>
                            <TypographyCenterTableCell value={renderQualities(weapon)}/>
                            <GenesysDicePoolCenterTableCellButton actor={player} skill={getActorSkill(weapon)}/>
                        </TableRow>))}
                </TableBody>
            )
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                {renderTableBody()}
            </Table>
        </TableContainer>
    );
};

export default PlayerWeaponTable;