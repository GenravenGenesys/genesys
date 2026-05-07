import {useState} from "react";
import {Container, Typography, Button, Paper} from "@mui/material";
import {InitiativeSlotType, StatusEffectType} from "../../../../api/model";
import type {
    GenesysSymbolResults,
    RangeBand,
    StatusEffectType as StatusEffectTypeValue,
} from "../../../../api/model";
import type {
    Participant,
    TurnAction,
    CombatLogEntry,
    EncounterRangeBand,
} from "../test/TestEncounter.tsx";
import {
    availableActions,
    availableManeuvers,
    availableStatusEffects,
} from "../test/TestEncounter.tsx";
import {encounterTemplate} from "../../../../models/SampleEncounter.ts";
import {EncounterSetup2} from "./components/EncounterSetup2.tsx";
import {EncounterActive2} from "./components/EncounterActive2.tsx";

// ── Runtime status effect (API StatusEffect enriched with encounter metadata) ──
export interface ActiveStatusEffect {
    id: string;
    type: StatusEffectTypeValue;
    rounds: number;
    appliedRound: number;
}

// ── Participant wrapper that holds runtime combat state ──────────────────────
export interface EncounterParticipant {
    data: Participant;
    participantType: InitiativeSlotType;
    woundsCurrent: number;
    strainCurrent: number;
    activeStatusEffects: ActiveStatusEffect[];
}

// ── Initiative slot (extends API concept with UI assignment field) ───────────
export interface EncounterSlot {
    id: string;
    type: InitiativeSlotType;
    results: GenesysSymbolResults;
    rolledBy: string; // EncounterParticipant.data.id
    assignedParticipantId: string | null;
}

// ── Full encounter runtime state ─────────────────────────────────────────────
export interface EncounterState2 {
    name: string;
    status: "setup" | "active" | "completed";
    currentRound: number;
    currentSlotIndex: number;
    participants: EncounterParticipant[];
    slots: EncounterSlot[];
    combatLog: CombatLogEntry[];
    turnActions: TurnAction[];
    rangeBands: EncounterRangeBand[];
}

// Helpers to resolve display names from API types
export const getParticipantLabel = (ep: EncounterParticipant): string =>
    ep.participantType === InitiativeSlotType.Player ? "Player" : "NPC";

export const isDefeated = (ep: EncounterParticipant): boolean =>
    ep.woundsCurrent >= ep.data.derivedStats.woundThreshold.total;

// Build initial participants from the SampleEncounter template
const buildParticipants = (): EncounterParticipant[] => [
    ...encounterTemplate.party.players.map((p) => ({
        data: p as Participant,
        participantType: InitiativeSlotType.Player,
        woundsCurrent: p.derivedStats.woundThreshold.current,
        strainCurrent: p.derivedStats.strainThreshold.current,
        activeStatusEffects: [],
    })),
    ...encounterTemplate.party.adversaryTemplates.map((p) => ({
        data: p as Participant,
        participantType: InitiativeSlotType.Player,
        woundsCurrent: p.derivedStats.woundThreshold.current,
        strainCurrent: p.derivedStats.strainThreshold.current,
        activeStatusEffects: [],
    })),
    ...encounterTemplate.npcIds.map((p) => ({
        data: p as Participant,
        participantType: InitiativeSlotType.NPC,
        woundsCurrent: p.derivedStats.woundThreshold.current,
        strainCurrent: p.derivedStats.strainThreshold.current,
        activeStatusEffects: [],
    })),
];

const initialState: EncounterState2 = {
    name: encounterTemplate.name,
    status: "setup",
    currentRound: 1,
    currentSlotIndex: 0,
    participants: buildParticipants(),
    slots: [],
    combatLog: [],
    turnActions: [],
    rangeBands: [],
};

// ── Status-effect display metadata ──────────────────────────────────────────
export const STATUS_EFFECT_META: Record<
    StatusEffectTypeValue,
    {label: string; icon: string; description: string}
> = {
    [StatusEffectType.Disoriented]: {
        label: "Disoriented",
        icon: "😵",
        description: "Add setback die to all checks",
    },
    [StatusEffectType.Immobilized]: {
        label: "Immobilized",
        icon: "🔒",
        description: "Cannot perform movement maneuvers",
    },
    [StatusEffectType.Staggered]: {
        label: "Staggered",
        icon: "💫",
        description: "Cannot perform actions, only maneuvers",
    },
};

