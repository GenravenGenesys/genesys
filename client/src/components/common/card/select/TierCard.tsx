import {Card, CardContent} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import ViewFieldCard from "../../ViewFieldCard";
import GridItem from "../../grid/GridItem";
import GenesysSelectField from "../../field/GenesysSelectField";
import {TalentTier} from "../../../../api/model";

interface Props {
    value: TalentTier;
    onChange: (value: TalentTier) => void;
    disabled: boolean;
}

const TierCard: React.FC<Props> = ({value, onChange, disabled}) => {
    return disabled ? <ViewFieldCard name={'Tier'} value={value}/> :
        <GridItem>
            <Card>
                <CenteredCardHeader title={'Tier'}/>
                <CardContent>
                    <GenesysSelectField value={value} label={'Tier'} onChange={onChange} options={TalentTier}
                                        disabled={disabled}/>
                </CardContent>
            </Card>
        </GridItem>;
};

export default TierCard;