import { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import EditField from "./EditField";
import GenesysDescriptionTypography from "./typography/GenesysDescriptionTypography";
import { ClickAwayListener, TextField } from "@mui/material";

type Props = {
    defaultValue: number;
    defaultEdit?: boolean;
    editable?: boolean;
    onCommit: (value: number) => void;
    helperText?: string;
    disabled?: boolean;
    placeholder?: string;
    errorText?: string;
    min?: number;
    max?: number;
    step?: number;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

const InlineNumberField: FC<Props> = ({
    defaultValue,
    defaultEdit,
    editable,
    onCommit,
    helperText,
    disabled,
    placeholder,
    errorText,
    min,
    max,
    step,
    inputProps
}) => {
    const [numberValue, setNumberValue] = useState(defaultValue);
    const [edit, setEdit] = useState(defaultEdit ?? false);
    const [error, setError] = useState(false);

    const handleOnCommit = (): void => {
        setEdit(false);
        if (!error) onCommit(numberValue);
        setError(false);
    };

    const handleOnCancel = (): void => {
        setNumberValue(defaultValue);
        setEdit(false);
        setError(false);
    };

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = +event.target.value;
        if ((min !== undefined && value < min) || (max !== undefined && value > max)) {
            setError(true);
        } else {
            setError(false);
        }
        setNumberValue(value);
    };

    const editElement = (
        <ClickAwayListener onClickAway={handleOnCommit}>
            <TextField
                type="number"
                fullWidth
                variant="outlined"
                value={numberValue}
                onChange={inputOnChange}
                helperText={error ? errorText : helperText}
                error={error}
                disabled={disabled}
                placeholder={placeholder}
                slotProps={{
                    htmlInput: {
                        min,
                        max,
                        step: step ?? 1,
                        autoFocus: true,
                        ...inputProps
                    }
                }}
            />
        </ClickAwayListener>
    );

    const viewElement = <GenesysDescriptionTypography text={String(numberValue)} />;

    return (
        <EditField
            edit={edit}
            editable={editable}
            viewElement={viewElement}
            editElement={editElement}
            onEdit={() => setEdit(true)}
            onCancel={handleOnCancel}
            onCommit={handleOnCommit}
        />
    );
};

export default InlineNumberField;