import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Fragment, useEffect, useState} from 'react';
import * as React from 'react';
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import ActionsTableCell from "../common/table/actions/ActionsTableCell";
import {RootPath} from "../../services/RootPath";
import Quality from "../../models/Quality";
import GenesysQualityTypography from "../common/typography/GenesysQualityTypography";
import QualityService from "../../services/QualityService";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import {renderUsable} from "../../models/equipment/EquipmentHelper";
import QualityDialog from "./CreateQualityDialog";

export default function ViewAllQualities() {
    const [qualities, setQualities] = useState<Quality[]>([])
    const [openQualityCreationDialog, setOpenQualityCreationDialog] = useState(false)
    const headers = ['Name', 'Activation', 'Usable On', 'View']
    const [open, setOpen] = useState(false)

    useEffect(() => {
        (async (): Promise<void> => {
            setQualities(await QualityService.getQualities())
        })()
    }, [])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Qualities'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenQualityCreationDialog(true)}>Create Quality</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {qualities.map((quality: Quality) => (
                                <Fragment>
                                    <TableRow onClick={() => setOpen(!open)}>
                                        <TypographyCenterTableCell value={quality.name}/>
                                        <TableCell style={{textAlign: 'center'}}>
                                            {quality.cost === 0 ? <GenesysDescriptionTypography text={'Passive'}/> :
                                                <GenesysQualityTypography ranks={quality.cost}/>}
                                        </TableCell>
                                        <TypographyCenterTableCell value={renderUsable(quality)}/>
                                        <ActionsTableCell name={quality.id} path={RootPath.Qualities}/>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell  style={{paddingBottom: 0, paddingTop: 0}} colSpan={headers.length}>
                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                                <Table sx={{margin: 1}}>
                                                    <TableBody>
                                                        <GenesysDescriptionTypography text={quality.description}/>
                                                    </TableBody>
                                                </Table>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openQualityCreationDialog && <QualityDialog open={openQualityCreationDialog}
                                                         onClose={(): void => setOpenQualityCreationDialog(false)}/>}
        </Card>
    );
}
