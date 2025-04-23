import {Card, CardContent, MenuItem, Select} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import {RangeBand} from "../../../../models/common/RangeBand";
import GridItem from "../../grid/GridItem";

type Props = {
    value: RangeBand;
    onChange: (value: RangeBand) => void;
    disabled: boolean;
};

const RangeBandCard: React.FC<Props> = ({value, onChange, disabled})=> {
    return (
        <GridItem>
            <Card>
                <CenteredCardHeader title={'Range Band'}/>
                <CardContent>
                    <Select
                        value={value}
                        onChange={(e) => onChange(e.target.value as RangeBand)}
                        disabled={disabled}
                        fullWidth
                        label={'Range Band'}
                    >
                        {Object.values(RangeBand).map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </CardContent>
            </Card>
        </GridItem>
    );
};

export default RangeBandCard;