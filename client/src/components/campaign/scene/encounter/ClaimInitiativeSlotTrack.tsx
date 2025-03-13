import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import InitiativeSlot from "../../../../models/campaign/encounter/InitiativeSlot";
import {useState} from "react";
import * as React from "react";
import InitiativeSlotCard from "./InitiativeSlotCard";
import Character from "../../../../models/campaign/encounter/Character";
import {Grid} from "@mui/material";

interface Props {
    npcs: SingleNonPlayerCharacter[];
    initialSlots: InitiativeSlot[];
    updateInitiativeSlots: (updatedSlots: InitiativeSlot[]) => void;
}

const ClaimInitiativeSlotTrack: React.FC<Props> = ({npcs, initialSlots, updateInitiativeSlots}) => {
    const [slots, setSlots] = useState(initialSlots);
    const characters = [
        ...(npcs ? npcs.map(npc => ({...npc, effects: []} as Character)) : [])
    ];

    const updateSlots = (updatedSlot: InitiativeSlot, index: number) => {
        setSlots(slots.map((slot, i) =>
            i === index ? updatedSlot : slot
        ));
    };

    const resolveClaimOfAllSlots = () => {
        updateInitiativeSlots(slots);
    };
    
    return (
        <Grid container spacing={2}>
            {slots.map((slot, index) => (
                <InitiativeSlotCard slot={slot} characters={characters}
                                    updateSlot={updateSlots} index={index} />
            ))}
        </Grid>
    )
};

export default ClaimInitiativeSlotTrack;