import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Fragment, useEffect, useState} from 'react';
import {type Gear} from "../../../../models/equipment/Gear";
import {renderPrice} from "../../../../models/equipment/EquipmentHelper";
import ActionsTableCell from "../../../common/table/actions/ActionsTableCell";
import {EquipmentPath} from "../../../../services/RootPath";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import GearService from "../../../../services/equipment/GearService";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import CreateEquipmentDialog from "../CreateEquipmentDialog";
import {EquipmentType} from "../../../../models/equipment/Equipment";


interface Props {
    gear: Gear
}

function Row(props: Props) {
    const {gear} = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}} onClick={() => setOpen(!open)}>
                <TableCell component="th" scope="row">{gear.name}</TableCell>
                <TableCell>{gear.encumbrance}</TableCell>
                <TableCell>{renderPrice(gear)}</TableCell>
                <TableCell>{gear.rarity}</TableCell>
                <ActionsTableCell name={gear.id} path={EquipmentPath.Gear}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table size="small">
                                <TableBody>
                                    <GenesysDescriptionTypography text={gear.description}/>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function CampaignGear() {
    const [gears, setGears] = useState<Gear[]>([]);
    const [openEquipmentCreationDialog, setOpenEquipmentCreationDialog] = useState(false);
    const headers = ['Name', 'Encumbrance', 'Price', 'Rarity', 'View'];

    useEffect(() => {
        (async (): Promise<void> => {
            setGears(await GearService.getGears());
        })()
    }, []);

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Campaign Gear'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenEquipmentCreationDialog(true)}>Create Gear</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {gears.map((gear: Gear) => (
                                <Row key={gear.name} gear={gear}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openEquipmentCreationDialog && <CreateEquipmentDialog open={openEquipmentCreationDialog}
                                                                   onClose={(): void => setOpenEquipmentCreationDialog(false)}
                                                                   type={EquipmentType.Gear}/>}
        </Card>
    );
}
