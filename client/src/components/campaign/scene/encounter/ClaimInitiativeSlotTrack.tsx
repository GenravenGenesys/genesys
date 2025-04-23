import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import InitiativeSlot from "../../../../models/campaign/encounter/InitiativeSlot";
import {useState} from "react";
import * as React from "react";
import InitiativeSlotCard from "./InitiativeSlotCard";
import Character from "../../../../models/campaign/encounter/Character";
import {Button, Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";

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
        <Card>
            <CenteredCardHeader title={'Claim Initiative Slots'}/>
            <CardContent>
                <Grid container spacing={2}>
                    {slots.map((slot, index) => (
                        <InitiativeSlotCard slot={slot} characters={characters}
                                            updateSlot={updateSlots} index={index}/>
                    ))}
                </Grid>
                <Grid container sx={{
                    justifyContent: 'center'
                }}>
                    <Button color='primary' variant='contained' onClick={resolveClaimOfAllSlots}
                            disabled={slots.every(slot => slot.character === null)}>Start Turn</Button>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ClaimInitiativeSlotTrack;