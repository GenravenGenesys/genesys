import { Card, CardContent, TextField } from "@mui/material";
import CenteredCardHeader from "./header/CenteredCardHeader";
import * as React from "react";
import ViewFieldCard from "../ViewFieldCard";
import GridItem from "../grid/GridItem";
import InlineNumberField from "../InlineNumberField";

type Props = {
    title: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    disabled: boolean;
    steps?: number;
}

const NumberTextFieldCard: React.FC<Props> = ({ title, value, onChange, min, max, disabled, steps }) => {
    return disabled ? <ViewFieldCard name={title} value={String(value)} /> :
        <GridItem>
            <Card>
                <CenteredCardHeader title={title} />
                <CardContent>
                    <InlineNumberField defaultValue={value} onCommit={onChange} min={min} max={max} step={steps}/>
                </CardContent>
            </Card>
        </GridItem>;
};

export default NumberTextFieldCard;