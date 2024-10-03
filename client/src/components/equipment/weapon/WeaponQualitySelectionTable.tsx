import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import QualityService from "../../../services/QualityService";
import Quality from "../../../models/Quality";
import QualityBackdrop from "../../qualities/QualityBackdrop";
import {Weapon} from "../../../models/equipment/Weapon";
import EquipmentService from "../../../services/EquipmentService";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";

interface RowProps {
    quality: Quality
    weapon: Weapon
}

function QualityRow(props: RowProps) {
    const {quality, weapon} = props;
    const [openQualityBackDrop, setOpenQualityBackDrop] = useState(false)

    const addQuality = async () => {
        if (weapon.qualities.find(equipmentQuality  => equipmentQuality.name === quality.name)) {
            weapon.qualities.forEach((equipmentQuality, index) => {
                if (equipmentQuality.name === quality.name) {
                    equipmentQuality.ranks = equipmentQuality.ranks + 1
                    weapon.qualities[index] = equipmentQuality
                }
            })
        }
        else {
            weapon.qualities = weapon.qualities.concat({...quality, ranks: 1})
        }
        await EquipmentService.updateWeapon(weapon.name, weapon)
    }

    return (
        <TableRow>
            <TableCell>
                <Button onClick={(): void => setOpenQualityBackDrop(true)}>{quality.name}</Button>
                {openQualityBackDrop &&
                    <QualityBackdrop open={openQualityBackDrop} onClose={(): void => setOpenQualityBackDrop(false)}
                                     quality={quality}/>}
            </TableCell>
            <TableCell>
                <Button onClick={addQuality}>Add</Button>
            </TableCell>
        </TableRow>
    )
}

interface TableProps {
    weapon: Weapon
}

export default function WeaponQualitySelectionTable(props: TableProps) {
    const {weapon} = props
    const [qualities, setQualities] = useState<Quality[]>([])
    const headers = ['Name', 'Add']

    useEffect(() => {
        (async (): Promise<void> => {
            const qualityList = await QualityService.getQualities()
            if (!qualityList) {
                return
            }
            setQualities(qualityList)
        })()
    }, [setQualities])

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {qualities.map((quality: Quality) => (
                        <QualityRow quality={quality} weapon={weapon}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}