import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import {
    GenesysDicePoolCenterTableCellButton,
    TypographyCenterTableCell
} from "../../../../../common/table/TypographyTableCell";
import {renderActorDamage, renderQualities} from "../../../../../../util/EquipmentHelper.ts";
import type Player from "../../../../../../models/actor/player/Player";
import {Fragment} from "react";
import {type ActorWeapon, ActorWeaponSlot, type PlayerSkill} from "../../../../../../api/model";


interface Props {
    weapons: ActorWeapon[];
    player: Player;
}

const PlayerWeaponTable: React.FC<Props> = (props: Props)=> {
    const {weapons, player} = props
    const headers = ['Name', 'Equipped', 'Skill', 'Damage', 'Critical', 'Range', 'Special Qualities', 'Dice Pool']

    const renderEquipped = (weapon: ActorWeapon): string => {
        return weapon.slot !== ActorWeaponSlot.None ? 'True' : 'False';
    }

    const getPlayerSkill = (weapon: ActorWeapon): PlayerSkill => {
        let actorSkill = {} as PlayerSkill;
        for (const skill of player.skills) {
            if (skill.name === weapon.skill.name) {
                actorSkill = skill as PlayerSkill;
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
                            <GenesysDicePoolCenterTableCellButton actor={player} skill={getPlayerSkill(weapon)}/>
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