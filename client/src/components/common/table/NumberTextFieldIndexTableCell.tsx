import {TextField} from "@mui/material";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import NumberTextField from "../text/NumberTextField";

type Props = {
    title: string;
    value: number;
    onChange: (index: number, value: number) => void;
    min: number;
    max: number;
    disabled: boolean;
    index: number;
    steps?: number;
};

const NumberTextFieldIndexTableCell: React.FC<Props> = ({title, value, onChange, min, max, disabled, index, steps}) => {
    return (
        <TableCell style={{textAlign: 'center'}}>
            {/*<TextField*/}
            {/*    type="number"*/}
            {/*    value={value}*/}
            {/*    label={title}*/}
            {/*    fullWidth*/}
            {/*    onChange={(e) => onChange(index, Number(e.target.value))}*/}
            {/*    slotProps={{htmlInput: {min: min, max: max, step: steps}}}*/}
            {/*    disabled={disabled}*/}
            {/*/>*/}
            <NumberTextField title={title} value={value} onChange={(e) => onChange(index, e)} min={min} max={max}
                             disabled={disabled} steps={steps}/>
        </TableCell>
    );
};

export default NumberTextFieldIndexTableCell;