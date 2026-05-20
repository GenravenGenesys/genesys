import {useState} from "react";
import {
    Container,
    Typography,
    Button,
    Paper,
} from "@mui/material";
import {EncounterSetup} from "./components/EncounterSetup";
import {EncounterActive} from "./components/EncounterActive";
import type {Activation, GenesysSymbolResults, RangeBand, Skill} from "../../../../api/model";

export type EncounterType = "combat" | "social";
export type {RangeBand};

export interface EncounterStatusEffect {
    id: string;
    name: string;
    description: string;
    duration: "permanent" | "end-of-turn" | "end-of-round" | "end-of-encounter";
    appliedRound: number;
    icon?: string;
}

export interface EncounterSkill {
    id: string;
    name: string;
    rank: number;
    /** Value of the linked characteristic */
    characteristic: number;
    /** Whether this skill can be used for initiative */
    initiative: boolean;
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
    statusEffects: EncounterStatusEffect[];
    position?: {
        x: number;
        y: number;
    };
    imageUrl?: string;
    notes?: string;
    weapons?: Weapon[];
    abilities?: EncounterAbility[];
    skills?: Skill[];
}

export interface EncounterInitiativeSlot {
    id: string;
    slotType: "pc" | "npc";
    success: number;
    advantage: number;
    assignedParticipantId: string | null;
    rolledBy: string;
}

export interface Weapon {
    id: string;
    name: string;
    skill: string;
    damage: number;
    critical: number;
    range: RangeBand;
    qualities?: string[];
}

export interface EncounterAbility {
    id: string;
    name: string;
    description: string;
    activation: Activation;
}

export interface EncounterAction {
    id: string;
    name: string;
    description: string;
    category: "combat" | "skill" | "social" | "other";
    requiresDiceRoll?: boolean;
    quickAction?: boolean;
    /** weapon this action represents, if any */
    weapon?: Weapon;
}

export interface EncounterManeuver {
    id: string;
    name: string;
    description: string;
    category: "movement" | "interaction" | "combat" | "other";
}

export type {GenesysSymbolResults};

