import {useState} from "react";
import {
    Container,
    Typography,
    Button,
    Paper,
} from "@mui/material";
import {
    ActionType,
    CampaignEncounterStatus,
    Duration,
    InitiativeSlotType,
    RangeBand,
    StatusEffectType,
    Target,
} from "../../../../api/model";
import type {
    Action,
    GenesysSymbolResults,
    InitiativeSlot,
    Maneuver,
    PlayerCharacter,
    AdversaryTemplate,
    StatusEffect,
} from "../../../../api/model";
import {encounterTemplate, type ExtendedCampaignEncounter} from "../../../../models/SampleEncounter.ts";
import TestEncounterBuilder from "./TestEncounterBuilder.tsx";
import TestEncounterSetup from "./TestEncounterSetup.tsx";

// Unified participant type covering both party members and adversaries
export type Participant = PlayerCharacter | AdversaryTemplate;

export interface TurnAction {
    id: string;
    slotId: string;
    round: number;
    participantId: string;
    participantType: InitiativeSlotType;
    actionTaken?: {
        action: Action;
        details?: string;
        diceResult?: GenesysSymbolResults;
        advantageSpent?: string[];
        triumphSpent?: string[];
    };
    maneuversTaken: Array<{
        maneuver: Maneuver;
        details?: string;
    }>;
    strainSpentForManeuver: number;
}

export interface CombatLogEntry {
    id: string;
    round: number;
    timestamp: Date;
    participantId: string;
    participantName: string;
    action: string;
    details?: string;
}

export interface EncounterRangeBand {
    participantId: string;
    targetId: string;
    range: RangeBand;
}

// Predefined actions using the API Action shape — exported for use by child components
export const availableActions: Action[] = [
    // Combat Checks
    {type: ActionType.Combat_Check, opposed: false, target: Target.Any_Enemy, range: RangeBand.Long},
    {type: ActionType.Combat_Check, opposed: false, target: Target.Engaged_Enemy, range: RangeBand.Engaged},
    // Skill Checks
    {type: ActionType.Skill_Check, opposed: false, target: Target.Self},
    {type: ActionType.Skill_Check, opposed: true, target: Target.Any_Enemy},
    // Spell / Talent / Ability
    {type: ActionType.Cast_a_Spell, opposed: false, target: Target.Any_Enemy},
    {type: ActionType.Use_a_Talent, opposed: false, target: Target.Self},
    {type: ActionType.Use_an_ability, opposed: false, target: Target.Self},
    // Additional maneuver as action
    {type: ActionType.Perform_a_Second_Maneuver, opposed: false, target: Target.Self},
];

// Predefined maneuvers using the API Maneuver shape — exported for use by child components
export const availableManeuvers: Maneuver[] = [
    {target: Target.Self, duration: Duration.Next_Turn},
    {target: Target.Self, duration: Duration.Scene},
    {target: Target.Engaged_Ally, duration: Duration.Next_Turn},
    {target: Target.Engaged_Enemy, duration: Duration.Next_Turn},
    {target: Target.Any_Ally, duration: Duration.Next_Turn},
];

// Predefined status effects using the API StatusEffect shape — exported for use by child components
export const availableStatusEffects: StatusEffect[] = [
    {type: StatusEffectType.Disoriented, rounds: 1},
    {type: StatusEffectType.Immobilized, rounds: 1},
    {type: StatusEffectType.Staggered, rounds: 1},
];

