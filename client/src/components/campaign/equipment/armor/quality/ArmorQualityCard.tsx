import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import NumberTextFieldIndexTableCell from "../../../../common/table/NumberTextFieldIndexTableCell";
import QualityAutocompleteTableCell from "../../../../common/table/QualityAutocompleteTableCell";
import QualityTableFooter from "../../../../common/table/QualityTableFooter";
import type {Armor, EquipmentQuality} from "../../../../../api/model";

interface Props {
    armor: Armor
    updateArmor: (armor: Armor) => void
    disabled: boolean
}

export default function ArmorQualityCard(props: Props) {
    const {armor, updateArmor, disabled} = props;
    const headers = ['Quality', 'Ranks'];

    const addRow = async () => {
        updateArmor({...armor, qualities: [...armor.qualities, {} as EquipmentQuality]});
    };

    const handleQualityChange = async (index: number, value: EquipmentQuality) => {
        const updatedQualities = armor.qualities.map((row: EquipmentQuality, i: number) =>
            i === index ? {...value} : row
        );
        updateArmor({...armor, qualities: updatedQualities});
    };

    const handleRanksChange = async (index: number, value: number) => {
        const updatedQualities = armor.qualities.map((row: EquipmentQuality, i: number) =>
            i === index ? {...row, ranks: Number(value)} : row
        );
        updateArmor({...armor, qualities: updatedQualities});
    };

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Equipment Qualities'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {armor.qualities.map((quality: EquipmentQuality, index: number) => (
                                <TableRow key={index}>
                                    <QualityAutocompleteTableCell disabled={disabled}
                                                                  onChange={handleQualityChange} quality={quality}
                                                                  index={index}/>
                                    <NumberTextFieldIndexTableCell title={'Ranks'} value={quality.ranks}
                                                                   onChange={handleRanksChange} min={1} max={10}
                                                                   disabled={disabled}
                                                                   index={index}/>
                                </TableRow>
                            ))}
                        </TableBody>
                        <QualityTableFooter addRow={addRow} disabled={disabled}/>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}