import {CharacteristicType} from "../../../models/actor/Characteristic";
import {Card, CardContent, Grid, TextField} from "@mui/material";
import CenteredCardHeader from "./header/CenteredCardHeader";
import * as React from "react";
import ViewFieldCard from "../ViewFieldCard";

interface Props {
    type: CharacteristicType;
    value: number;
    handleCharacteristicChange: (type: CharacteristicType, value: number) => void;
    disabled: boolean;
}

const CharacteristicCard: React.FC<Props> = ({type, value, handleCharacteristicChange, disabled}) => {
    return disabled ? <ViewFieldCard name={type} value={String(value)}/> :
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={type}/>
                <CardContent>
                    <TextField
                        type="number"
                        value={value}
                        label={type}
                        fullWidth
                        onChange={(e) => handleCharacteristicChange(type, Number(e.target.value))}
                        inputProps={{min: 1, max: 5}}
                        disabled={disabled}
                    />
                </CardContent>
            </Card>
        </Grid>
};

export default CharacteristicCard;