import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import * as React from "react";
import InitiativeTrackCard from "./InitiativeTrackCard";
import Encounter from "../../../../models/campaign/encounter/Encounter";

interface Props {
    encounter: Encounter
}

const EncounterCard = ({encounter}: Props) => {
    const combinedEnemies = [
        ...encounter.minions.map(minion => ({...minion})),
        ...encounter.rivals.map(rival => ({...rival})),
        ...encounter.nemeses.map(nemesis => ({...nemesis}))
    ];

    return (
        <Card>
            <CenteredCardHeader title={'Encounters'}/>
            <CardContent>
                <InitiativeTrackCard npcs={combinedEnemies}/>
            </CardContent>
        </Card>
    );
}

export default EncounterCard;