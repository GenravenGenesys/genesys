import {Button, Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import * as React from "react";
import NonPlayerCharacterInitiativeCard from "./NonPlayerCharacterInitiativeCard";
import {ActorSkill} from "../../../../models/actor/Actor";
import {Fragment, useState} from "react";
import {basicSkillDicePool} from "../../../../models/roll/dice/DicePool";
import handleDicePoolRoll from "../../../../models/roll/DicePoolRoll";
import {GenesysSymbols} from "../../../../models/roll/GenesysSymbols";
import InitiativeSlot, {Type} from "../../../../models/campaign/encounter/InitiativeSlot";
import InitiativeSlotCard from "./InitiativeSlotCard";

interface Props {
    npcs: SingleNonPlayerCharacter[]
}

export default function InitiativeTrackCard(props: Props) {
    const {npcs} = props;
    const [nonPlayerCharacterSkills, setNonPlayerCharacterSkills] = useState<ActorSkill[]>([]);
    const [slots, setSlots] = useState<InitiativeSlot[]>([]);

    const handleSkillChange = (index: number, skill: ActorSkill) => {
        setNonPlayerCharacterSkills(prev => ({...prev, [String(index)]: skill}));
    };

    const rollInitiative = () => {
        npcs.forEach((npc, index) => {
            const skill = nonPlayerCharacterSkills[index] as ActorSkill;
            const symbols: Record<GenesysSymbols, number> = {
                [GenesysSymbols.Success]: 0,
                [GenesysSymbols.Advantage]: 0,
                [GenesysSymbols.Triumph]: 0,
                [GenesysSymbols.Failure]: 0,
                [GenesysSymbols.Threat]: 0,
                [GenesysSymbols.Despair]: 0,
                [GenesysSymbols.Blank]: 0,
            };
            let results = handleDicePoolRoll({dice: basicSkillDicePool(npc, skill), symbols});
            const newSlot = {type: Type.NPC, results: results} as InitiativeSlot;
            setSlots(prevSlots => {
                const updatedSlots = [...prevSlots, newSlot];
                return updatedSlots.sort((a, b) => {
                    const successDifference = b.results[GenesysSymbols.Success] - a.results[GenesysSymbols.Success];
                    if (successDifference !== 0) {
                        return successDifference;
                    } else {
                        return b.results[GenesysSymbols.Advantage] - a.results[GenesysSymbols.Advantage];
                    }
                });
            });
        })
    };

    const areAllSkillsSelected = () => {
        if (nonPlayerCharacterSkills.length <= 0) {
            return true;
        }
        for (let skill in nonPlayerCharacterSkills) {
            if (skill === null || skill === undefined) {
                return true;
            }
        }
    };

    const renderInitiativeTrack = () => {
        if (slots.length !== 0) {
            return (
                <Fragment>
                    {slots.map((slot) => (
                        <InitiativeSlotCard slot={slot}/>
                    ))}
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    {npcs.map((npc, index) => (
                        <NonPlayerCharacterInitiativeCard npc={npc} onChange={handleSkillChange} index={index}/>
                    ))}
                </Fragment>

            )
        }
    }

    return (
        <Card>
            <CenteredCardHeader title={'Initiative'}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    {renderInitiativeTrack()}
                </Grid>
                <Grid container justifyContent={'center'}>
                    {slots.length === 0 && <Button color='primary' variant='contained' onClick={rollInitiative}
                                                   disabled={areAllSkillsSelected()}>Roll Initiative</Button>}
                </Grid>
            </CardContent>
        </Card>
    );
}