import {Card, CardContent} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import {CharacteristicType} from "../../../../models/actor/Characteristic";
import GridItem from "../../grid/GridItem";
import GenesysSelectField from "../../field/GenesysSelectField";

type Props = {
    value: CharacteristicType;
    onChange: (value: CharacteristicType) => void;
    disabled: boolean;
};

const CharacteristicTypeCard: React.FC<Props> = ({value, onChange, disabled}) => {
    return (
        <GridItem>
            <Card>
                <CenteredCardHeader title={'Characteristic Type'}/>
                <CardContent>
                    <GenesysSelectField value={value} label={'Characteristic Type'} onChange={onChange}
                                        options={CharacteristicType} disabled={disabled}/>
                </CardContent>
            </Card>
        </GridItem>
    );
};

export default CharacteristicTypeCard;