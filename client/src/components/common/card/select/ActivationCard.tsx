import {Card, CardContent} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import ViewFieldCard from "../../ViewFieldCard";
import GridItem from "../../grid/GridItem";
import GenesysSelectField from "../../../home/common/field/GenesysSelectField";
import {Activation} from "../../../../api/model";

interface Props {
    value: Activation;
    onChange: (value: Activation) => void;
    disabled: boolean;
}

const ActivationCard: React.FC<Props> = ({value, onChange, disabled}) => {
    return disabled ? <ViewFieldCard name={'Activation'} value={value}/> :
        <GridItem>
            <Card>
                <CenteredCardHeader title={'Activation'}/>
                <CardContent>
                    <GenesysSelectField value={value} label={'Activation'} onChange={onChange} options={Activation}
                                        disabled={disabled}/>
                </CardContent>
            </Card>
        </GridItem>;
};

export default ActivationCard;