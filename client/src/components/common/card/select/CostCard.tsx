import Cost, {CostType} from "../../../../models/common/Cost";
import {Card, CardContent, Grid, MenuItem, Select, TextField} from "@mui/material";
import CenteredCardHeader from "../header/CenteredCardHeader";
import * as React from "react";
import {useState} from "react";
import ViewFieldCard from "../../ViewFieldCard";

interface Props {
    initialCost: Cost;
    onChange: (value: Cost) => void;
    disabled: boolean;
}

const CostCard: React.FC<Props> = ({initialCost, onChange, disabled})=> {
    const [cost, setCost] = useState<Cost>(initialCost);

    const handleCostChange = (updatedCost: Cost) => {
        setCost(updatedCost);
        onChange(cost);
    };

    const setMaxValue = () => {
        switch (cost.type) {
            case CostType.None:
                return 0;
            case CostType.Strain:
                return 5;
            case CostType.StoryPoint:
                return 1;
        }
    };

    return disabled ?
        <ViewFieldCard name={'Cost'}
                       value={cost.type === CostType.None ? CostType.None : cost.amount + ' ' + cost.type}/> :
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Cost'}/>
                <CardContent>
                    <Grid container justifyContent={'center'}>
                        <Grid item xs>
                            <TextField
                                type="number"
                                value={cost.amount}
                                fullWidth
                                variant={"standard"}
                                onChange={(e) => handleCostChange({
                                    type: cost.type,
                                    amount: Number(e.target.value)
                                })}
                                inputProps={{min: 0, max: setMaxValue()}}
                            />
                        </Grid>
                        <Grid item xs>
                            <Select
                                value={cost.type}
                                onChange={(e) => onChange({
                                    amount: cost.amount,
                                    type: e.target.value as CostType
                                })}
                                fullWidth
                                label={'Type'}
                                variant={"standard"}
                            >
                                {Object.values(CostType).map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
};

export default CostCard;