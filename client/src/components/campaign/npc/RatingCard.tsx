import * as React from "react";
import { RatingType } from "../../../models/actor/npc/NonPlayerActor";
import NumberTextFieldCard from "../../common/card/NumberTextFieldCard";

interface Props {
    type: RatingType;
    value: number;
    onChange: (value: number, type: RatingType) => void;
    disabled: boolean;
}

const RatingCard: React.FC<Props> = ({ type, value, onChange, disabled }) => {

    const onRatingChange = (value: number) => {
        onChange(value, type);
    };

    return <NumberTextFieldCard title={type} value={value} onChange={onRatingChange} min={1} max={20} disabled={disabled} />;
};

export default RatingCard;