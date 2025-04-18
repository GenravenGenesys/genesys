import {Card, CardContent, FormControl, Grid, MenuItem, Select} from "@mui/material";
import CenteredCardHeader from "./header/CenteredCardHeader";
import * as React from "react";
import ViewFieldCard from "../ViewFieldCard";

interface Props {
    title: string;
    value: boolean;
    disabled: boolean;
    onChange: (value: boolean) => void;
}

const BooleanTextFieldCard: React.FC<Props> = ({title, value, disabled, onChange}) => {
    return disabled ? <ViewFieldCard name={title} value={value ? 'Yes' : 'No'}/> :
        <Grid xs>
            <Card>
                <CenteredCardHeader title={title}/>
                <CardContent>
                    <FormControl fullWidth>
                        <Select
                            value={value ? 'Yes' : 'No'}
                            onChange={(e) => onChange(e.target.value === 'Yes')}
                            label="Ranked"
                            disabled={disabled}
                            variant={"standard"}>
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
        </Grid>;
};

export default BooleanTextFieldCard;