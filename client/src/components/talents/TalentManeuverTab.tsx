import Talent from "../../models/Talent";
import React from "react";
import GridContainer from "../common/grid/GridContainer";

type Props = {
    talent: Talent;
    updateTalent: (talent: Talent) => void;
    disabled: boolean;
};

const TalentManeuverTab: React.FC<Props> = ({talent, updateTalent, disabled}) => {
    return (
        <GridContainer centered>

        </GridContainer>
    );
};

export default TalentManeuverTab;