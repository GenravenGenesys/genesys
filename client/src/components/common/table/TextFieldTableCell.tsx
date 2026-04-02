import TableCell from "@mui/material/TableCell";
import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import InlineTextField from "../InlineTextField";

interface Props {
    onChange: (index: number, value: string) => void
    value: string
    index: number
    disabled: boolean
}

export default function TextFieldTableCell(props: Props) {
    const { onChange, value, index, disabled } = props;
    const [name, setName] = useState(value);

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;


    }

    const onCommit = (value: string) => {
        setName(value);
        onChange(index, value);
    };

    return (
        <TableCell style={{ textAlign: 'left' }}>
            {/* <TextField onChange={onNameChange} value={name} fullWidth disabled={disabled} /> */}
            <InlineTextField defaultValue={name} editable={true} onCommit={onCommit} helperText={"Title of Session"}
                placeholder={"Operation Rabbit"} disabled={disabled}/>
        </TableCell>
    )
}