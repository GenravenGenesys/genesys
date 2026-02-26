import type {CampaignEncounter} from "../../../../../api/model";
import {Fragment} from "react";

interface Props {
    encounter: CampaignEncounter,
}

export default function StartEncounterView(props: Props) {
    const {encounter} = props;

    return <Fragment/>
}