import {Card, CardContent} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import {RangeBand} from "../../../../models/common/RangeBand";
import GridItem from "../../grid/GridItem";
import GenesysSelectField from "../../field/GenesysSelectField";

type Props = {
    value: RangeBand;
    onChange: (value: RangeBand) => void;
    disabled: boolean;
};

const RangeBandCard: React.FC<Props> = ({value, onChange, disabled}) => {
    return (
        <GridItem>
            <Card>
                <CenteredCardHeader title={'Range Band'}/>
                <CardContent>
                    <GenesysSelectField value={value} label={'Range Band'} onChange={onChange} options={RangeBand}
                                        disabled={disabled}/>
                </CardContent>
            </Card>
        </GridItem>
    );
};

export default RangeBandCard;