import {Card, CardContent, FormControl, MenuItem, Select} from "@mui/material";
import CenteredCardHeader from "./header/CenteredCardHeader";
import * as React from "react";
import ViewFieldCard from "../ViewFieldCard";
import GridItem from "../grid/GridItem";

type Props = {
    title: string;
    value: boolean;
    disabled: boolean;
    onChange: (value: boolean) => void;
};

const BooleanTextFieldCard: React.FC<Props> = ({title, value, disabled, onChange}) => {
    return disabled ? <ViewFieldCard name={title} value={value ? 'Yes' : 'No'}/> :
        <GridItem>
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
        </GridItem>;
};

export default BooleanTextFieldCard;