function TestEncounter() {
    const [encounter, setEncounter] = useState<ExtendedCampaignEncounter>(encounterTemplate);

    // Returns all participants (players + party NPCs + adversaries) as a unified list
    const getAllParticipants = (): Participant[] => {        return [...encounter.party.players, ...encounter.party.adversaryTemplates, ...encounter.npcIds];
    };

    const handleAddPlayer = (player: PlayerCharacter) => {
        setEncounter((prev) => ({
            ...prev,
            party: {
                ...prev.party,
                players: [...prev.party.players, player],
            },
        }));
    };

    const handleRemovePlayer = (playerId: string) => {
        if (encounter.status === CampaignEncounterStatus.Building) {
            setEncounter((prev) => ({
                ...prev,
                party: {
                    ...prev.party,
                    players: prev.party.players.filter((p) => p.id !== playerId),
                },
            }));
        }
        setEncounter((prev) => ({
            ...prev,
            party: {
                ...prev.party,
                players: prev.party.players.filter((p) => p.id !== playerId),
            },
            initiativeOrder: prev.initiativeOrder.filter(
                (s) => s.playerCharacter?.id !== playerId
            ),
            rangeBands: prev.rangeBands.filter(
                (r) => r.participantId !== playerId && r.targetId !== playerId
            ),
        }));
    };

    const handleRemovePartyNPC = (npcId: string) => {
        if (encounter.status === CampaignEncounterStatus.Building) {
            setEncounter((prev) => ({
                ...prev,
                party: {
                    ...prev.party,
                    adversaryTemplates: prev.party.adversaryTemplates.filter((npc) => npc.id !== npcId),
                },
            }));
        }
    };

    const handleAddNPC = (npc: AdversaryTemplate) => {
        setEncounter((prev) => ({
            ...prev,
            npcIds: [...prev.npcIds, npc],
        }));
    };

    const handleRemoveNPC = (npcId: string) => {
        setEncounter((prev) => ({
            ...prev,
            npcIds: prev.npcIds.filter((n) => n.id !== npcId),
            initiativeOrder: prev.initiativeOrder.filter(
                (s) => s.adversaryTemplate?.id !== npcId
            ),
            rangeBands: prev.rangeBands.filter(
                (r) => r.participantId !== npcId && r.targetId !== npcId
            ),
        }));
    };

    const handleUpdatePlayer = (
        playerId: string,
        updates: Partial<PlayerCharacter>
    ) => {
        setEncounter((prev) => ({
            ...prev,
            party: {
                ...prev.party,
                players: prev.party.players.map((p) =>
                    p.id === playerId ? {...p, ...updates} : p
                ),
            },
        }));
    };

    const handleUpdateNPC = (
        npcId: string,
        updates: Partial<AdversaryTemplate>
    ) => {
        setEncounter((prev) => ({
            ...prev,
            npcIds: prev.npcIds.map((n) =>
                n.id === npcId ? {...n, ...updates} : n
            ),
        }));
    };

    const handleAddInitiativeSlot = (slot: InitiativeSlot) => {
        setEncounter((prev) => {
            const allSlots = [...prev.initiativeOrder, slot].sort((a, b) => {
                if (b.results.success !== a.results.success) {
                    return b.results.success - a.results.success;
                }
                return b.results.advantage - a.results.advantage;
            });

            return {
                ...prev,
                initiativeOrder: allSlots,
            };
        });
    };

    const handleRemoveInitiativeSlot = (slotIndex: number) => {
        setEncounter((prev) => ({
            ...prev,
            initiativeOrder: prev.initiativeOrder.filter((_, idx) => idx !== slotIndex),
        }));
    };

    const handleReadyEncounter = () => {
        setEncounter((prev) => ({
            ...prev,
            status: CampaignEncounterStatus.Ready,
        }));
    }

    const handleStartEncounter = () => {
        setEncounter((prev) => ({
            ...prev,
            status: CampaignEncounterStatus.Active,
            currentRound: 1,
            currentSlotIndex: 0,
        }));
    };

    const handleNextSlot = () => {
        setEncounter((prev) => {
            const nextIndex = prev.currentSlotIndex + 1;

            if (nextIndex >= prev.initiativeOrder.length) {
                // New round
                return {
                    ...prev,
                    currentRound: prev.currentRound + 1,
                    currentSlotIndex: 0,
                };
            }

            return {
                ...prev,
                currentSlotIndex: nextIndex,
            };
        });
    };

    const handlePreviousSlot = () => {
        setEncounter((prev) => {
            if (prev.currentSlotIndex > 0) {
                return {
                    ...prev,
                    currentSlotIndex: prev.currentSlotIndex - 1,
                };
            }
            return prev;
        });
    };

    const handleRecordTurnAction = (turnAction: TurnAction) => {
        setEncounter((prev) => ({
            ...prev,
            turnActions: [...prev.turnActions, turnAction],
        }));

        const participant = getAllParticipants().find(
            (p) => p.id === turnAction.participantId
        );

        if (participant) {
            if (turnAction.actionTaken) {
                handleAddLogEntry({
                    round: encounter.currentRound,
                    participantId: participant.id,
                    participantName: participant.name,
                    action: `Action: ${turnAction.actionTaken.action.type}`,
                    details: turnAction.actionTaken.details,
                });
            }

            turnAction.maneuversTaken.forEach((entry) => {
                handleAddLogEntry({
                    round: encounter.currentRound,
                    participantId: participant.id,
                    participantName: participant.name,
                    action: `Maneuver: target=${entry.maneuver.target}`,
                    details: entry.details,
                });
            });

            if (turnAction.strainSpentForManeuver > 0) {
                handleAddLogEntry({
                    round: encounter.currentRound,
                    participantId: participant.id,
                    participantName: participant.name,
                    action: `Suffered ${turnAction.strainSpentForManeuver} strain for additional maneuver`,
                });
            }
        }
    };

    const handleAddLogEntry = (
        entry: Omit<CombatLogEntry, "id" | "timestamp">
    ) => {
        const newEntry: CombatLogEntry = {
            ...entry,
            id: `log-${Date.now()}`,
            timestamp: new Date(),
        };

        setEncounter((prev) => ({
            ...prev,
            combatLog: [newEntry, ...prev.combatLog],
        }));
    };

    const handleUpdateRange = (
        participantId: string,
        targetId: string,
        range: RangeBand
    ) => {
        setEncounter((prev) => {
            const existingIndex = prev.rangeBands.findIndex(
                (r) => r.participantId === participantId && r.targetId === targetId
            );

            let newRangeBands: EncounterRangeBand[];
            if (existingIndex >= 0) {
                newRangeBands = [...prev.rangeBands];
                newRangeBands[existingIndex] = {participantId, targetId, range};
            } else {
                newRangeBands = [
                    ...prev.rangeBands,
                    {participantId, targetId, range},
                ];
            }

            return {
                ...prev,
                rangeBands: newRangeBands,
            };
        });
    };

    const handleEndEncounter = () => {
        setEncounter((prev) => ({
            ...prev,
            status: CampaignEncounterStatus.Resolved,
        }));
    };

    const handleReset = () => {
        setEncounter(encounterTemplate);
    };

    return (
        <Container maxWidth="xl" sx={{py: 4}}>
            <Typography variant="h3" gutterBottom align="center" sx={{mb: 2}}>
                {encounter.name}
            </Typography>

            <Typography variant="h6" gutterBottom>
                Status: {encounter.status}
            </Typography>

            {encounter.status === CampaignEncounterStatus.Building && (
                <Paper sx={{p: 3, mb: 3}}>
                    <TestEncounterBuilder encounter={encounter} numberOfParticipants={getAllParticipants().length}
                                          onRemovePartyMember={handleRemovePlayer}
                                          onRemovePartyNPC={handleRemovePartyNPC}
                                          onRemoveNPC={handleRemoveNPC} onReadyEncounter={handleReadyEncounter}/>
                </Paper>
            )}

            {encounter.status === CampaignEncounterStatus.Ready && (
                <Paper sx={{p: 3, mb: 3}}>
                    <TestEncounterSetup encounter={encounter} numberOfParticipants={getAllParticipants().length}
                                        onStartEncounter={handleStartEncounter}/>
                </Paper>
            )}

            {encounter.status === CampaignEncounterStatus.Active && (
                <Paper sx={{p: 3}}>
                    <Typography variant="h5" gutterBottom>
                        Round {encounter.currentRound} - Slot {encounter.currentSlotIndex + 1}
                    </Typography>

                    <Typography variant="body1" sx={{mb: 2}}>
                        Current initiative slot
                        type: {encounter.initiativeOrder[encounter.currentSlotIndex]?.type || 'N/A'}
                    </Typography>

                    <Button variant="contained" onClick={handlePreviousSlot} sx={{mr: 1}}>
                        Previous Slot
                    </Button>
                    <Button variant="contained" onClick={handleNextSlot} sx={{mr: 1}}>
                        Next Slot
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleEndEncounter}>
                        End Encounter
                    </Button>

                    <Typography variant="h6" sx={{mt: 3}}>
                        Players in Combat
                    </Typography>
                    {encounter.party.players.map((player) => (
                        <Paper key={player.id} sx={{p: 2, mb: 1}}>
                            <Typography variant="body1">{player.name}</Typography>
                            <Typography variant="body2">
                                Wounds: {player.derivedStats.woundThreshold.current}/{player.derivedStats.woundThreshold.total} |
                                Strain: {player.derivedStats.strainThreshold.current}/{player.derivedStats.strainThreshold.total}
                            </Typography>
                        </Paper>
                    ))}

                    <Typography variant="h6" sx={{mt: 3}}>
                        NPCs in Combat
                    </Typography>
                    {encounter.npcIds.map((npc) => (
                        <Paper key={npc.id} sx={{p: 2, mb: 1}}>
                            <Typography variant="body1">{npc.name}</Typography>
                            <Typography variant="body2">
                                Wounds: {npc.derivedStats.woundThreshold.current}/{npc.derivedStats.woundThreshold.total}
                            </Typography>
                        </Paper>
                    ))}

                    <Typography variant="h6" sx={{mt: 3}}>
                        Combat Log
                    </Typography>
                    {encounter.combatLog.slice(0, 10).map((entry) => (
                        <Paper key={entry.id} sx={{p: 1, mb: 1, bgcolor: 'grey.100'}}>
                            <Typography variant="caption">
                                Round {entry.round}: {entry.participantName} - {entry.action}
                                {entry.details && ` (${entry.details})`}
                            </Typography>
                        </Paper>
                    ))}
                </Paper>
            )}

            {encounter.status === CampaignEncounterStatus.Resolved && (
                <Paper sx={{p: 4, textAlign: "center"}}>
                    <Typography variant="h4" gutterBottom>
                        Encounter Complete!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{mb: 3}}>
                        {encounter.name} has ended after {encounter.currentRound} rounds
                    </Typography>
                </Paper>
            )}
        </Container>
    );
}

export default TestEncounter;
