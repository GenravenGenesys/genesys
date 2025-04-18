import { Card, CardContent, Grid, MenuItem, Select } from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import { Type } from "../../../../models/campaign/encounter/Encounter";

interface Props {
    value: Type;
    onChange: (field: string, value: Type) => void;
}

const EncounterTypeCard: React.FC<Props> = ({ value, onChange }) => {
    return (
        <Grid xs>
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
        </Grid>
    );
};

export default EncounterTypeCard;
