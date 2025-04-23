import {Card, CardContent, TextField} from "@mui/material";
import CenteredCardHeader from "./header/CenteredCardHeader";
import * as React from "react";
import {useLocation} from "react-router-dom";
import GridItem from "../grid/GridItem";

type Props = {
    damage: number;
    brawn: boolean;
    onChange: (value: number) => void;
    min: number;
    max: number;
    disabled: boolean;
};

const WeaponDamageTextFieldCard: React.FC<Props> = ({damage, brawn, onChange, min, max, disabled})=> {
    let pathname = useLocation().pathname;

    return (
        <GridItem>
            <Card>
                <CenteredCardHeader title={"Damage"}/>
                <CardContent>
                    <TextField
                        type="number"
                        value={brawn && pathname.endsWith('/view') ? `Brawn + ${damage}` : damage}
                        label={"Damage"}
                        fullWidth
                        onChange={(e) => onChange(Number(e.target.value))}
                        inputProps={{min: min, max: max}}
                        disabled={disabled}
                    />
                </CardContent>
            </Card>
        </GridItem>
    );
};

export default WeaponDamageTextFieldCard;