import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import InitiativeSlot from "../../../../models/campaign/encounter/InitiativeSlot";
import {Fragment} from "react";
import * as React from "react";
import InitiativeSlotCard from "./InitiativeSlotCard";
import Character from "../../../../models/campaign/encounter/Character";

interface Props {
    npcs: SingleNonPlayerCharacter[];
    slots: InitiativeSlot[];
    updateInitiativeSlots: (updatedSlots: InitiativeSlot[]) => void;
}

const ClaimInitiativeSlotTrack: React.FC<Props> = ({npcs, slots, updateInitiativeSlots}) => {
    const characters = [
        ...(npcs ? npcs.map(npc => ({...npc, effects: []} as Character)) : [])
    ];

    const updateSlots = (updatedSlot: InitiativeSlot, index: number) => {
        updateInitiativeSlots(slots.map((slot, i) =>
            i === index ? updatedSlot : slot
        ));
    };
    
    return (
        <Fragment>
            {slots.map((slot, index) => (
                <InitiativeSlotCard slot={slot} characters={characters}
                                    updateSlot={updateSlots} index={index} />
            ))}
        </Fragment>
    )
};

export default ClaimInitiativeSlotTrack;