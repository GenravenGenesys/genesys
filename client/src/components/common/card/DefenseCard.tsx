import {Armor} from "../../../models/equipment/Armor";
import {useLocation} from "react-router-dom";
import NumberTextFieldCard from "./NumberTextFieldCard";
import React from "react";

type Props = {
    armor: Armor;
    updateDefense: (defense: number) => void;
};

const DefenseCard: React.FC<Props> = ({armor, updateDefense}) => {
    return <NumberTextFieldCard title={"Defense"} value={armor.defense}
                             disabled={useLocation().pathname.endsWith('/view')} onChange={updateDefense} min={0}
                             max={4}/>;
};

export default DefenseCard;