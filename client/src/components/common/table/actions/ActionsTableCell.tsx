import PreviewIcon from '@mui/icons-material/Preview'
import {IconButton, TableCell} from "@mui/material";
import {Link, LinkProps} from "react-router-dom";
import {forwardRef, useMemo} from "react";
import * as React from "react";

interface Props {
    name: string
    path: string
}

export default function ActionsTableCell(props: Props) {
    const {name, path} = props

    const handleView = useMemo(() => forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref): React.ReactElement => (
        <Link to={`${path}${name}/view`} ref={ref} {...itemProps} />
    )), [path, name])

    return (
        <TableCell style={{textAlign: 'center'}}>
            <IconButton title='View' size='small' component={handleView} style={{textAlign: 'center'}}>
                <PreviewIcon color='primary' fontSize='small'/>
            </IconButton>
        </TableCell>
    )
}