import NumberTextFieldCard from "./NumberTextField";
import * as React from "react";
import {Armor} from "../../../models/equipment/Armor";
import {useLocation} from "react-router-dom";

type Props = {
    armor: Armor;
    updateSoak: (soak: number) => void;
};

const SoakCard: React.FC<Props> = ({armor, updateSoak}) => {
    return <NumberTextFieldCard title={"Soak"} value={armor.soak}
                                disabled={useLocation().pathname.endsWith('/view')} onChange={updateSoak} min={0}
                                max={5}/>;
};

export default SoakCard;
