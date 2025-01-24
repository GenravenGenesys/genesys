import { ViewFieldCard } from "../ViewFieldCard";
import { NumberTextFieldCard } from "./NumberTextField";
import * as React from "react";
import { Armor } from "../../../models/equipment/Armor";
import { useLocation } from "react-router-dom";

interface Props {
    armor: Armor;
    updateSoak: (soak: number) => void;
}

const SoakCard: React.FC<Props> = ({ armor, updateSoak }) => {
    let pathname = useLocation().pathname;

    return pathname.endsWith('/view') ? <ViewFieldCard name={"Soak"} value={'+' + armor.soak} /> :
        <NumberTextFieldCard title={"Soak"} value={armor.soak}
                             disabled={pathname.endsWith('/view')} onChange={updateSoak} min={0} max={5} />;
};

export default SoakCard;
