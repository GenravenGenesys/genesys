import {useState} from "react";
import {
    Container,
    Typography,
    Button,
    Paper,
} from "@mui/material";
import {EncounterSetup} from "./components/EncounterSetup";
import {EncounterActive} from "./components/EncounterActive";

export type EncounterType = "combat" | "social";
export type SlotType = "pc" | "npc";
export type RangeType = "engaged" | "short" | "medium" | "long" | "extreme";

export interface StatusEffect {
    id: string;
    name: string;
    description: string;
    duration: "permanent" | "end-of-turn" | "end-of-round" | "end-of-encounter";
    appliedRound: number;
    icon?: string;
}

export interface Participant {
    id: string;
    name: string;
    type: "pc" | "npc";
    wounds: {
        current: number;
        threshold: number;
    };
    strain: {
        current: number;
        threshold: number;
    };
    defenses?: {
        melee: number;
        ranged: number;
    };
    soak?: number;
    statusEffects: StatusEffect[];
    position?: {
        x: number;
        y: number;
    };
    imageUrl?: string;
    notes?: string;
}

export interface InitiativeSlot {
    id: string;
    slotType: SlotType;
    success: number;
    advantage: number;
    assignedParticipantId: string | null;
    rolledBy: string;
}

export interface Action {
    id: string;
    name: string;
    description: string;
    category: "combat" | "skill" | "social" | "other";
    requiresDiceRoll?: boolean;
    quickAction?: boolean;
}

export interface Maneuver {
    id: string;
    name: string;
    description: string;
    category: "movement" | "interaction" | "combat" | "other";
}

export interface DiceResult {
    success: number;
    advantage: number;
    triumph: number;
    failure: number;
    threat: number;
    despair: number;
}

