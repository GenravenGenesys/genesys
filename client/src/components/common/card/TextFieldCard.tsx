import * as React from "react";
import {Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "./header/CenteredCardHeader";
import GenesysTextField from "../GenesysTextField";
import ViewFieldCard from "../ViewFieldCard";

interface Props {
    title: string;
    value: string;
    disabled: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldCard: React.FC<Props> = ({title, value, disabled, onChange})=> {
    return disabled ? <ViewFieldCard name={"Description"} value={value}/> :
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={title}/>
                <CardContent>
                    <GenesysTextField text={value} label={title} disabled={disabled} onChange={onChange}/>
                </CardContent>
            </Card>
        </Grid>
};

export default TextFieldCard;