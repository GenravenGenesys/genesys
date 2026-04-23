import {useState} from "react";
import {
    Container,
    Typography,
    Button,
    Paper, Alert, Grid, Card, CardContent, Box, Chip, IconButton, ToggleButtonGroup, ToggleButton,
    Drawer, List, ListItem, ListItemText, Divider, FormControl, InputLabel, Select, MenuItem,
} from "@mui/material";
import {
    CampaignEncounterStatus,
    InitiativeSlotType,
} from "../../../../api/model";
import type {
    CampaignEncounter,
    InitiativeSlot,
    GenesysSymbolResults,
    RangeBand as RangeBandEnum,
    PlayerCharacter,
    AdversaryTemplate,
    ItemTemplate,
} from "../../../../api/model";
import CasinoIcon from "@mui/icons-material/Casino";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import StopIcon from "@mui/icons-material/Stop";
import HistoryIcon from "@mui/icons-material/History";
import {encounterTemplate, type ExtendedCampaignEncounter} from "../../../../models/SampleEncounter.ts";
import TestEncounterBuilder from "./TestEncounterBuilder.tsx";
import TestEncounterSetup from "./TestEncounterSetup.tsx";
import {TurnActions} from "../encounter/components/TurnActions.tsx";
import type {
    Participant,
    Weapon,
    Action as SampleAction,
    Maneuver as SampleManeuver,
    TurnAction as SampleTurnAction,
} from "../encounter/SampleEncounterManager.tsx";
import type {RangeType} from "../encounter/SampleEncounterManager.tsx";

// UI-specific types
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

export interface TurnAction {
    id: string;
    slotId: string;
    round: number;
    participantId: string;
    participantType: InitiativeSlotType;
    actionTaken?: {
        actionId: string;
        actionName: string;
        details?: string;
        diceResult?: GenesysSymbolResults;
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

export interface EncounterRangeBand {
    participantId: string;
    targetId: string;
    range: RangeBandEnum;
}

export type CoverType = "None" | "Soft" | "Hard";

export interface EncounterLocation {
    id: string;
    name: string;
    cover: CoverType;
    occupantIds: string[];
}

export interface StatusEffect {
    id: string;
    name: string;
    description: string;
    duration: "permanent" | "end-of-turn" | "end-of-round" | "end-of-encounter";
    appliedRound: number;
    icon?: string;
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

/** Convert an ItemTemplate weapon to the Participant.Weapon shape used by TurnActions. */
function itemToWeapon(item: ItemTemplate): Weapon {
    return {
        id: item.id,
        name: item.name,
        skill: item.weaponStats?.skill?.name ?? "Unknown",
        damage: item.weaponStats?.damage ?? 0,
        critical: item.weaponStats?.critical ?? 4,
        range: (item.weaponStats?.range?.toLowerCase() ?? "short") as RangeType,
        qualities: item.qualities?.map((q) => q.name) ?? [],
    };
}

/** Convert a PlayerCharacter or AdversaryTemplate to the Participant shape TurnActions needs. */
function toParticipant(
    entity: PlayerCharacter | AdversaryTemplate,
    type: "pc" | "npc"
): Participant {
    return {
        id: entity.id,
        name: entity.name,
        type,
        wounds: {
            current: entity.derivedStats.woundThreshold.current,
            threshold: entity.derivedStats.woundThreshold.total,
        },
        strain: {
            current: entity.derivedStats.strainThreshold?.current ?? 0,
            threshold: entity.derivedStats.strainThreshold?.total ?? 0,
        },
        soak: entity.derivedStats.soak?.current,
        statusEffects: [],
        weapons: entity.equipment?.weapons?.map(itemToWeapon) ?? [],
        abilities: [],
    };
}

const sharedActions: SampleAction[] = availableActions.map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description,
    category: a.category,
    requiresDiceRoll: a.requiresDiceRoll,
    quickAction: a.quickAction,
}));

const sharedManeuvers: SampleManeuver[] = availableManeuvers.map((m) => ({
    id: m.id,
    name: m.name,
    description: m.description,
    category: m.category,
}));

