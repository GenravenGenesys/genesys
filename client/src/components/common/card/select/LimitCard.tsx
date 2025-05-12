import {Card, CardContent} from "@mui/material";
import Limit, {LimitType} from "../../../../models/common/Limit";
import React, {useState} from "react";
import ViewFieldCard from "../../ViewFieldCard";
import CenteredCardHeader from "../header/CenteredCardHeader";
import GridItem from "../../grid/GridItem";
import GridContainer from "../../grid/GridContainer";
import NumberTextField from "../../text/NumberTextField";
import GenesysSelectField from "../../field/GenesysSelectField";

type Props = {
    initialLimit: Limit;
    onChange: (limit: Limit) => void;
    disabled: boolean;
};

const LimitCard: React.FC<Props> = ({initialLimit, onChange, disabled}) => {
    const [limit, setLimit] = useState(initialLimit);

    const handleLimitChange = (updatedLimit: Limit) => {
        setLimit(updatedLimit);
        onChange(limit);
    };

    return disabled ?
        <ViewFieldCard name={'Limit'}
                       value={limit.type === LimitType.None ? LimitType.None : limit.limit + ' ' + limit.type}/>
        :
        <GridItem>
            <Card>
                <CenteredCardHeader title={'Limit'}/>
                <CardContent>
                    <GridContainer centered>
                        <GridItem>
                            <NumberTextField title={'Amount'} value={limit.limit}
                                             onChange={(amount) => handleLimitChange({
                                                 type: limit.type,
                                                 limit: amount
                                             })} min={0} max={1}/>
                        </GridItem>
                        <GridItem>
                            <GenesysSelectField value={limit.type} label={'Type'} onChange={(limitType) => onChange({
                                limit: limit.limit,
                                type: limitType
                            })} options={LimitType}/>
                        </GridItem>
                    </GridContainer>
                </CardContent>
            </Card>
        </GridItem>;
};

export default LimitCard;