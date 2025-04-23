import {Card, CardContent, TextField} from "@mui/material";
import CenteredCardHeader from "./header/CenteredCardHeader";
import * as React from "react";
import {useLocation} from "react-router-dom";
import GridItem from "../grid/GridItem";

type Props = {
    price: number;
    restricted: boolean;
    onChange: (value: number) => void;
    min: number;
    max: number;
    disabled: boolean;
};

const PriceTextFieldCard: React.FC<Props> = ({price, restricted, onChange, min, max, disabled})=> {
    let pathname = useLocation().pathname;

    return (
        <GridItem>
            <Card>
                <CenteredCardHeader title={"Price"}/>
                <CardContent>
                    <TextField
                        type="number"
                        value={restricted && pathname.endsWith('/view') ? `${price}(R)` : price}
                        label={"Price"}
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

export default PriceTextFieldCard;