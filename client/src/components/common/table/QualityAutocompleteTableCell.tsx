import {Autocomplete, TextField} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import Quality, {EquipmentQuality} from "../../../models/Quality";
import QualityService from "../../../services/QualityService";
import CustomTableCell from "./common/CustomTableCell";

type Props = {
    disabled: boolean;
    onChange: (index: number, newValue: EquipmentQuality) => void;
    quality: EquipmentQuality;
    index: number;
};

const QualityAutocompleteTableCell: React.FC<Props> = ({disabled, onChange, quality, index})=> {
    const [equipmentQualities, setEquipmentQualities] = useState<Quality[]>([]);

    useEffect(() => {
        (async () => {
            const qualities = await QualityService.getQualities();
            const updatedQualities = qualities.filter((quality) => quality.weapon).map((quality) => ({
                ...quality,
                ranks: 1,
            } as EquipmentQuality));
            setEquipmentQualities(updatedQualities);
        })()
    }, [])

    return <CustomTableCell width={.75}>
            <Autocomplete
                options={equipmentQualities}
                getOptionLabel={(option) => option.name}
                value={quality}
                onChange={(e, newValue) => onChange(index, newValue as EquipmentQuality)}
                renderInput={(params) => <TextField {...params} label="Quality"
                                                    variant="outlined"/>}
                disabled={disabled}
            />
        </CustomTableCell>;
};

export default QualityAutocompleteTableCell;