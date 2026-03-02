import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import NumberTextFieldIndexTableCell from "../../../../common/table/NumberTextFieldIndexTableCell";
import QualityAutocompleteTableCell from "../../../../common/table/QualityAutocompleteTableCell";
import QualityTableFooter from "../../../../common/table/QualityTableFooter";
import type {EquipmentQuality, Weapon} from "../../../../../api/model";

interface Props {
    weapon: Weapon
    updateWeapon: (weapon: Weapon) => void
    disabled: boolean
}

export default function WeaponQualityCard(props: Props) {
    const {weapon, updateWeapon, disabled} = props;
    const headers = ['Quality', 'Ranks'];

    const addRow = async () => {
        updateWeapon({...weapon, qualities: [...weapon.qualities, {} as EquipmentQuality]});
    };

    const handleQualityChange = async (index: number, value: EquipmentQuality) => {
        const updatedQualities = weapon.qualities.map((row, i) =>
            i === index ? {...value} : row
        );
        updateWeapon({...weapon, qualities: updatedQualities});
    };

    const handleRanksChange = async (index: number, value: number) => {
        const updatedQualities = weapon.qualities.map((row, i) =>
            i === index ? {...row, ranks: value} : row
        );
        updateWeapon({...weapon, qualities: updatedQualities});
    };

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Equipment Qualities'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {weapon.qualities.map((quality, index) => (
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