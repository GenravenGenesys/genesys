import {Activation} from "../../../../models/Talent";
import {Card, CardContent} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import ViewFieldCard from "../../ViewFieldCard";
import GridItem from "../../grid/GridItem";
import GenesysSelectField from "../../field/GenesysSelectField";

type Props = {
    value: Activation;
    onChange: (value: Activation) => void;
    disabled: boolean;
};

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