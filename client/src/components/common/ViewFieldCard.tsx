import { Card, CardContent } from "@mui/material";
import GenesysDescriptionTypography from "./typography/GenesysDescriptionTypography";
import * as React from "react";
import CenteredCardHeader from "./card/header/CenteredCardHeader";
import GridItem from "./grid/GridItem";

type Props = {
    name: string;
    value: string;
}

const ViewFieldCard: React.FC<Props> = ({ name, value }) => {
    return (
        <GridItem>
            <Card>
                <CenteredCardHeader title={name} />
                <CardContent>
                    <GenesysDescriptionTypography text={value} />
                </CardContent>
            </Card>
        </GridItem>
    );
};

export default ViewFieldCard;