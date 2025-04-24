import * as React from "react";
import ViewFieldCard from "../ViewFieldCard";
import NumberTextFieldCard from "./NumberTextFieldCard";

type Props = {
    damage: number;
    brawn: boolean;
    onChange: (value: number) => void;
    min: number;
    max: number;
    disabled: boolean;
};

const WeaponDamageTextFieldCard: React.FC<Props> = ({damage, brawn, onChange, min, max, disabled})=> {
    return disabled ? <ViewFieldCard name={"Damage"} value={brawn ? `Brawn + ${damage}` : String(damage)}/> :
        <NumberTextFieldCard title={"Damage"} value={damage} onChange={onChange} min={min} max={max}
                             disabled={disabled}/>;
};

export default WeaponDamageTextFieldCard;