export interface TurnAction {
    id: string;
    slotId: string;
    round: number;
    participantId: string;
    actionTaken?: {
        actionId: string;
        actionName: string;
        details?: string;
        diceResult?: GenesysSymbolResults;
        advantageSpent?: string[];
        triumphSpent?: string[];
        targetId?: string;
        targetName?: string;
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

export interface EncounterRangeBand {
    participantId: string;
    targetId: string;
    range: RangeBand;
}

export type CoverType = "None" | "Soft" | "Hard";

export interface EncounterLocation {
    id: string;
    name: string;
    cover: CoverType;
    occupantIds: string[];
}

export interface EncounterState {
    id: string;
    name: string;
    type: EncounterType;
    status: "setup" | "active" | "completed";
    currentRound: number;
    currentSlotIndex: number;
    participants: Participant[];
    initiativeSlots: EncounterInitiativeSlot[];
    combatLog: CombatLogEntry[];
    turnActions: TurnAction[];
    rangeBands: EncounterRangeBand[];
    locations: EncounterLocation[];
}

const availableActions: EncounterAction[] = [
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

const availableManeuvers: EncounterManeuver[] = [
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

const availableStatusEffects: Omit<EncounterStatusEffect, "id" | "appliedRound">[] = [
    {
        name: "Aimed",
        description: "Add boost die to next combat check",
        duration: "end-of-turn",
        icon: "",
    },
    {
        name: "Staggered",
        description: "Cannot perform actions, only maneuvers",
        duration: "end-of-turn",
        icon: "",
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
        icon: "",
    },
    {
        name: "Disoriented",
        description: "Add setback die to all checks",
        duration: "end-of-turn",
        icon: "",
    },
    {
        name: "Cover",
        description: "Increase ranged defense",
        duration: "end-of-turn",
        icon: "️",
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
        icon: "",
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
        skills: [
            {id: "kael-cool", name: "Cool", rank: 3, characteristic: 3, initiative: true},
            {id: "kael-vig", name: "Vigilance", rank: 2, characteristic: 2, initiative: true},
        ],
        weapons: [
            {id: "kael-w1", name: "Heavy Blaster Pistol", skill: "Ranged (Light)", damage: 7, critical: 3, range: "Medium", qualities: ["Stun Setting"]},
            {id: "kael-w2", name: "Vibro-knife", skill: "Melee", damage: 4, critical: 3, range: "Engaged", qualities: ["Pierce 2"]},
        ],
        abilities: [
            {id: "kael-a1", name: "Quick Strike", description: "Add boost die when attacking targets that have not acted this round.", activation: "Active (Incidental)" as Activation},
            {id: "kael-a2", name: "Dodge", description: "Suffer strain up to ranks in Dodge, reduce incoming attack damage by the same amount.", activation: "Active (Incidental)" as Activation},
        ],
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
        skills: [
            {id: "mira-cool", name: "Cool", rank: 2, characteristic: 2, initiative: true},
            {id: "mira-vig", name: "Vigilance", rank: 3, characteristic: 3, initiative: true},
        ],
        weapons: [
            {id: "mira-w1", name: "Holdout Blaster", skill: "Ranged (Light)", damage: 5, critical: 4, range: "Short", qualities: ["Stun Setting", "Concealable"]},
            {id: "mira-w2", name: "Throwing Knife", skill: "Ranged (Light)", damage: 3, critical: 3, range: "Short", qualities: ["Limited Ammo 1"]},
        ],
        abilities: [
            {id: "mira-a1", name: "Sneak Attack", description: "Gain bonus Advantage on attack if target is unaware or engaged with ally.", activation: "Active (Incidental)" as Activation},
            {id: "mira-a2", name: "Disengage", description: "Move from engaged to short range as a maneuver without triggering free attacks.", activation: "Active (Maneuver)" as Activation},
        ],
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
        skills: [
            {id: "grax-cool", name: "Cool", rank: 1, characteristic: 2, initiative: true},
            {id: "grax-vig", name: "Vigilance", rank: 2, characteristic: 3, initiative: true},
        ],
        weapons: [
            {id: "grax-w1", name: "Vibro-axe", skill: "Melee", damage: 7, critical: 3, range: "Engaged", qualities: ["Sunder", "Vicious 3"]},
            {id: "grax-w2", name: "Heavy Blaster Rifle", skill: "Ranged (Heavy)", damage: 10, critical: 3, range: "Long", qualities: ["Auto-fire", "Cumbersome 3"]},
        ],
        abilities: [
            {id: "grax-a1", name: "Knockdown", description: "Spend 2 Advantage to knock target prone after a hit.", activation: "Active (Incidental)" as Activation},
            {id: "grax-a2", name: "Brace", description: "Remove up to two setback dice from next check caused by environmental factors.", activation: "Active (Maneuver)" as Activation},
        ],
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
        skills: [
            {id: "st-cool", name: "Cool", rank: 1, characteristic: 2, initiative: true},
            {id: "st-vig", name: "Vigilance", rank: 1, characteristic: 2, initiative: true},
        ],
        weapons: [
            {id: "st-w1", name: "E-11 Blaster Rifle", skill: "Ranged (Heavy)", damage: 9, critical: 3, range: "Medium", qualities: ["Stun Setting"]},
        ],
        abilities: [
            {id: "st-a1", name: "Minion", description: "Operates as part of a minion group.", activation: "Active (Incidental)" as Activation},
        ],
    },
    {
        id: "npc-2",
        name: "Imperial Officer",
        type: "npc",
        wounds: {current: 0, threshold: 10},
        strain: {current: 0, threshold: 10},
        soak: 3,
        statusEffects: [],
        skills: [
            {id: "io-cool", name: "Cool", rank: 3, characteristic: 3, initiative: true},
            {id: "io-vig", name: "Vigilance", rank: 2, characteristic: 2, initiative: true},
        ],
        weapons: [
            {id: "io-w1", name: "Imperial Blaster Pistol", skill: "Ranged (Light)", damage: 6, critical: 3, range: "Medium"},
        ],
        abilities: [
            {id: "io-a1", name: "Commanding Presence", description: "Once per round, spend 2 Advantage from a Discipline or Leadership check to give one ally within short range a free maneuver.", activation: "Active (Incidental)" as Activation},
        ],
    },
    {
        id: "npc-3",
        name: "Elite Guard",
        type: "npc",
        wounds: {current: 0, threshold: 12},
        strain: {current: 0, threshold: 8},
        soak: 4,
        statusEffects: [],
        skills: [
            {id: "eg-cool", name: "Cool", rank: 2, characteristic: 2, initiative: true},
            {id: "eg-vig", name: "Vigilance", rank: 3, characteristic: 3, initiative: true},
        ],
        weapons: [
            {id: "eg-w1", name: "Force Pike", skill: "Melee", damage: 7, critical: 3, range: "Engaged", qualities: ["Stun Setting", "Defensive 1"]},
            {id: "eg-w2", name: "Heavy Blaster Pistol", skill: "Ranged (Light)", damage: 7, critical: 3, range: "Medium"},
        ],
        abilities: [
            {id: "eg-a1", name: "Adversary 1", description: "Upgrade the difficulty of checks targeting this character once.", activation: "Active (Incidental)" as Activation},
            {id: "eg-a2", name: "Parry 2", description: "When hit by melee attack, suffer 3 strain to reduce damage by 4.", activation: "Active (Incidental)" as Activation},
        ],
    },
];

const encounterStateTemplate: EncounterState = {
    id: "enc-1",
    name: "Battle at Echo Ridge",
    type: "combat",
    status: "setup",
    currentRound: 1,
    currentSlotIndex: 0,
    participants: [...mockNPCs, ...mockPlayers],
    initiativeSlots: [],
    combatLog: [],
    turnActions: [],
    rangeBands: [],
    locations: [],
};

function SampleEncounterManager() {
    const [encounter, setEncounter] = useState<EncounterState>(encounterStateTemplate);

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
        slot: Omit<EncounterInitiativeSlot, "id" | "assignedParticipantId">
    ) => {
        const newSlot: EncounterInitiativeSlot = {
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
            status: "completed",
        }));
    };

    const handleAddLocation = (loc: EncounterLocation) => {
        setEncounter((prev) => ({...prev, locations: [...prev.locations, loc]}));
    };

    const handleRemoveLocation = (id: string) => {
        setEncounter((prev) => ({
            ...prev,
            locations: prev.locations.filter((l) => l.id !== id),
            rangeBands: prev.rangeBands.filter(
                (r) => r.participantId !== id && r.targetId !== id
            ),
        }));
    };

    const handleUpdateLocation = (id: string, updates: Partial<EncounterLocation>) => {
        setEncounter((prev) => ({
            ...prev,
            locations: prev.locations.map((l) => l.id === id ? {...l, ...updates} : l),
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
                    onAddParticipant={handleAddParticipant}
                    onRemoveParticipant={handleRemoveParticipant}
                    onAddInitiativeSlot={handleAddInitiativeSlot}
                    onRemoveInitiativeSlot={handleRemoveInitiativeSlot}
                    onUpdateRange={handleUpdateRange}
                    onStartEncounter={handleStartEncounter}
                    locations={encounter.locations}
                    onAddLocation={handleAddLocation}
                    onRemoveLocation={handleRemoveLocation}
                    onUpdateLocation={handleUpdateLocation}
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
                    onUpdateLocation={handleUpdateLocation}
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
