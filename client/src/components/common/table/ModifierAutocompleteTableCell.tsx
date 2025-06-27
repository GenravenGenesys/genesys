import {Autocomplete, TextField} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import {useEffect, useState} from "react";
import ModifierService from "../../../services/ModifierService";

interface Props {
    disabled: boolean
    onChange: (index: number, newValue: string) => void
    type: string
    index: number
}

export default function ModifierAutocompleteTableCell(props: Props) {
    const {disabled, onChange, type, index} = props;
    const [typeOptions, setTypeOptions] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            setTypeOptions(await ModifierService.getModifiers());
        })()
    }, [])

    return (
        <TableCell sx={{"width": .75}}>
            <Autocomplete
                options={typeOptions}
                getOptionLabel={(option) => option}
                value={type}
                onChange={(e, newValue) => onChange(index, newValue as string)}
                renderInput={(params) => <TextField {...params} label="Type"
                                                    variant="outlined"/>}
                disabled={disabled}
            />
        </TableCell>
    )
}