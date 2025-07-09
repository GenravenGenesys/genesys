import { Button, Card, CardContent } from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import * as React from "react";
import { useState } from "react";
import InitiativeSlot, { Type } from "../../../../models/campaign/encounter/InitiativeSlot";
import { characterSkillDicePool } from "../../../../models/roll/dice/DicePool";
import handleDicePoolRoll from "../../../../models/roll/DicePoolRoll";
import { GenesysSymbols } from "../../../../models/roll/GenesysSymbols";
import { convertResultsToString } from "../../../../models/roll/DiceRoll";
import GridContainer from "../../../common/grid/GridContainer";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import { ActorSkill } from "../../../../models/actor/Actor";
import Party from "../../../../models/campaign/Party";
import { SingleNonPlayerCharacter } from "../../../../models/actor/npc/NonPlayerActor";
import { useQuery } from "@tanstack/react-query";
import CharacterService from "../../../../services/encounter/CharacterService";
import { getEmptyAction } from "../../../../models/campaign/encounter/Action";
import InitiativeSelectSkillCard from "./InitiativeSelectSkillCard";

interface Props {
    party: Party;
    enemies: SingleNonPlayerCharacter[]; // <- separate enemy NPCs
    updateSlots: (updatedSlots: InitiativeSlot[]) => void;
}

const InitiativeTrackCard: React.FC<Props> = ({ party, enemies, updateSlots }) => {
    const { players, npcs: partyNpcs } = party;
    const [skills, setSkllls] = useState<Record<string, ActorSkill>>({});
    const [slots, setSlots] = useState<InitiativeSlot[]>([]);

    const { data: partyPlayers, isLoading, isError } = useQuery({
        queryKey: ["partyPlayers", players],
        queryFn: () => CharacterService.convertPlayersToCharacters(players),
        enabled: players.length > 0,
    });

    const { data: partyCharacters, isLoading: isAlliesLoading, isError: isAlliesError } = useQuery({
        queryKey: ["partyCharacters", partyNpcs],
        queryFn: () => CharacterService.convertNonPlayerCharacters(partyNpcs),
        enabled: partyNpcs.length > 0,
    });

    const { data: enemyCharacters, isLoading: isEnemyLoading, isError: isEnemyError } = useQuery({
        queryKey: ["enemyCharacters", enemies],
        queryFn: () => CharacterService.convertNonPlayerCharacters(enemies),
        enabled: enemies.length > 0,
    });


    if (isLoading || !partyPlayers || isEnemyLoading || !enemyCharacters || isAlliesLoading || !partyCharacters) return <React.Fragment />;
    if (isError) return <div>Failed to convert player data.</div>;
    if (isAlliesError) return <div>Failed to convert ally data.</div>;
    if (isEnemyError) return <div>Failed to convert enemy data.</div>;


    const initSymbols = (): Record<GenesysSymbols, number> => ({
        [GenesysSymbols.Success]: 0,
        [GenesysSymbols.Advantage]: 0,
        [GenesysSymbols.Triumph]: 0,
        [GenesysSymbols.Failure]: 0,
        [GenesysSymbols.Threat]: 0,
        [GenesysSymbols.Despair]: 0,
        [GenesysSymbols.Blank]: 0,
    });

    const handleSkillChange = (id: string, skill: ActorSkill,) => { setSkllls(prev => ({ ...prev, [id]: skill })) };

    const rollInitiative = () => {
        const allSlots: InitiativeSlot[] = [];

        partyPlayers.forEach(pc => {
            const skill = skills[pc.id];
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

        partyCharacters.forEach(npc => {
            const skill = skills[npc.id];
            if (!skill) return;
            const results = handleDicePoolRoll({
                dice: characterSkillDicePool(npc, skill),
                symbols: initSymbols(),
            });
            allSlots.push({
                type: Type.Party,
                results,
                character: npc,
                action: getEmptyAction(),
                maneuvers: [],
                incidentals: []
            });
        });

        enemyCharacters.forEach(enemy => {
            const skill = skills[enemy.id];
            if (!skill) return;
            const results = handleDicePoolRoll({
                dice: characterSkillDicePool(enemy, skill),
                symbols: initSymbols(),
            });
            allSlots.push({
                type: Type.NPC,
                results,
                character: enemy,
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
        players.some(pc => !skills[pc.id]) ||
        partyNpcs.some(npc => !skills[npc.id]) ||
        enemies.some(enemy => !skills[enemy.id]);

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
                {partyPlayers.map(pc => (
                    <InitiativeSelectSkillCard
                        key={pc.id}
                        character={pc}
                        onChange={skill => handleSkillChange(pc.id, skill)}
                    />
                ))}
                {partyCharacters.map(npc => (
                    <InitiativeSelectSkillCard
                        key={npc.id}
                        character={npc}
                        onChange={skill => handleSkillChange(npc.id, skill)}
                    />
                ))}
                {enemyCharacters.map(enemy => (
                    <InitiativeSelectSkillCard
                        key={enemy.id}
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
