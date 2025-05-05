import {Card, CardContent} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {useLocation} from "react-router";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {useState} from "react";
import * as React from "react";
import Injury from "../../../models/Injury";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import InjuryService from "../../../services/InjuryService";
import ModifierAutocompleteTableCell from "../../common/table/ModifierAutocompleteTableCell";
import NumberTextFieldIndexTableCell from "../../common/table/NumberTextFieldIndexTableCell";
import ModifierTableFooter from "../../common/table/ModifierTableFooter";

interface Props {
    crit: Injury
}

export default function CriticalInjuryModifierCard(props: Props) {
    const {crit} = props;
    const headers = ['Type', 'Ranks'];
    const [injury, setInjury] = useState(crit);
    const disabled = !useLocation().pathname.endsWith(injury.id + '/edit');

    const handleTypeChange = async (index: number, value: string) => {
        const updatedModifiers = injury.modifiers.map((row, i) =>
            i === index ? {...row, type: value} : row
        );
        setInjury(await InjuryService.updateInjury({...injury, modifiers: updatedModifiers}));
    };

    const handleRanksChange = async (index: number, value: number) => {
        const updatedModifiers = injury.modifiers.map((row, i) =>
            i === index ? {...row, ranks: value} : row
        );
        setInjury(await InjuryService.updateInjury({...injury, modifiers: updatedModifiers}));
    };

    const addRow = async () => {
        setInjury(await InjuryService.updateInjury({
            ...injury,
            modifiers: [...injury.modifiers, {type: "Default", ranks: 1}]
        }));
    };

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Modifiers'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {injury.modifiers.map((modifier, index) => (
                                <TableRow key={index}>
                                    <ModifierAutocompleteTableCell disabled={disabled} onChange={handleTypeChange}
                                                                   type={modifier.type} index={index}/>
                                    <NumberTextFieldIndexTableCell title={'Ranks'} value={modifier.ranks}
                                                                   onChange={handleRanksChange} min={1} max={10}
                                                                   disabled={disabled} index={index}/>
                                </TableRow>
                            ))}
                        </TableBody>
                        <ModifierTableFooter addRow={addRow} id={injury.id}/>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}