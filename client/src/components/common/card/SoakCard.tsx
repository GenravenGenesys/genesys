import NumberTextFieldCard from "./NumberTextFieldCard";
import * as React from "react";
import {useLocation} from "react-router";
import type {Armor} from "../../../api/model";

interface Props {
    armor: Armor;
    updateSoak: (soak: number) => void;
}

const SoakCard: React.FC<Props> = ({armor, updateSoak}) => {
    return <NumberTextFieldCard title={"Soak"} value={armor.soak}
                                disabled={useLocation().pathname.endsWith('/view')} onChange={updateSoak} min={0}
                                max={5}/>;
};

export default SoakCard;
