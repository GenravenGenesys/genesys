import {Autocomplete, TextField} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import type {ModifierType} from "../../../api/model";
import {useFetchAllModifierTypes} from "../../../hooks/useFetchAllModifierTypes.ts";

interface Props {
    disabled: boolean
    onChange: (index: number, newValue: ModifierType) => void
    type: string
    index: number
}

export default function ModifierAutocompleteTableCell(props: Props) {
    const {disabled, onChange, type, index} = props;
    const {modifiers} = useFetchAllModifierTypes();

    return (
        <TableCell sx={{"width": .75}}>
            <Autocomplete
                options={modifiers}
                getOptionLabel={(option) => option}
                value={type}
                onChange={(_, newValue) => onChange(index, newValue as ModifierType)}
                renderInput={(params) => <TextField {...params} label="Type"
                                                    variant="outlined"/>}
                disabled={disabled}
            />
        </TableCell>
    );
}