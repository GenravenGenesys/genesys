import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import {useLocation} from "react-router";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {useState} from "react";
import ModifierAutocompleteTableCell from "../../common/table/ModifierAutocompleteTableCell";
import NumberTextFieldIndexTableCell from "../../common/table/NumberTextFieldIndexTableCell";
import ModifierTableFooter from "../../common/table/ModifierTableFooter";
import type {Modifier, ModifierType, Talent} from "../../../api/model";
import {getTalentController} from "../../../api/generated/talent-controller/talent-controller.ts";

interface Props {
    tal: Talent
}

export default function TalentModifierCard(props: Props) {
    const {tal} = props;
    const headers = ['Type', 'Ranks'];
    const [talent, setTalent] = useState(tal);
    const disabled = !useLocation().pathname.endsWith(talent.id + '/edit');

    const handleTypeChange = async (index: number, value: ModifierType) => {
        const updatedModifiers = talent.modifiers.map((row, i) =>
            i === index ? {...row, type: value} : row
        );
        await updateTalent({...talent, modifiers: updatedModifiers});
    };

    const handleRanksChange = async (index: number, value: number) => {
        const updatedModifiers = talent.modifiers.map((row, i) =>
            i === index ? {...row, ranks: value} : row
        );
        await updateTalent({...talent, modifiers: updatedModifiers});
    };

    const addRow = async () => {
        await updateTalent({
            ...talent,
            modifiers: [...talent.modifiers, {type: "Default", ranks: 1}]
        });
    };

    const updateTalent = async (updatedTalent: Talent) => {
        setTalent(await getTalentController().updateTalent(updatedTalent.id, updatedTalent));
    };

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Modifiers'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {talent.modifiers.map((modifier: Modifier, index: number) => (
                                <TableRow key={index}>
                                    <ModifierAutocompleteTableCell disabled={disabled} onChange={handleTypeChange}
                                                                   type={modifier.type} index={index}/>
                                    <NumberTextFieldIndexTableCell title={'Ranks'} value={modifier.ranks}
                                                                   onChange={handleRanksChange} min={1} max={10}
                                                                   disabled={disabled} index={index}/>
                                </TableRow>
                            ))}
                        </TableBody>
                        <ModifierTableFooter id={talent.id} addRow={addRow}/>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}