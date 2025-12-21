import {Autocomplete, TextField} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import {useEffect, useState} from "react";
import ModifierService from "../../../services/ModifierService";
import type {ModifierType} from "../../../api/model";

interface Props {
    disabled: boolean
    onChange: (index: number, newValue: ModifierType) => void
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
                onChange={(_, newValue) => onChange(index, newValue as ModifierType)}
                renderInput={(params) => <TextField {...params} label="Type"
                                                    variant="outlined"/>}
                disabled={disabled}
            />
        </TableCell>
    )
}