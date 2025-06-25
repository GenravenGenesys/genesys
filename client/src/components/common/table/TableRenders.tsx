import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "./TypographyTableCell";
import Skill from "../../../models/actor/Skill";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

const renderHeaders = (headers: string[], columns: number) => {
    return (
        <TableRow key={'Header'}>
            {headers.map((header: string) => (
                <TypographyCenterTableCell key={header} value={header} span={columns}/>
            ))}
        </TableRow>
    )
}

export const renderSingleRowTableHeader = (headers: string[]) => {
    return (
        <TableHead>
            {renderHeaders(headers, 1)}
        </TableHead>
    )
}

export const renderSingleRowTableHeaderWithColumns = (headers: string[], columns: number) => {
    return (
        <TableHead>
            {renderHeaders(headers, columns)}
        </TableHead>
    )
}

export const renderDoubleRowTableHeader = (headers: string[], value: string, colSpan: number) => {
    return (
        <TableHead>
            <TableRow key={'Main Header'}>
                <TypographyCenterTableCell value={value} span={colSpan}/>
            </TableRow>
            {renderHeaders(headers, 1)}
        </TableHead>
    )
}

export const renderSkillName = (skill: Skill) => {
    return <TypographyLeftTableCell value={skill.name + '(' + skill.characteristic + ')'}/>
}

export const renderBooleanTableCell = (value: boolean) => {
    return (
        <TableCell>
            <Typography style={{textAlign: 'center'}}>{value ? <CheckIcon color='primary' fontSize='small'/> :
                <CancelIcon color='primary' fontSize='small'/>}</Typography>
        </TableCell>
    )
}