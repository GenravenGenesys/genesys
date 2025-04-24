import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "./header/CenteredCardHeader";
import * as React from "react";
import ViewFieldCard from "../ViewFieldCard";
import GridItem from "../grid/GridItem";

type Props = {
    title: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    disabled: boolean;
    steps?: number;
}

const NumberTextFieldCard: React.FC<Props> = ({title, value, onChange, min, max, disabled, steps}) => {
    return disabled ? <ViewFieldCard name={title} value={String(value)}/> :
        <GridItem>
            <Card>
                <CenteredCardHeader title={title}/>
                <CardContent>
                    <NumberTextFieldCard title={title} value={value} onChange={onChange} min={min} max={max}
                                         disabled={disabled} steps={steps}/>
                </CardContent>
            </Card>
        </GridItem>;
};

export default NumberTextFieldCard;