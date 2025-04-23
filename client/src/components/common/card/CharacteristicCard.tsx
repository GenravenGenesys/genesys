import {CharacteristicType} from "../../../models/actor/Characteristic";
import * as React from "react";
import NumberTextFieldCard from "./NumberTextField";

type Props = {
    type: CharacteristicType;
    value: number;
    handleCharacteristicChange: (type: CharacteristicType, value: number) => void;
    disabled: boolean;
};

const CharacteristicCard: React.FC<Props> = ({type, value, handleCharacteristicChange, disabled}) => {

    const updateCharacteristic = (value: number) => {
        handleCharacteristicChange(type, value);
    };

    return <NumberTextFieldCard title={type} value={value} onChange={updateCharacteristic} min={1} max={5} disabled={disabled}/>;
};

export default CharacteristicCard;