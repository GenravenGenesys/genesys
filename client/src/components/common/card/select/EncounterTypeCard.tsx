import { Card, CardContent, MenuItem, Select } from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import { Type } from "../../../../models/campaign/encounter/Encounter";
import GridItem from "../../grid/GridItem";

interface Props {
    value: Type;
    onChange: (field: string, value: Type) => void;
};

const EncounterTypeCard: React.FC<Props> = ({ value, onChange }) => {
    return (
        <GridItem>
            <Card>
                <CenteredCardHeader title="Encounter Type" />
                <CardContent>
                    <Select
                        value={value}
                        onChange={(e) => onChange('type', e.target.value as Type)}
                        fullWidth
                        label="Encounter Type"
                    >
                        {Object.values(Type).map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </CardContent>
            </Card>
        </GridItem>
    );
};

export default EncounterTypeCard;
