import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {useState} from 'react';
import {renderSingleRowTableHeader} from '../../../common/table/TableRenders';
import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
import CreateEquipmentDialog from "../CreateEquipmentDialog";
import {EquipmentType} from "../../../../models/equipment/Equipment";
import ArmorRow from "./ArmorRow.tsx";
import {useFetchAllArmor} from "../../../../hooks/useFetchAllArmor.ts";
import type {Armor} from "../../../../api/model";
import CenteredCardHeaderWithButton from "../../../common/card/header/CenteredCardHeaderWithButton.tsx";

export default function CampaignArmor() {
    const [openEquipmentCreationDialog, setOpenEquipmentCreationDialog] = useState(false);
    const headers = ['Name', 'Defense', 'Soak', 'Encumbrance', 'Price', 'Rarity', 'View'];
    const {armors, loading, error} = useFetchAllArmor();

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
            <CenteredCardHeaderWithButton title={'Campaign Armors'}
                                          onClick={(): void => setOpenEquipmentCreationDialog(true)}
                                          buttonText={"Create Armor"}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {armors.map((armor: Armor) => (
                                <ArmorRow key={armor.name} armor={armor} columns={headers.length}/>
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