function TestEncounter() {
    const [encounter, setEncounter] = useState<ExtendedCampaignEncounter>(encounterTemplate);
    const [logDrawerOpen, setLogDrawerOpen] = useState(false);

    // Helper function to get all participants (players + NPCs) from the encounter
    const getAllParticipants = (): Array<PlayerCharacter | AdversaryTemplate> => {
        return [...encounter.party.players, ...encounter.party.adversaryTemplates, ...encounter.npcIds];
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
            // Replace existing slot for same participant (re-roll support)
            const filtered = prev.initiativeOrder.filter((s) => s.rolledBy !== slot.rolledBy);
            const allSlots = [...filtered, slot].sort((a, b) => {
                const aSuccess = (a.results?.success ?? 0) + (a.results?.triumph ?? 0)
                    - (a.results?.failure ?? 0) - (a.results?.despair ?? 0);
                const bSuccess = (b.results?.success ?? 0) + (b.results?.triumph ?? 0)
                    - (b.results?.failure ?? 0) - (b.results?.despair ?? 0);
                if (bSuccess !== aSuccess) return bSuccess - aSuccess;
                const aAdv = (a.results?.advantage ?? 0) - (a.results?.threat ?? 0);
                const bAdv = (b.results?.advantage ?? 0) - (b.results?.threat ?? 0);
                return bAdv - aAdv;
            });
            return {...prev, initiativeOrder: allSlots};
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
                // New round - clear slot assignments and clean up end-of-round effects
                return {
                    ...prev,
                    currentRound: prev.currentRound + 1,
                    currentSlotIndex: 0,
                    // TODO: Clear end-of-round status effects from players and NPCs
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

    const handleRecordTurnAction = (turnAction: SampleTurnAction) => {
        setEncounter((prev) => {
            let next = {...prev, turnActions: [...prev.turnActions, turnAction as any]};

            // Apply strain cost for second maneuver
            if (turnAction.strainSpentForManeuver > 0) {
                const isPlayer = prev.party.players.some((p) => p.id === turnAction.participantId);
                if (isPlayer) {
                    next = {
                        ...next,
                        party: {
                            ...next.party,
                            players: next.party.players.map((p) =>
                                p.id === turnAction.participantId
                                    ? {
                                        ...p,
                                        derivedStats: {
                                            ...p.derivedStats,
                                            strainThreshold: {
                                                ...p.derivedStats.strainThreshold,
                                                current: Math.min(
                                                    p.derivedStats.strainThreshold.total,
                                                    p.derivedStats.strainThreshold.current + turnAction.strainSpentForManeuver
                                                ),
                                            },
                                        },
                                    }
                                    : p
                            ),
                        },
                    };
                } else {
                    next = {
                        ...next,
                        npcIds: next.npcIds.map((n) =>
                            n.id === turnAction.participantId
                                ? {
                                    ...n,
                                    derivedStats: {
                                        ...n.derivedStats,
                                        strainThreshold: {
                                            current: Math.min(
                                                n.derivedStats.strainThreshold?.total ?? 0,
                                                (n.derivedStats.strainThreshold?.current ?? 0) + turnAction.strainSpentForManeuver
                                            ),
                                            total: n.derivedStats.strainThreshold?.total ?? 0,
                                        },
                                    },
                                }
                                : n
                        ),
                    };
                }
            }

            return next;
        });

        // Find participant by ID from either players or NPCs
        const participant = getAllParticipants().find(
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
        range: RangeBandEnum
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

    const handleAddLocation = (loc: EncounterLocation) => {
        setEncounter((prev) => ({...prev, locations: [...(prev.locations ?? []), loc]}));
    };

    const handleRemoveLocation = (id: string) => {
        setEncounter((prev) => ({
            ...prev,
            locations: (prev.locations ?? []).filter((l) => l.id !== id),
            rangeBands: prev.rangeBands.filter((r) => r.participantId !== id && r.targetId !== id),
        }));
    };

    const handleUpdateLocation = (id: string, updates: Partial<EncounterLocation>) => {
        setEncounter((prev) => ({
            ...prev,
            locations: (prev.locations ?? []).map((l) => l.id === id ? {...l, ...updates} : l),
        }));
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
                                          onRemoveNPC={handleRemoveNPC} onReadyEncounter={handleReadyEncounter}
                                          locations={encounter.locations ?? []}
                                          onAddLocation={handleAddLocation}
                                          onRemoveLocation={handleRemoveLocation}
                                          onUpdateLocation={handleUpdateLocation}/>
                </Paper>
            )}

            {encounter.status === CampaignEncounterStatus.Ready && (
                <Paper sx={{p: 3, mb: 3}}>
                    <TestEncounterSetup encounter={encounter} numberOfParticipants={getAllParticipants().length}
                                        rangeBands={encounter.rangeBands}
                                        locations={encounter.locations ?? []}
                                        onAddInitiativeSlot={handleAddInitiativeSlot}
                                        onRemoveInitiativeSlot={handleRemoveInitiativeSlot}
                                        onUpdateRange={handleUpdateRange}
                                        onStartEncounter={handleStartEncounter}/>
                </Paper>
            )}

            {encounter.status === CampaignEncounterStatus.Active && (() => {
                const currentSlot = encounter.initiativeOrder[encounter.currentSlotIndex];
                const isLastSlot = encounter.currentSlotIndex === encounter.initiativeOrder.length - 1;
                let currentParticipant: Participant | null = null;
                if (currentSlot) {
                    if (currentSlot.type === InitiativeSlotType.Player && currentSlot.playerCharacter) {
                        currentParticipant = toParticipant(currentSlot.playerCharacter, "pc");
                    } else if (currentSlot.type === InitiativeSlotType.NPC && currentSlot.adversaryTemplate) {
                        currentParticipant = toParticipant(currentSlot.adversaryTemplate, "npc");
                    }
                }

                const handleCompleteTurn = (turnAction: SampleTurnAction) => {
                    handleRecordTurnAction(turnAction);
                    handleNextSlot();
                };

                return (
                    <Paper sx={{p: 3}}>
                        {/* Header */}
                        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 3}}>
                            <Typography variant="h5" fontWeight="bold">{encounter.name}</Typography>
                            <Chip label={`Round ${encounter.currentRound}`} color="primary" sx={{fontSize: "1.2rem", fontWeight: "bold", px: 2}}/>
                            <Box sx={{display: "flex", gap: 1}}>
                                <Button variant="outlined" color="secondary" startIcon={<HistoryIcon/>} onClick={() => setLogDrawerOpen(true)}>Log</Button>
                                <Button variant="outlined" color="error" startIcon={<StopIcon/>} onClick={handleEndEncounter}>End</Button>
                            </Box>
                        </Box>

                        {/* Current slot info */}
                        <Paper sx={{p: 2, mb: 3, backgroundColor: currentSlot?.type === InitiativeSlotType.Player ? "primary.light" : "error.light"}}>
                            <Typography variant="h6">
                                Slot #{encounter.currentSlotIndex + 1} — {currentSlot?.type === InitiativeSlotType.Player ? "PC SLOT" : "NPC SLOT"}
                                {currentParticipant && ` — ${currentParticipant.name}`}
                            </Typography>
                            {!currentParticipant && (
                                <Alert severity="warning" sx={{mt: 1}}>No participant assigned to this slot.</Alert>
                            )}
                        </Paper>

                        {/* TurnActions for current participant */}
                        {currentParticipant && (
                            <TurnActions
                                currentParticipant={currentParticipant}
                                slotId={String(encounter.currentSlotIndex)}
                                round={encounter.currentRound}
                                availableActions={sharedActions}
                                availableManeuvers={sharedManeuvers}
                                onComplete={handleCompleteTurn}
                                onSkip={handleNextSlot}
                            />
                        )}

                        {/* Navigation */}
                        <Paper sx={{p: 2, mb: 3}}>
                            <Box sx={{display: "flex", justifyContent: "center", gap: 2}}>
                                <Button variant="outlined" startIcon={<NavigateBeforeIcon/>} onClick={handlePreviousSlot} disabled={encounter.currentSlotIndex === 0}>Previous</Button>
                                <Button variant="contained" endIcon={<NavigateNextIcon/>} onClick={handleNextSlot} size="large">
                                    {isLastSlot ? "Start Next Round" : "Next Slot"}
                                </Button>
                            </Box>
                        </Paper>

                        {/* Initiative order summary */}
                        <Typography variant="h6" sx={{mt: 2}}>Initiative Order</Typography>
                        {encounter.initiativeOrder.map((slot, index) => {
                            const isCurrent = index === encounter.currentSlotIndex;
                            const name = slot.type === InitiativeSlotType.Player
                                ? slot.playerCharacter?.name
                                : slot.adversaryTemplate?.name;
                            return (
                                <Paper key={index} sx={{p: 1, mb: 0.5, border: isCurrent ? 2 : 1, borderColor: isCurrent ? "primary.main" : "divider", backgroundColor: isCurrent ? "primary.light" : slot.type === InitiativeSlotType.Player ? "rgba(25,118,210,0.08)" : "rgba(211,47,47,0.08)"}}>
                                    <Typography variant="body2">
                                        #{index + 1} {slot.type === InitiativeSlotType.Player ? "PC" : "NPC"}{name ? ` — ${name}` : ""}
                                        {isCurrent && " ◄ ACTIVE"}
                                    </Typography>
                                </Paper>
                            );
                        })}

                        {/* Participant status */}
                        <Typography variant="h6" sx={{mt: 3}}>Players</Typography>
                        {encounter.party.players.map((player) => (
                            <Paper key={player.id} sx={{p: 2, mb: 1}}>
                                <Typography variant="body1" fontWeight="bold">{player.name}</Typography>
                                <Typography variant="body2">
                                    Wounds: {player.derivedStats.woundThreshold.current}/{player.derivedStats.woundThreshold.total} |
                                    Strain: {player.derivedStats.strainThreshold.current}/{player.derivedStats.strainThreshold.total}
                                </Typography>
                                {player.equipment?.weapons?.length > 0 && (
                                    <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5}}>
                                        {player.equipment.weapons.map((w) => (
                                            <Chip key={w.id} label={`⚔ ${w.name}`} size="small" color="warning" variant="outlined"/>
                                        ))}
                                    </Box>
                                )}
                            </Paper>
                        ))}

                        <Typography variant="h6" sx={{mt: 2}}>NPCs</Typography>
                        {encounter.npcIds.map((npc) => (
                            <Paper key={npc.id} sx={{p: 2, mb: 1}}>
                                <Typography variant="body1" fontWeight="bold">{npc.name}</Typography>
                                <Typography variant="body2">Wounds: {npc.derivedStats.woundThreshold.current}/{npc.derivedStats.woundThreshold.total}</Typography>
                                {npc.equipment?.weapons?.length > 0 && (
                                    <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5}}>
                                        {npc.equipment.weapons.map((w) => (
                                            <Chip key={w.id} label={`⚔ ${w.name}`} size="small" color="error" variant="outlined"/>
                                        ))}
                                    </Box>
                                )}
                            </Paper>
                        ))}

                        {/* Map positions */}
                        {(encounter.locations ?? []).length > 0 && (
                            <>
                                <Typography variant="h6" sx={{mt: 3}}>Map Positions</Typography>
                                {(encounter.locations ?? []).map((loc) => {
                                    const occupants = getAllParticipants().filter((p) => loc.occupantIds.includes(p.id));
                                    return (
                                        <Paper key={loc.id} sx={{p: 2, mb: 1}}>
                                            <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 0.5}}>
                                                <Typography variant="body1" fontWeight="bold">📍 {loc.name}</Typography>
                                                {loc.cover !== "None" && (
                                                    <Chip label={`🛡 ${loc.cover} Cover`} size="small" color={loc.cover === "Hard" ? "error" : "warning"}/>
                                                )}
                                            </Box>
                                            <Box sx={{display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5}}>
                                                {occupants.length === 0 ? (
                                                    <Typography variant="caption" color="text.secondary">No one at this position.</Typography>
                                                ) : (
                                                    occupants.map((p) => (
                                                        <Chip key={p.id} label={p.name} size="small" color={encounter.party.players.some((pl) => pl.id === p.id) ? "primary" : "error"}
                                                            onClick={() => handleUpdateLocation(loc.id, {occupantIds: loc.occupantIds.filter((id) => id !== p.id)})}
                                                        />
                                                    ))
                                                )}
                                                {getAllParticipants().filter((p) => !loc.occupantIds.includes(p.id)).map((p) => (
                                                    <Chip key={p.id} label={`+ ${p.name}`} size="small" variant="outlined"
                                                        onClick={() => handleUpdateLocation(loc.id, {occupantIds: [...loc.occupantIds, p.id]})}
                                                    />
                                                ))}
                                            </Box>
                                        </Paper>
                                    );
                                })}
                            </>
                        )}

                        {/* Combat log drawer */}
                        <Drawer anchor="right" open={logDrawerOpen} onClose={() => setLogDrawerOpen(false)}>
                            <Box sx={{width: 360, p: 2}}>
                                <Typography variant="h6" gutterBottom>Combat Log</Typography>
                                <Divider sx={{mb: 1}}/>
                                <List dense>
                                    {encounter.combatLog.map((entry) => (
                                        <ListItem key={entry.id}>
                                            <ListItemText
                                                primary={`R${entry.round}: ${entry.participantName} — ${entry.action}`}
                                                secondary={entry.details}
                                            />
                                        </ListItem>
                                    ))}
                                    {encounter.combatLog.length === 0 && (
                                        <ListItem><ListItemText primary="No log entries yet."/></ListItem>
                                    )}
                                </List>
                            </Box>
                        </Drawer>
                    </Paper>
                );
            })()}

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
