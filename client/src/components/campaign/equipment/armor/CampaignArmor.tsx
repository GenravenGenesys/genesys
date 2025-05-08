import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import {Fragment, useEffect, useState} from 'react';
import {Armor} from "../../../../models/equipment/Armor";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import ActionsTableCell from "../../../common/table/actions/ActionsTableCell";
import {EquipmentPath} from "../../../../services/RootPath";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import {renderSingleRowTableHeader} from '../../../common/table/TableRenders';
import {renderPrice, renderSoak} from '../../../../models/equipment/EquipmentHelper';
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import CreateEquipmentDialog from "../CreateEquipmentDialog";
import {EquipmentType} from "../../../../models/equipment/Equipment";
import ArmorService from "../../../../services/equipment/ArmorService";

interface Props {
    armor: Armor
    columns: number
}

function Row(props: Props) {
    const {armor, columns} = props
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}} onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={armor.name}/>
                <TypographyCenterTableCell value={String(armor.defense)}/>
                <TypographyCenterTableCell value={renderSoak(armor)}/>
                <TypographyCenterTableCell value={String(armor.encumbrance)}/>
                <TypographyCenterTableCell value={renderPrice(armor)}/>
                <TypographyCenterTableCell value={String(armor.rarity)}/>
                <ActionsTableCell name={armor.id} path={EquipmentPath.Armor}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table size="small">
                                <TableBody>
                                    <GenesysDescriptionTypography text={armor?.description!!}/>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default function CampaignArmor() {
    const [armors, setArmors] = useState<Armor[]>([])
    const [openEquipmentCreationDialog, setOpenEquipmentCreationDialog] = useState(false)
    const headers = ['Name', 'Defense', 'Soak', 'Encumbrance', 'Price', 'Rarity', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            setArmors(await ArmorService.getArmors())
        })()
    }, [])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Campaign Armors'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenEquipmentCreationDialog(true)}>Create Armor</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {armors.map((armor: Armor) => (
                                <Row key={armor.name} armor={armor} columns={headers.length}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openEquipmentCreationDialog && <CreateEquipmentDialog open={openEquipmentCreationDialog}
                                                                   onClose={(): void => setOpenEquipmentCreationDialog(false)}
                                                                   type={EquipmentType.Armor}/>}
        </Card>
    )
}
