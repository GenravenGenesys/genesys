import {Autocomplete, Button, Card, CardContent, TableFooter, TextField} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import AddIcon from '@mui/icons-material/Add';
import {Fragment} from "react";
import TableCell from "@mui/material/TableCell";
import {type Armor} from "../../../../../models/equipment/Armor";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import {useFetchAllModifierTypes} from "../../../../../hooks/useFetchAllModifierTypes.ts";

interface Props {
    armor: Armor;
    updateArmor: (armor: Armor) => void;
    disabled: boolean;
}

export default function ArmorModifierCard(props: Props) {
    const {armor, updateArmor, disabled} = props;
    const headers = ['Type', 'Ranks'];
    const {modifiers} = useFetchAllModifierTypes();

    const renderTableFooter = () => {
        if (!disabled) {
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
    };

    const handleTypeChange = async (index: number, value: string) => {
        const updatedModifiers = armor.modifiers.map((row, i) =>
            i === index ? {...row, type: value} : row
        );
        updateArmor({...armor, modifiers: updatedModifiers});
    };

    const handleRanksChange = async (index: number, value: string) => {
        const updatedModifiers = armor.modifiers.map((row, i) =>
            i === index ? {...row, ranks: Number(value)} : row
        );
        updateArmor({...armor, modifiers: updatedModifiers});
    };

    const addRow = async () => {
        updateArmor({...armor, modifiers: [...armor.modifiers, {type: "Default", ranks: 1}]});
    };

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Modifiers'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {armor.modifiers.map((modifier, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Autocomplete
                                            options={modifiers}
                                            getOptionLabel={(option) => option}
                                            value={modifier.type}
                                            onChange={(_, newValue) => handleTypeChange(index, newValue as string)}
                                            renderInput={(params) => <TextField {...params} label="Type"
                                                                                variant="outlined"/>}
                                            disabled={disabled}
                                        />
                                    </TableCell>
                                    <TableCell style={{textAlign: "center"}}>
                                        <TextField
                                            type="number"
                                            value={modifier.ranks}
                                            label="Ranks"
                                            onChange={(e) => handleRanksChange(index, e.target.value)}
                                            inputProps={{min: 1, max: 10}}
                                            disabled={disabled}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {renderTableFooter()}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}