import Cost, {CostType} from "../../../../models/common/Cost";
import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../header/CenteredCardHeader";
import * as React from "react";
import {useState} from "react";
import ViewFieldCard from "../../ViewFieldCard";
import GridItem from "../../grid/GridItem";
import GridContainer from "../../grid/GridContainer";
import GenesysSelectField from "../../field/GenesysSelectField";
import NumberTextField from "../../text/NumberTextField";

type Props = {
    initialCost: Cost;
    onChange: (value: Cost) => void;
    disabled: boolean;
};

const CostCard: React.FC<Props> = ({initialCost, onChange, disabled}) => {
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
        <GridItem>
            <Card>
                <CenteredCardHeader title={'Cost'}/>
                <CardContent>
                    <GridContainer centered>
                        <GridItem>
                            <NumberTextField title={'Amount'} value={cost.amount}
                                             onChange={(amount) => handleCostChange({
                                                 type: cost.type,
                                                 amount: amount
                                             })} min={0} max={setMaxValue()}/>
                        </GridItem>
                        <GridItem>
                            <GenesysSelectField value={cost.type} label={'Type'} onChange={(costType) => onChange({
                                amount: cost.amount,
                                type: costType
                            })} options={CostType}/>
                        </GridItem>
                    </GridContainer>
                </CardContent>
            </Card>
        </GridItem>;
};

export default CostCard;