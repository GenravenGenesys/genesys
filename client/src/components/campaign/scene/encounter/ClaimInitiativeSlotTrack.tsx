import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import InitiativeSlot from "../../../../models/campaign/encounter/InitiativeSlot";
import {Fragment} from "react";
import * as React from "react";
import InitiativeSlotCard from "./InitiativeSlotCard";

interface Props {
    npcs: SingleNonPlayerCharacter[];
    slots: InitiativeSlot[];
    updateSlots: (updatedSlots: InitiativeSlot[]) => void;
}

const ClaimInitiativeSlotTrack: React.FC<Props> = ({npcs, slots, updateSlots}) => {
    
    
    return (
        <Fragment>
            {slots.map((slot) => (
                <InitiativeSlotCard slot={slot}/>
            ))}
        </Fragment>
    )
};

export default ClaimInitiativeSlotTrack;