import {Card, CardContent, MenuItem, Select} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import {CharacteristicType} from "../../../../models/actor/Characteristic";
import GridItem from "../../grid/GridItem";

type Props = {
    value: CharacteristicType;
    onChange: (value: CharacteristicType) => void;
    disabled: boolean;
};

const CharacteristicTypeCard: React.FC<Props> = ({value, onChange, disabled})=> {
    return (
        <GridItem>
            <Card>
                <CenteredCardHeader title={'Characteristic Type'}/>
                <CardContent>
                    <Select
                        value={value}
                        onChange={(e) => onChange(e.target.value as CharacteristicType)}
                        disabled={disabled}
                        fullWidth
                        label={'Characteristic Type'}
                        variant={"standard"}
                    >
                        {Object.values(CharacteristicType).map(option => (
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

export default CharacteristicTypeCard;