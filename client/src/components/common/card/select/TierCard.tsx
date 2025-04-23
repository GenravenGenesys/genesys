import {Tier} from "../../../../models/Talent";
import {Card, CardContent, MenuItem, Select} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import ViewFieldCard from "../../ViewFieldCard";
import GridItem from "../../grid/GridItem";

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
                    <Select
                        value={value}
                        onChange={(e) => onChange(e.target.value as Tier)}
                        disabled={disabled}
                        fullWidth
                        label={'Tier'}
                        variant={"standard"}
                    >
                        {Object.values(Tier).map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </CardContent>
            </Card>
        </GridItem>;
};

export default TierCard;