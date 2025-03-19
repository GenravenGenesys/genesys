import {Card, CardContent, Grid} from "@mui/material";
import GenesysDescriptionTypography from "./typography/GenesysDescriptionTypography";
import * as React from "react";
import CenteredCardHeader from "./card/header/CenteredCardHeader";

interface Props {
    name: string;
    value: string;
}

const ViewFieldCard: React.FC<Props> = ({name, value})=> {
    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={name}/>
                <CardContent>
                    <GenesysDescriptionTypography text={value}/>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ViewFieldCard;