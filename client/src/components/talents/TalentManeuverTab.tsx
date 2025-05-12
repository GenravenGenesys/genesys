import Talent from "../../models/Talent";
import React from "react";
import GridContainer from "../common/grid/GridContainer";
import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../common/card/header/CenteredCardHeader";
import InlineTextField from "../common/InlineTextField";
import Maneuver from "../../models/campaign/encounter/Maneuver";

type Props = {
    talent: Talent;
    updateTalent: (talent: Talent) => void;
    disabled: boolean;
};

const TalentManeuverTab: React.FC<Props> = ({talent, updateTalent, disabled}) => {
    const maneuver = talent.maneuver;

    const updateManeuver = (maneuver: Maneuver) => {
        updateTalent({...talent, maneuver: maneuver});
    };

    return (
        <GridContainer centered>
            <Card sx={{width: 1}}>
                <CenteredCardHeader title={talent.name}/>
                <CardContent>

                </CardContent>
            </Card>
        </GridContainer>
    );
};

export default TalentManeuverTab;