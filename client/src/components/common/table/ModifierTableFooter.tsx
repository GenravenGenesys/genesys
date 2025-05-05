import {Button, TableFooter} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import {Fragment} from "react";
import * as React from "react";
import {useLocation} from "react-router";

interface Props {
    id: string
    addRow: () => void
}

export default function ModifierTableFooter(props: Props) {
    const {id, addRow} = props;
    const pathname = useLocation().pathname;

    const renderTableFooter = () => {
        if (pathname.endsWith(id + '/edit')) {
            return (
                <TableFooter>
                    <TableRow key={'Footer'}>
                        <Button variant='contained' color='primary' onClick={addRow} startIcon={<AddIcon/>}>Add
                            Modifier</Button>
                    </TableRow>
                </TableFooter>
            )
        } else {
            return <Fragment/>
        }
    }

    return (
        <Fragment>
            {renderTableFooter()}
        </Fragment>
    )
}