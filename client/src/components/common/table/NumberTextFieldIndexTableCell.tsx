import * as React from "react";
import NumberTextField from "../text/NumberTextField";
import CustomTableCell from "./common/CustomTableCell";

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
    return <CustomTableCell centered>
        <NumberTextField title={title} value={value} onChange={(e) => onChange(index, e)} min={min} max={max}
                         disabled={disabled} steps={steps}/>
    </CustomTableCell>;
};

export default NumberTextFieldIndexTableCell;