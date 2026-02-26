import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "./TypographyTableCell";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import type {Skill} from "../../../api/model";

const renderHeaders = (headers: string[], columns: number) => {
    return (
        <TableRow key={'Header'}>
            {headers.map((header: string) => (
                <TypographyCenterTableCell key={header} value={header} span={columns}/>
            ))}
        </TableRow>
    )
}

export const renderSingleRowTableHeader = (headers: string[], sx?: {}) => {
    return (
        <TableHead sx={sx}>
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

export const renderSkillNameTableCell = (skill: Skill) => {
    return <TypographyCenterTableCell value={skill.name + '(' + skill.characteristic + ')'}/>
}

export const renderBooleanTableCell = (value: boolean) => {
    return (
        <TableCell>
            <Typography style={{textAlign: 'center'}}>{value ? <CheckIcon color='primary' fontSize='small'/> :
                <CancelIcon color='primary' fontSize='small'/>}</Typography>
        </TableCell>
    )
}