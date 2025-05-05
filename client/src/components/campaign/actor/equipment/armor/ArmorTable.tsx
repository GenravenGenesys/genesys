import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {Fragment, useState} from "react";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "../../../../common/table/TypographyTableCell";
import {renderQualities, renderSoak} from "../../../../../models/equipment/EquipmentHelper";
import {ActorArmor, Armor, ArmorSlot} from "../../../../../models/equipment/Armor";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import {Button, TableFooter} from "@mui/material";
import {useLocation} from "react-router";
import ArmorSelectionDialog from "./ArmorSelectionDialog";
import ArmorEquipDialog from "./ArmorEquipDialog";
import BooleanTableCell from "../../../../common/table/BooleanTableCell";
import CreateArmorDialog from "./CreateArmorDialog";

interface Props {
    armors: ActorArmor[]
    updateArmors: (armors: ActorArmor[]) => void
}

export default function ArmorTable(props: Props) {
    const {armors, updateArmors} = props;
    const headers = ['Name', 'Equipped', 'Defense', 'Soak', 'Special Qualities'];
    const [openCreateArmorDialog, setOpenCreateArmorDialog] = useState(false);
    const [openSelectArmorDialog, setOpenSelectArmorDialog] = useState(false);
    const [openEquipArmorDialog, setOpenEquipArmorDialog] = useState(false);
    const pathname = useLocation().pathname;

    const renderTableBody = () => {
        if (!armors) {
            return <Fragment/>
        } else {
            return (
                <TableBody>
                    {armors.map((armor: ActorArmor) => (
                        <TableRow key={armor.id}>
                            <TypographyLeftTableCell value={armor.name}/>
                            <BooleanTableCell bool={armor.slot === ArmorSlot.Body}/>
                            <TypographyCenterTableCell value={String(armor.defense)}/>
                            <TypographyCenterTableCell value={renderSoak(armor)}/>
                            <TypographyCenterTableCell value={renderQualities(armor)}/>
                        </TableRow>
                    ))}
                </TableBody>
            )
        }
    }

    const createArmor = async (armor: ActorArmor) => {
        updateArmors([...armors, armor]);
    };

    const addArmor = async (armor: Armor) => {
        updateArmors([...armors, {
            slot: ArmorSlot.None,
            ...armor
        }]);
    };

    const equipArmor = async (updatedArmors: ActorArmor[]) => {
        updateArmors(updatedArmors);
    }

    const renderTableFooter = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <TableFooter>
                    <TableRow key={'Footer'}>
                        <Button color='primary' variant='contained'
                                onClick={(): void => setOpenCreateArmorDialog(true)}>Create
                            Armor</Button>
                        {openCreateArmorDialog && <CreateArmorDialog open={openCreateArmorDialog}
                                                                     onClose={(): void => setOpenCreateArmorDialog(false)}
                                                                     onCreateArmor={createArmor}/>}
                        <Button color='primary' variant='contained'
                                onClick={(): void => setOpenSelectArmorDialog(true)}>Add
                            Armor</Button>
                        {openSelectArmorDialog && <ArmorSelectionDialog open={openSelectArmorDialog}
                                                                        onClose={(): void => setOpenSelectArmorDialog(false)}
                                                                        addArmor={addArmor}/>}
                        <Button color='primary' variant='contained' onClick={(): void => setOpenEquipArmorDialog(true)}>Equip
                            Armor</Button>
                        {openEquipArmorDialog && <ArmorEquipDialog open={openEquipArmorDialog}
                                                                   onClose={(): void => setOpenEquipArmorDialog(false)}
                                                                   updateArmors={equipArmor} armors={armors}/>}
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