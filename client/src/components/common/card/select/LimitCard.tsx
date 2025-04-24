import {Card, CardContent, MenuItem, Select, TextField} from "@mui/material";
import Limit, {LimitType} from "../../../../models/common/Limit";
import React, {useState} from "react";
import ViewFieldCard from "../../ViewFieldCard";
import CenteredCardHeader from "../header/CenteredCardHeader";
import GridItem from "../../grid/GridItem";
import GridContainer from "../../grid/GridContainer";

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
                            <TextField
                                type="number"
                                value={limit.limit}
                                fullWidth
                                variant={"standard"}
                                onChange={(e) => handleLimitChange({
                                    type: limit.type,
                                    limit: Number(e.target.value)
                                })}
                                inputProps={{min: 0, max: 1}}
                            />
                        </GridItem>
                        <GridItem>
                            <Select
                                value={limit.type}
                                onChange={(e) => onChange({
                                    limit: limit.limit,
                                    type: e.target.value as LimitType
                                })}
                                fullWidth
                                label={'Type'}
                                variant={"standard"}
                            >
                                {Object.values(LimitType).map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </GridItem>
                    </GridContainer>
                </CardContent>
            </Card>
        </GridItem>;
};

export default LimitCard;