import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import ActionsTableCell from "../../common/table/actions/ActionsTableCell";
import {LorePath} from "../../../services/RootPath";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import {useFetchAllLore} from "../../../hooks/useFetchAllLore.ts";
import {type Lore, LoreType} from "../../../api/model";

interface RowProps {
    lore: Lore
}

function LoreRow(props: RowProps) {
    const {lore} = props

    const getLorePath = () => {
        switch (lore.type) {
            case LoreType.Organization:
                return LorePath.Organization;
            default:
                return '';
        }
    }

    return (
        <TableRow>
            <TypographyCenterTableCell value={lore.name}/>
            <TypographyCenterTableCell value={lore.type}/>
            <ActionsTableCell name={lore.name} path={getLorePath()}/>
        </TableRow>
    )
}

export function ViewAllLore() {
    const headers = ['Name', 'Type', 'View'];
    const {lore, loading, error} = useFetchAllLore();

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

    return (
        <Card>
            <CenteredCardHeader title={'View All Lore'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {lore.map((lore: Lore) => (
                                <LoreRow lore={lore}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}