// ── Root component ────────────────────────────────────────────────────────────
function EncounterManager2() {
    const [encounter, setEncounter] = useState<EncounterState2>(initialState);

    // ── Participant helpers ──────────────────────────────────────────────────
    const handleUpdateParticipant = (
        participantId: string,
        updates: Partial<EncounterParticipant>
    ) => {
        setEncounter((prev) => ({
            ...prev,
            participants: prev.participants.map((ep) =>
                ep.data.id === participantId ? {...ep, ...updates} : ep
            ),
        }));
    };

    const handleRemoveParticipant = (participantId: string) => {
        setEncounter((prev) => ({
            ...prev,
            participants: prev.participants.filter((ep) => ep.data.id !== participantId),
            slots: prev.slots.filter((s) => s.rolledBy !== participantId),
            rangeBands: prev.rangeBands.filter(
                (r) => r.participantId !== participantId && r.targetId !== participantId
            ),
        }));
    };

    // ── Initiative slot helpers ──────────────────────────────────────────────
    const handleAddSlot = (slot: Omit<EncounterSlot, "id" | "assignedParticipantId">) => {
        const newSlot: EncounterSlot = {
            ...slot,
            id: `slot-${Date.now()}-${Math.random()}`,
            assignedParticipantId: null,
        };

        setEncounter((prev) => {
            const sorted = [...prev.slots, newSlot].sort((a, b) => {
                if (b.results.success !== a.results.success)
                    return b.results.success - a.results.success;
                return b.results.advantage - a.results.advantage;
            });
            return {...prev, slots: sorted};
        });
    };

    const handleRemoveSlot = (slotId: string) => {
        setEncounter((prev) => ({
            ...prev,
            slots: prev.slots.filter((s) => s.id !== slotId),
        }));
    };

    const handleAssignSlot = (slotId: string, participantId: string | null) => {
        setEncounter((prev) => ({
            ...prev,
            slots: prev.slots.map((s) =>
                s.id === slotId ? {...s, assignedParticipantId: participantId} : s
            ),
        }));
    };

    // ── Encounter flow ───────────────────────────────────────────────────────
    const handleStartEncounter = () => {
        setEncounter((prev) => ({
            ...prev,
            status: "active",
            currentRound: 1,
            currentSlotIndex: 0,
        }));
    };

    const handleNextSlot = () => {
        setEncounter((prev) => {
            const nextIndex = prev.currentSlotIndex + 1;

            if (nextIndex >= prev.slots.length) {
                // New round: clear assignments and expire end-of-round effects
                return {
                    ...prev,
                    currentRound: prev.currentRound + 1,
                    currentSlotIndex: 0,
                    slots: prev.slots.map((s) => ({...s, assignedParticipantId: null})),
                };
            }

            return {...prev, currentSlotIndex: nextIndex};
        });
    };

    const handlePreviousSlot = () => {
        setEncounter((prev) => {
            if (prev.currentSlotIndex > 0)
                return {...prev, currentSlotIndex: prev.currentSlotIndex - 1};
            return prev;
        });
    };

    // ── Turn tracking ────────────────────────────────────────────────────────
    const handleRecordTurnAction = (turnAction: TurnAction) => {
        setEncounter((prev) => ({
            ...prev,
            turnActions: [...prev.turnActions, turnAction],
        }));
    };

    const handleAddLogEntry = (entry: Omit<CombatLogEntry, "id" | "timestamp">) => {
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

    // ── Range bands ──────────────────────────────────────────────────────────
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
                newRangeBands = [...prev.rangeBands, {participantId, targetId, range}];
            }
            return {...prev, rangeBands: newRangeBands};
        });
    };

    // ── End / reset ──────────────────────────────────────────────────────────
    const handleEndEncounter = () => {
        setEncounter((prev) => ({...prev, status: "completed"}));
    };

    const handleReset = () => setEncounter(initialState);

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <Container maxWidth="xl" sx={{py: 4}}>
            <Typography variant="h3" gutterBottom align="center" sx={{mb: 2}}>
                {encounter.name}
            </Typography>

            {encounter.status === "setup" && (
                <EncounterSetup2
                    encounter={encounter}
                    onRemoveParticipant={handleRemoveParticipant}
                    onAddSlot={handleAddSlot}
                    onRemoveSlot={handleRemoveSlot}
                    onStartEncounter={handleStartEncounter}
                />
            )}

            {encounter.status === "active" && (
                <EncounterActive2
                    encounter={encounter}
                    availableActions={availableActions}
                    availableManeuvers={availableManeuvers}
                    availableStatusEffects={availableStatusEffects}
                    onUpdateParticipant={handleUpdateParticipant}
                    onAssignSlot={handleAssignSlot}
                    onRecordTurnAction={handleRecordTurnAction}
                    onUpdateRange={handleUpdateRange}
                    onNextSlot={handleNextSlot}
                    onPreviousSlot={handlePreviousSlot}
                    onAddLogEntry={handleAddLogEntry}
                    onEndEncounter={handleEndEncounter}
                />
            )}

            {encounter.status === "completed" && (
                <Paper sx={{p: 4, textAlign: "center"}}>
                    <Typography variant="h4" gutterBottom>
                        Encounter Complete!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{mb: 3}}>
                        {encounter.name} has ended after {encounter.currentRound} rounds
                    </Typography>
                    <Button variant="contained" onClick={handleReset} size="large">
                        Start New Encounter
                    </Button>
                </Paper>
            )}
        </Container>
    );
}

export default EncounterManager2;


