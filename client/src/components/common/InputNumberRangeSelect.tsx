import {ClickAwayListener, MenuItem, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import EditField from "./EditField";

interface Props {
    defaultValue: number,
    min: number,
    max: number,
    defaultEdit?: boolean,
    editable?: boolean,
    onChange?: (value: string) => void,
    onCommit: (value: number) => void,
    helperText?: string
}

export default function InputNumberRangeSelectField(props: Props): JSX.Element {
    const {defaultValue, defaultEdit, min, max, editable, onChange, onCommit, helperText} = props;
    const [value, setValue] = useState(defaultValue);
    const [edit, setEdit] = useState(defaultEdit ?? false);

    const handleOnCommit = (): void => {
        setEdit(!edit);
        onCommit(value);
    };

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue(+event.target.value);

        if (onChange) {
            onChange(event.target.value);
        }
    };

    const range = Array.from({length: (max - min)}, (v, k) => k + min);

    const editElement = (
        <ClickAwayListener mouseEvent="onMouseUp" onClickAway={handleOnCommit}>
            <TextField value={value} helperText={helperText} onChange={inputOnChange} select>
                {range.map((key) => (
                    <MenuItem key={key} value={key}>{key}</MenuItem>
                ))}
            </TextField>
        </ClickAwayListener>
    );

    const viewElement = <Typography style={{wordWrap: 'break-word'}}>{value}</Typography>;

    const onCancel = (): void => {
        setEdit(!edit);
        setValue(value);
    };

    return (
        <EditField viewElement={viewElement} edit={edit} editable={editable} editElement={editElement}
                   onEdit={(): void => setEdit(!edit)} onCancel={(): void => onCancel()} onCommit={handleOnCommit}/>
    );
}