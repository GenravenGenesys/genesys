import {Activation} from "../../../../models/Talent";
import {Card, CardContent, Grid, MenuItem, Select} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import ViewFieldCard from "../../ViewFieldCard";

interface Props {
    value: Activation;
    onChange: (value: Activation) => void;
    disabled: boolean;
}

const ActivationCard: React.FC<Props> = ({value, onChange, disabled}) => {
    return disabled ? <ViewFieldCard name={'Activation'} value={value}/> :
        <Grid xs>
            <Card>
                <CenteredCardHeader title={'Activation'}/>
                <CardContent>
                    <Select
                        value={value}
                        onChange={(e) => onChange(e.target.value as Activation)}
                        disabled={disabled}
                        fullWidth
                        label={'Activation'}
                        variant={"standard"}
                    >
                        {Object.values(Activation).map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </CardContent>
            </Card>
        </Grid>;
};

export default ActivationCard;