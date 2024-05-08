import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "./TypographyTableCell";
import * as React from "react";
import Skill from "../../../models/actor/Skill";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

export const renderHeaders = (headers: string[]): JSX.Element => {
    return (
        <TableRow key={'Header'}>
            {headers.map((header: string) => (
                <TypographyCenterTableCell value={header} key={header}/>
            ))}
        </TableRow>
    )
}

export const renderSingleRowTableHeader = (headers: string[]): JSX.Element => {
    return (
        <TableHead>
            {renderHeaders(headers)}
        </TableHead>
    )
}

export const renderDoubleRowTableHeader = (headers: string[], value: string, colSpan: number): JSX.Element => {
    return (
        <TableHead>
            <TableRow key={'Main Header'}>
                <TypographyCenterTableCell value={value} span={colSpan}/>
            </TableRow>
            {renderHeaders(headers)}
        </TableHead>
    )
}

export const renderSkillName = (skill: Skill): JSX.Element => {
    return <TypographyLeftTableCell value={skill.name + '(' + skill.characteristic + ')'}/>
}

export const renderBooleanTableCell = (value: boolean): JSX.Element => {
    return (
        <TableCell>
            <Typography style={{textAlign: 'center'}}>{value ? <CheckIcon color='primary' fontSize='small'/> :
                <CancelIcon color='primary' fontSize='small'/>}</Typography>
        </TableCell>
    )
}