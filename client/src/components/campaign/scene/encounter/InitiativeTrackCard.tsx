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
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import {convertResultsToString} from "../../../../models/roll/DiceRoll";

interface Props {
    npcs: SingleNonPlayerCharacter[];
    updateSlots: (updatedSlots: InitiativeSlot[]) => void;
}

const InitiativeTrackCard: React.FC<Props> = ({npcs, updateSlots}) => {
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
            const newSlot = {type: Type.NPC, results: results, character: {name: npc.name, id: npc.id}} as InitiativeSlot;
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

    const updateInitiativeSlots = () => {
        updateSlots(slots);
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
                        <Card>
                            <CenteredCardHeader title={slot.character.name}/>
                            <CardContent>
                                <GenesysDescriptionTypography text={convertResultsToString(slot.results)}/>
                            </CardContent>
                        </Card>
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
    };

    const renderButtons = () => {
        return slots.length === 0 ? <Button color='primary' variant='contained' onClick={rollInitiative}
                                            disabled={areAllSkillsSelected()}>Roll Initiative</Button> :
            <Button color='primary' variant='contained' onClick={updateInitiativeSlots}>Claim Initiative Slots</Button>
    };

    return (
        <Card>
            <CenteredCardHeader title={'Initiative'}/>
            <CardContent>
                <Grid container sx={{
                    justifyContent: 'center'
                }}>
                    {renderInitiativeTrack()}
                </Grid>
                <Grid container sx={{
                    justifyContent: 'center'
                }}>
                    {renderButtons()}
                </Grid>
            </CardContent>
        </Card>
    );
}

export default InitiativeTrackCard;