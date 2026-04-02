import {Autocomplete, TextField} from "@mui/material";
import * as React from "react";
import CustomTableCell from "./common/CustomTableCell";
import {useFetchEquipmentQualities} from "../../../hooks/useFetchEquipmentQualities.ts";
import type {EquipmentQuality} from "../../../api/model";

interface Props {
    disabled: boolean;
    onChange: (index: number, newValue: EquipmentQuality) => void;
    quality: EquipmentQuality;
    index: number;
}

const QualityAutocompleteTableCell: React.FC<Props> = ({disabled, onChange, quality, index})=> {
    const {equipmentQualities} = useFetchEquipmentQualities();

    return <CustomTableCell width={.75}>
            <Autocomplete
                options={equipmentQualities}
                getOptionLabel={(option) => option.name!}
                value={quality!}
                onChange={(_, newValue) => onChange(index, newValue as EquipmentQuality)}
                renderInput={(params) => <TextField {...params} label="Quality"
                                                    variant="outlined"/>}
                disabled={disabled}
            />
        </CustomTableCell>;
};

export default QualityAutocompleteTableCell;