import { Button, Card, CardContent } from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import * as React from "react";
import { Fragment, useState } from "react";
import InitiativeSlot, { Type } from "../../../../models/campaign/encounter/InitiativeSlot";
import { basicSkillDicePool, characterSkillDicePool } from "../../../../models/roll/dice/DicePool";
import handleDicePoolRoll from "../../../../models/roll/DicePoolRoll";
import { GenesysSymbols } from "../../../../models/roll/GenesysSymbols";
import { convertResultsToString } from "../../../../models/roll/DiceRoll";
import ActorInitiativeCard from "./ActorInitiativeCard";
import GridContainer from "../../../common/grid/GridContainer";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import { ActorSkill } from "../../../../models/actor/Actor";
import Party from "../../../../models/campaign/Party";
import { SingleNonPlayerCharacter } from "../../../../models/actor/npc/NonPlayerActor";
import { PlayerSkill } from "../../../../models/actor/player/Player";
import { useQuery } from "@tanstack/react-query";
import CharacterService from "../../../../services/encounter/CharacterService";
import { getEmptyAction } from "../../../../models/campaign/encounter/Action";

interface Props {
    party: Party;
    enemies: SingleNonPlayerCharacter[]; // <- separate enemy NPCs
    updateSlots: (updatedSlots: InitiativeSlot[]) => void;
}

const InitiativeTrackCard: React.FC<Props> = ({ party, enemies, updateSlots }) => {
    const { players, npcs: partyNpcs } = party;


    const [npcSkills, setNpcSkills] = useState<Record<string, ActorSkill>>({});
    const [pcSkills, setPcSkills] = useState<Record<string, PlayerSkill>>({});
    const [enemySkills, setEnemySkills] = useState<Record<string, ActorSkill>>({});
    const [skills, setSkllls] = useState<Record<string, ActorSkill>>({});
    const [slots, setSlots] = useState<InitiativeSlot[]>([]);

    const { data: partyCharacters, isLoading, isError } = useQuery({
        queryKey: ["partyCharacters", players], // includes players array as dependency
        queryFn: () => CharacterService.convertPlayersToCharacters(players),
        enabled: players.length > 0, // prevent query if no players are passed in
    });

    if (isLoading || !partyCharacters) return <React.Fragment />;
    if (isError) return <div>Failed to convert player data.</div>;


    const initSymbols = (): Record<GenesysSymbols, number> => ({
        [GenesysSymbols.Success]: 0,
        [GenesysSymbols.Advantage]: 0,
        [GenesysSymbols.Triumph]: 0,
        [GenesysSymbols.Failure]: 0,
        [GenesysSymbols.Threat]: 0,
        [GenesysSymbols.Despair]: 0,
        [GenesysSymbols.Blank]: 0,
    });

    const handleSkillChange = (
        id: string,
        skill: ActorSkill,
        // origin: 'pc' | 'npc' | 'enemy'
    ) => {
        setSkllls(prev => ({...prev, [id]: skill}))
        // if (origin === 'npc') {
        //     setNpcSkills(prev => ({ ...prev, [id]: skill }));
        // } else if (origin === 'pc') {
        //     setPcSkills(prev => ({ ...prev, [id]: skill }));
        // } else {
        //     setEnemySkills(prev => ({ ...prev, [id]: skill }));
        // }
    };

    const rollInitiative = () => {
        const allSlots: InitiativeSlot[] = [];

        partyCharacters.forEach(pc => {
            const skill = pcSkills[pc.id];
            if (!skill) return;
            const results = handleDicePoolRoll({
                dice: characterSkillDicePool(pc, skill),
                symbols: initSymbols(),
            });
            allSlots.push({
                type: Type.Party,
                results,
                character: pc,
                action: getEmptyAction(),
                maneuvers: [],
                incidentals: []
            });
        });

        partyNpcs.forEach(npc => {
            const skill = npcSkills[npc.id];
            if (!skill) return;
            const results = handleDicePoolRoll({
                dice: basicSkillDicePool(npc, skill),
                symbols: initSymbols(),
            });
            allSlots.push({
                type: Type.Party,
                results,
                character: { name: npc.name, id: npc.id },
                action: getEmptyAction(),
                maneuvers: [],
                incidentals: []
            });
        });

        enemies.forEach(enemy => {
            const skill = enemySkills[enemy.id];
            if (!skill) return;
            const results = handleDicePoolRoll({
                dice: basicSkillDicePool(enemy, skill),
                symbols: initSymbols(),
            });
            allSlots.push({
                type: Type.NPC,
                results,
                character: { name: enemy.name, id: enemy.id },
                action: getEmptyAction(),
                maneuvers: [],
                incidentals: []
            });
        });

        const sorted = allSlots.sort((a, b) => {
            const diff = b.results[GenesysSymbols.Success] - a.results[GenesysSymbols.Success];
            return diff !== 0
                ? diff
                : b.results[GenesysSymbols.Advantage] - a.results[GenesysSymbols.Advantage];
        });

        setSlots(sorted);
    };

    const areSkillsMissing = () =>
        players.some(pc => !pcSkills[pc.id]) ||
        partyNpcs.some(npc => !npcSkills[npc.id]) ||
        enemies.some(enemy => !enemySkills[enemy.id]);

    const renderTrack = () => {
        if (slots.length) {
            return (
                <>
                    {slots.map(slot => (
                        <Card key={slot.character.id}>
                            <CenteredCardHeader title={slot.character.name} />
                            <CardContent>
                                <GenesysDescriptionTypography
                                    text={convertResultsToString(slot.results)}
                                />
                            </CardContent>
                        </Card>
                    ))}
                </>
            );
        }

        return (
            <>
                {partyCharacters.map(pc => (
                    <ActorInitiativeCard
                        key={pc.id}
                        name={pc.name}
                        character={pc}
                        onChange={skill => handleSkillChange(pc.id, skill)}
                    />
                ))}
                {partyNpcs.map(npc => (
                    <ActorInitiativeCard
                        key={npc.id}
                        name={npc.name}
                        character={npc}
                        onChange={skill => handleSkillChange(npc.id, skill)}
                    />
                ))}
                {enemies.map(enemy => (
                    <ActorInitiativeCard
                        key={enemy.id}
                        name={enemy.name}
                        character={enemy}
                        onChange={skill => handleSkillChange(enemy.id, skill)}
                    />
                ))}
            </>
        );
    };

    return (
        <Card>
            <CenteredCardHeader title="Initiative" />
            <CardContent>
                <GridContainer centered>{renderTrack()}</GridContainer>
                <GridContainer centered>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={slots.length === 0 ? rollInitiative : () => updateSlots(slots)}
                        disabled={slots.length === 0 && areSkillsMissing()}
                    >
                        {slots.length === 0 ? 'Roll Initiative' : 'Claim Initiative Slots'}
                    </Button>
                </GridContainer>
            </CardContent>
        </Card>
    );
};

export default InitiativeTrackCard;
