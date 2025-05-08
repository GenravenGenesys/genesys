import {Tier} from "../../../../models/Talent";
import {Card, CardContent} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import ViewFieldCard from "../../ViewFieldCard";
import GridItem from "../../grid/GridItem";
import GenesysSelectField from "../../field/GenesysSelectField";

interface Props {
    value: Tier;
    onChange: (value: Tier) => void;
    disabled: boolean;
}

const TierCard: React.FC<Props> = ({value, onChange, disabled}) => {
    return disabled ? <ViewFieldCard name={'Tier'} value={value}/> :
        <GridItem>
            <Card>
                <CenteredCardHeader title={'Tier'}/>
                <CardContent>
                    <GenesysSelectField value={value} label={'Tier'} onChange={onChange} options={Tier}
                                        disabled={disabled}/>
                </CardContent>
            </Card>
        </GridItem>;
};

export default TierCard;