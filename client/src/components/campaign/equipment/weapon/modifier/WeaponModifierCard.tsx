import {Autocomplete, Button, Card, CardContent, TableFooter, TextField} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import AddIcon from '@mui/icons-material/Add';
import {Fragment, useEffect, useState} from "react";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import {Weapon} from "../../../../../models/equipment/Weapon";
import ModifierService from "../../../../../services/ModifierService";
import CenteredCardHeader from "../../../../common/card/CenteredCardHeader";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";

interface Props {
    weapon: Weapon
    updateWeapon: (weapon: Weapon) => void
    disabled: boolean
}

export default function WeaponModifierCard(props: Props) {
    const {weapon, updateWeapon, disabled} = props;
    const headers = ['Type', 'Ranks'];
    const [typeOptions, setTypeOptions] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            setTypeOptions(await ModifierService.getModifiers())
        })()
    }, [])

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
    }

    const handleTypeChange = async (index: number, value: string) => {
        const updatedModifiers = weapon.modifiers.map((row, i) =>
            i === index ? {...row, type: value} : row
        );
        updateWeapon({...weapon, modifiers: updatedModifiers});
    };

    const handleRanksChange = async (index: number, value: string) => {
        const updatedModifiers = weapon.modifiers.map((row, i) =>
            i === index ? {...row, ranks: Number(value)} : row
        );
        updateWeapon({...weapon, modifiers: updatedModifiers});
    };

    const addRow = async () => {
        updateWeapon({
            ...weapon,
            modifiers: [...weapon.modifiers, {type: "Default", ranks: 1}]
        });
    };

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Modifiers'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {weapon.modifiers.map((modifier, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Autocomplete
                                            options={typeOptions}
                                            getOptionLabel={(option) => option}
                                            value={modifier.type}
                                            onChange={(e, newValue) => handleTypeChange(index, newValue as string)}
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
    )
}