import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import * as React from "react";
import {Button, Card, CardContent, TableFooter} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import {Fragment, useState} from "react";
import {useLocation} from "react-router";
import CreateAbilityDialog from "./CreateAbilityDialog";
import Ability from "../../../../models/Ability";
import TableBody from "@mui/material/TableBody";
import {
    GenesysDescriptionTypographyCenterTableCell, TypographyCenterTableCell,
    TypographyLeftTableCell
} from "../../../common/table/TypographyTableCell";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";

interface Props {
    abilities: Ability[]
    updateAbilities: (abilities: Ability[]) => void
}

export default function AbilityTableCard(props: Props) {
    const {abilities, updateAbilities} = props;
    const [openCreateAbilityDialog, setOpenCreateAbilityDialog] = useState(false);
    const pathname = useLocation().pathname;
    const headers = ['Name', 'Activation', 'Summary'];

    const createAbility = (ability: Ability) => {
        updateAbilities([...abilities, ability]);
    }

    const renderTableBody = () => {
        return (
            <TableBody>
                {(abilities).map((ability: Ability) => (
                    <TableRow key={ability.name}>
                        <TypographyLeftTableCell value={ability.name}/>
                        <TypographyCenterTableCell value={ability.activation}/>
                        <GenesysDescriptionTypographyCenterTableCell value={ability.description}/>
                    </TableRow>
                ))}
            </TableBody>
        )
    }

    const renderTableFooter = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <TableFooter>
                    <TableRow key={'Footer'}>
                        <Button color='primary' variant='contained'
                                onClick={(): void => setOpenCreateAbilityDialog(true)}>Create
                            Ability</Button>
                        {openCreateAbilityDialog &&
                            <CreateAbilityDialog open={openCreateAbilityDialog}
                                                 onClose={(): void => setOpenCreateAbilityDialog(false)}
                                                 onCreateAbility={createAbility}/>}
                    </TableRow>
                </TableFooter>
            )
        } else {
            return <Fragment/>
        }
    }

    return (
        <Card sx={{width: 1}}>
            <CenteredCardHeader title={'Abilities'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        {renderTableBody()}
                        {renderTableFooter()}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}