import * as React from "react";
import ViewFieldCard from "../ViewFieldCard";
import NumberTextFieldCard from "./NumberTextFieldCard";

type Props = {
    price: number;
    restricted: boolean;
    onChange: (value: number) => void;
    min: number;
    max: number;
    disabled: boolean;
};

const PriceTextFieldCard: React.FC<Props> = ({price, restricted, onChange, min, max, disabled}) => {
    return disabled ? <ViewFieldCard name={"Price"} value={restricted ? `${price}(R)` : String(price)}/> :
        <NumberTextFieldCard title={"Price"} value={price} onChange={onChange} min={min} max={max}
                             disabled={disabled}/>;
};

export default PriceTextFieldCard;