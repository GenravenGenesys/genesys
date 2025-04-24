import * as React from "react";
import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "./header/CenteredCardHeader";
import GenesysTextField from "../GenesysTextField";
import ViewFieldCard from "../ViewFieldCard";
import GridItem from "../grid/GridItem";

type Props = {
    title: string;
    value: string;
    disabled: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextFieldCard: React.FC<Props> = ({title, value, disabled, onChange})=> {
    return disabled ? <ViewFieldCard name={"Description"} value={value}/> :
        <GridItem>
            <Card>
                <CenteredCardHeader title={title}/>
                <CardContent>
                    <GenesysTextField text={value} label={title} disabled={disabled} onChange={onChange}/>
                </CardContent>
            </Card>
        </GridItem>
};

export default TextFieldCard;