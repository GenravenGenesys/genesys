import {MenuItem, Select, TableCell} from "@mui/material";
import * as React from "react";
import BooleanTableCell from "./BooleanTableCell";

interface Props {
    bool: boolean
    disabled: boolean
    onChange: (value: boolean) => void
    span?: number
}

const EditableBooleanTableCell: React.FC<Props> = ({bool, disabled, onChange, span}) => {
    const renderTableCell = () => {
        return (
            <TableCell style={{textAlign: 'center'}} colSpan={span}>
                <Select
                    value={bool ? 'Yes' : 'No'}
                    onChange={(e) => onChange(e.target.value === 'Yes')}
                    label="Ranked"
                    disabled={disabled}
                    variant={"standard"}>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                </Select>
            </TableCell>
        );
    };

    return disabled ? <BooleanTableCell bool={bool}/> : renderTableCell();
}

export default EditableBooleanTableCell;