export interface TurnAction {
    id: string;
    slotId: string;
    round: number;
    participantId: string;
    actionTaken?: {
        actionId: string;
        actionName: string;
        details?: string;
        diceResult?: DiceResult;
        advantageSpent?: string[];
        triumphSpent?: string[];
    };
    maneuversTaken: Array<{
        maneuverId: string;
        maneuverName: string;
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

export interface RangeBand {
    participantId: string;
    targetId: string;
    range: RangeType;
}

export interface EncounterState {
    id: string;
    name: string;
    type: EncounterType;
    status: "setup" | "active" | "completed";
    currentRound: number;
    currentSlotIndex: number;
    participants: Participant[];
    initiativeSlots: InitiativeSlot[];
    combatLog: CombatLogEntry[];
    turnActions: TurnAction[];
    rangeBands: RangeBand[];
}

const availableActions: Action[] = [
    // Quick Actions (Combat)
    {
        id: "attack-ranged",
        name: "Ranged Attack",
        description: "Make a ranged combat check",
        category: "combat",
        requiresDiceRoll: true,
        quickAction: true,
    },
    {
        id: "attack-melee",
        name: "Melee Attack",
        description: "Make a melee combat check",
        category: "combat",
        requiresDiceRoll: true,
        quickAction: true,
    },
    {
        id: "attack-brawl",
        name: "Brawl Attack",
        description: "Make an unarmed combat check",
        category: "combat",
        requiresDiceRoll: true,
        quickAction: true,
    },

    // Other Combat Actions
    {
        id: "aim-action",
        name: "Aim (Action)",
        description: "Perform multiple Aim maneuvers as your action",
        category: "combat",
    },
    {
        id: "guard",
        name: "Guard",
        description: "Add setback to attacks against you until your next turn",
        category: "combat",
    },
    {
        id: "assist-action",
        name: "Assist (Action)",
        description: "Help an ally with their next check",
        category: "combat",
    },

    // Quick Actions (Skills)
    {
        id: "perception",
        name: "Perception Check",
        description: "Make a Perception check to notice details",
        category: "skill",
        requiresDiceRoll: true,
        quickAction: true,
    },
    {
        id: "athletics",
        name: "Athletics Check",
        description: "Make an Athletics check",
        category: "skill",
        requiresDiceRoll: true,
        quickAction: true,
    },
    {
        id: "stealth",
        name: "Stealth Check",
        description: "Make a Stealth check to hide",
        category: "skill",
        requiresDiceRoll: true,
        quickAction: true,
    },

    // Other Skill Actions
    {
        id: "skill-check",
        name: "Skill Check",
        description: "Make any skill check",
        category: "skill",
        requiresDiceRoll: true,
    },
    {
        id: "medicine",
        name: "Medicine Check",
        description: "Treat wounds or critical injuries",
        category: "skill",
        requiresDiceRoll: true,
    },
    {
        id: "mechanics",
        name: "Mechanics Check",
        description: "Repair or modify equipment",
        category: "skill",
        requiresDiceRoll: true,
    },

    // Quick Actions (Social)
    {
        id: "charm",
        name: "Charm",
        description: "Make a Charm check",
        category: "social",
        requiresDiceRoll: true,
        quickAction: true,
    },
    {
        id: "coercion",
        name: "Coercion",
        description: "Make a Coercion check",
        category: "social",
        requiresDiceRoll: true,
        quickAction: true,
    },

    // Other Social Actions
    {
        id: "deception",
        name: "Deception",
        description: "Make a Deception check",
        category: "social",
        requiresDiceRoll: true,
    },
    {
        id: "negotiation",
        name: "Negotiation",
        description: "Make a Negotiation check",
        category: "social",
        requiresDiceRoll: true,
    },
    {
        id: "leadership",
        name: "Leadership",
        description: "Make a Leadership check to inspire allies",
        category: "social",
        requiresDiceRoll: true,
    },

    // Other
    {
        id: "activate-ability",
        name: "Activate Ability",
        description: "Use a talent or special ability",
        category: "other",
    },
    {
        id: "custom",
        name: "Custom Action",
        description: "Describe a custom action",
        category: "other",
    },
];

const availableManeuvers: Maneuver[] = [
    // Movement
    {
        id: "move",
        name: "Move",
        description: "Move from short to medium range, or medium to long range",
        category: "movement",
    },
    {
        id: "move-engaged",
        name: "Disengage",
        description: "Move from engaged to short range",
        category: "movement",
    },
    {
        id: "engage",
        name: "Engage",
        description: "Move from short range to engaged",
        category: "movement",
    },

    // Interaction
    {
        id: "interact",
        name: "Interact",
        description: "Open a door, flip a switch, pick up an item",
        category: "interaction",
    },
    {
        id: "draw-weapon",
        name: "Draw/Holster Weapon",
        description: "Ready or stow a weapon or item",
        category: "interaction",
    },

    // Combat
    {
        id: "aim-maneuver",
        name: "Aim",
        description: "Gain boost die on next combat check this turn",
        category: "combat",
    },
    {
        id: "take-cover",
        name: "Take Cover",
        description: "Gain ranged defense from available cover",
        category: "combat",
    },
    {
        id: "mount-dismount",
        name: "Mount/Dismount",
        description: "Get on or off a vehicle or mount",
        category: "combat",
    },
    {
        id: "prepare",
        name: "Prepare Item",
        description: "Ready a specific item for immediate use",
        category: "combat",
    },

    // Other
    {
        id: "recover",
        name: "Recover",
        description: "Catch your breath and recover strain",
        category: "other",
    },
    {
        id: "assist-maneuver",
        name: "Assist (Maneuver)",
        description: "Help an ally as a maneuver",
        category: "other",
    },
    {
        id: "drop-item",
        name: "Drop Item",
        description: "Drop a held item (incidental)",
        category: "other",
    },
    {
        id: "speak",
        name: "Speak/Gesture",
        description: "Communicate with others (incidental)",
        category: "other",
    },
    {
        id: "custom-maneuver",
        name: "Custom Maneuver",
        description: "Describe a custom maneuver",
        category: "other",
    },
];

const availableStatusEffects: Omit<StatusEffect, "id" | "appliedRound">[] = [
    {
        name: "Aimed",
        description: "Add boost die to next combat check",
        duration: "end-of-turn",
        icon: "🎯",
    },
    {
        name: "Staggered",
        description: "Cannot perform actions, only maneuvers",
        duration: "end-of-turn",
        icon: "💫",
    },
    {
        name: "Stunned",
        description: "Cannot perform actions or maneuvers",
        duration: "end-of-turn",
        icon: "⚡",
    },
    {
        name: "Immobilized",
        description: "Cannot perform movement maneuvers",
        duration: "end-of-turn",
        icon: "🔒",
    },
    {
        name: "Disoriented",
        description: "Add setback die to all checks",
        duration: "end-of-turn",
        icon: "😵",
    },
    {
        name: "Cover",
        description: "Increase ranged defense",
        duration: "end-of-turn",
        icon: "🛡️",
    },
    {
        name: "Prone",
        description: "Add setback to ranged attacks, boost to melee defense",
        duration: "permanent",
        icon: "⬇️",
    },
    {
        name: "Engaged",
        description: "In melee range with an enemy",
        duration: "permanent",
        icon: "⚔️",
    },
    {
        name: "Inspired",
        description: "Upgrade ability die once on next check",
        duration: "end-of-turn",
        icon: "⭐",
    },
    {
        name: "Frightened",
        description: "Upgrade difficulty of all checks",
        duration: "end-of-encounter",
        icon: "😱",
    },
];

const mockPlayers: Participant[] = [
    {
        id: "pc-1",
        name: "Kael Starwind",
        type: "pc",
        wounds: {current: 0, threshold: 15},
        strain: {current: 0, threshold: 12},
        defenses: {melee: 1, ranged: 2},
        soak: 4,
        statusEffects: [],
    },
    {
        id: "pc-2",
        name: "Mira Shadowstep",
        type: "pc",
        wounds: {current: 0, threshold: 12},
        strain: {current: 0, threshold: 14},
        defenses: {melee: 0, ranged: 1},
        soak: 3,
        statusEffects: [],
    },
    {
        id: "pc-3",
        name: "Grax the Mighty",
        type: "pc",
        wounds: {current: 0, threshold: 18},
        strain: {current: 0, threshold: 10},
        defenses: {melee: 0, ranged: 0},
        soak: 6,
        statusEffects: [],
    },
];

const mockNPCs: Participant[] = [
    {
        id: "npc-1",
        name: "Stormtrooper",
        type: "npc",
        wounds: {current: 0, threshold: 5},
        strain: {current: 0, threshold: 5},
        soak: 5,
        statusEffects: [],
    },
    {
        id: "npc-2",
        name: "Imperial Officer",
        type: "npc",
        wounds: {current: 0, threshold: 10},
        strain: {current: 0, threshold: 10},
        soak: 3,
        statusEffects: [],
    },
    {
        id: "npc-3",
        name: "Elite Guard",
        type: "npc",
        wounds: {current: 0, threshold: 12},
        strain: {current: 0, threshold: 8},
        soak: 4,
        statusEffects: [],
    },
];

const encounterStateTemplate: EncounterState = {
    id: "enc-1",
    name: "Battle at Echo Ridge",
    type: "combat",
    status: "setup",
    currentRound: 1,
    currentSlotIndex: 0,
    participants: [],
    initiativeSlots: [],
    combatLog: [],
    turnActions: [],
    rangeBands: [],
};

function SampleEncounterManager() {
    const [encounter, setEncounter] = useState<EncounterState>(encounterStateTemplate);

    const handleUpdateEncounter = (updates: Partial<EncounterState>) => {
        setEncounter((prev) => ({...prev, ...updates}));
    };

    const handleAddParticipant = (participant: Participant) => {
        setEncounter((prev) => ({
            ...prev,
            participants: [...prev.participants, participant],
        }));
    };

    const handleRemoveParticipant = (participantId: string) => {
        setEncounter((prev) => ({
            ...prev,
            participants: prev.participants.filter((p) => p.id !== participantId),
            initiativeSlots: prev.initiativeSlots.filter(
                (s) => s.rolledBy !== participantId
            ),
            rangeBands: prev.rangeBands.filter(
                (r) => r.participantId !== participantId && r.targetId !== participantId
            ),
        }));
    };

    const handleUpdateParticipant = (
        participantId: string,
        updates: Partial<Participant>
    ) => {
        setEncounter((prev) => ({
            ...prev,
            participants: prev.participants.map((p) =>
                p.id === participantId ? {...p, ...updates} : p
            ),
        }));
    };

    const handleAddInitiativeSlot = (
        slot: Omit<InitiativeSlot, "id" | "assignedParticipantId">
    ) => {
        const newSlot: InitiativeSlot = {
            ...slot,
            id: `slot-${Date.now()}-${Math.random()}`,
            assignedParticipantId: null,
        };

        setEncounter((prev) => {
            const allSlots = [...prev.initiativeSlots, newSlot].sort((a, b) => {
                if (b.success !== a.success) {
                    return b.success - a.success;
                }
                return b.advantage - a.advantage;
            });

            return {
                ...prev,
                initiativeSlots: allSlots,
            };
        });
    };

    const handleRemoveInitiativeSlot = (slotId: string) => {
        setEncounter((prev) => ({
            ...prev,
            initiativeSlots: prev.initiativeSlots.filter((s) => s.id !== slotId),
        }));
    };

    const handleAssignSlot = (slotId: string, participantId: string | null) => {
        setEncounter((prev) => ({
            ...prev,
            initiativeSlots: prev.initiativeSlots.map((s) =>
                s.id === slotId ? {...s, assignedParticipantId: participantId} : s
            ),
        }));
    };

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

            if (nextIndex >= prev.initiativeSlots.length) {
                // New round - clear slot assignments and clean up end-of-round effects
                return {
                    ...prev,
                    currentRound: prev.currentRound + 1,
                    currentSlotIndex: 0,
                    initiativeSlots: prev.initiativeSlots.map((s) => ({
                        ...s,
                        assignedParticipantId: null,
                    })),
                    participants: prev.participants.map((p) => ({
                        ...p,
                        statusEffects: p.statusEffects.filter(
                            (e) => e.duration !== "end-of-round"
                        ),
                    })),
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

        const participant = encounter.participants.find(
            (p) => p.id === turnAction.participantId
        );
        if (participant) {
            if (turnAction.actionTaken) {
                handleAddLogEntry({
                    round: encounter.currentRound,
                    participantId: participant.id,
                    participantName: participant.name,
                    action: `Action: ${turnAction.actionTaken.actionName}`,
                    details: turnAction.actionTaken.details,
                });
            }

            turnAction.maneuversTaken.forEach((maneuver) => {
                handleAddLogEntry({
                    round: encounter.currentRound,
                    participantId: participant.id,
                    participantName: participant.name,
                    action: `Maneuver: ${maneuver.maneuverName}`,
                    details: maneuver.details,
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
        range: RangeType
    ) => {
        setEncounter((prev) => {
            const existingIndex = prev.rangeBands.findIndex(
                (r) => r.participantId === participantId && r.targetId === targetId
            );

            let newRangeBands: RangeBand[];
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
            status: "completed",
        }));
    };

    const handleReset = () => {
        setEncounter(encounterStateTemplate);
    };

    return (
        <Container maxWidth="xl" sx={{py: 4}}>
            <Typography variant="h3" gutterBottom align="center" sx={{mb: 2}}>
                {encounter.name}
            </Typography>

            {encounter.status === "setup" && (
                <EncounterSetup
                    encounter={encounter}
                    availablePlayers={mockPlayers}
                    availableNPCs={mockNPCs}
                    onUpdateEncounter={handleUpdateEncounter}
                    onAddParticipant={handleAddParticipant}
                    onRemoveParticipant={handleRemoveParticipant}
                    onAddInitiativeSlot={handleAddInitiativeSlot}
                    onRemoveInitiativeSlot={handleRemoveInitiativeSlot}
                    onStartEncounter={handleStartEncounter}
                />
            )}

            {encounter.status === "active" && (
                <EncounterActive
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

export default SampleEncounterManager;
