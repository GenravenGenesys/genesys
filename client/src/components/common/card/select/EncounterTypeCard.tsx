import {Card, CardContent, MenuItem, Select} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import {Type} from "../../../../models/campaign/encounter/Encounter";
import GridItem from "../../grid/GridItem";
import GenesysSelectField from "../../field/GenesysSelectField";

type Props = {
    value: Type;
    onChange: (field: string, value: Type) => void;
};

const EncounterTypeCard: React.FC<Props> = ({value, onChange}) => {
    return (
        <GridItem>
            <Card>
                <CenteredCardHeader title="Encounter Type"/>
                <CardContent>
                    <GenesysSelectField value={value} label={"Encounter Type"}
                                        onChange={(type) => onChange('type', type)} options={Type}/>
                </CardContent>
            </Card>
        </GridItem>
    );
};

export default EncounterTypeCard;
