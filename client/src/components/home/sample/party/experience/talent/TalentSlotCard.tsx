import React, {useState} from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Tooltip,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import type {Talent} from "../../../../../../api/model";
import type {PyramidSlot, SlotAssignment} from "./PurchaseTalentTab.tsx";


interface TalentSlotCardProps {
    slot: PyramidSlot;
    assignment?: SlotAssignment;
    talent?: Talent;
    talents: Talent[];
    isUnlocked: boolean;
    currentRank: number;
    slotCost: number;
    canAfford: boolean;
    onAssignTalent: (talentId: string) => void;
    onRemoveTalent: () => void;
    slotAssignments: Record<string, SlotAssignment>;
    getTalentRank: (talentId: string) => number;
}

const activationColors: Record<string, string> = {
    Passive: "#9E9E9E",
    "Active (Action)": "#F44336",
    "Active (Maneuver)": "#FF9800",
    "Active (Incidental)": "#4CAF50",
};

export const TalentSlotCard: React.FC<TalentSlotCardProps> = ({
                                                                  slot,
                                                                  assignment,
                                                                  talent,
                                                                  talents,
                                                                  isUnlocked,
                                                                  currentRank,
                                                                  slotCost,
                                                                  canAfford,
                                                                  onAssignTalent,
                                                                  onRemoveTalent,
                                                                  slotAssignments,
                                                                  getTalentRank,
                                                              }) => {
    const [selectorOpen, setSelectorOpen] = useState(false);

    const activationColor = talent ? activationColors[talent.activation] : "";

    const isEmpty = !assignment;
    const isPurchased = !isEmpty; // If there's an assignment, it's purchased

    // Helper to convert TalentTier enum to number
    const tierToNumber = (tier: typeof slot.tier): number => {
        const tierMap: Record<string, number> = {
            'First': 1,
            'Second': 2,
            'Third': 3,
            'Fourth': 4,
            'Fifth': 5
        };
        return tierMap[tier] || 1;
    };

    // Helper to get all purchased talent IDs (all assignments are purchased)
    const getPurchasedTalentIds = (): Set<string> => {
        const purchased = new Set<string>();
        Object.values(slotAssignments).forEach((assignment) => {
            purchased.add(assignment.talentId);
        });
        return purchased;
    };

    const purchasedTalentIds = getPurchasedTalentIds();
    const currentSlotTierNumber = tierToNumber(slot.tier);

    // Get talents available for this tier
    const availableTalents = talents.filter((t) => {
        const talentBaseTier = tierToNumber(t.tier);
        const talentCurrentRank = getTalentRank(t.id);

        // Calculate what tier this talent should appear in based on its rank
        // Base tier + current rank = effective tier
        const effectiveTier = talentBaseTier + talentCurrentRank;

        // Only show talents that match this slot's tier
        if (effectiveTier !== currentSlotTierNumber) {
            return false;
        }

        // If unranked and already purchased, don't show it
        return !(!t.ranked && purchasedTalentIds.has(t.id));
    });

    return (
        <>
            <Card
                sx={{
                    width: 180,
                    height: 240,
                    display: "flex",
                    flexDirection: "column",
                    border: 3,
                    borderColor: isPurchased
                        ? "success.main"
                        : isEmpty
                            ? "grey.400"
                            : "grey.400",
                    backgroundColor: isPurchased
                        ? "action.hover"
                        : isEmpty
                            ? "grey.50"
                            : "action.hover",
                    opacity: !isUnlocked ? 0.6 : 1,
                    position: "relative",
                    cursor: isEmpty && isUnlocked && canAfford ? "pointer" : "default",
                }}
                onClick={() => {
                    if (isEmpty && isUnlocked && canAfford) {
                        setSelectorOpen(true);
                    }
                }}
            >
                {/* Locked Overlay */}
                {!isUnlocked && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10,
                        }}
                    >
                        <LockIcon sx={{fontSize: 48, color: "grey.500"}}/>
                    </Box>
                )}

                <CardContent sx={{flexGrow: 1, pb: 1}}>
                    {/* Tier Badge */}
                    <Box sx={{display: "flex", justifyContent: "space-between", mb: 1}}>
                        <Chip
                            label={`Tier ${slot.tier}`}
                            size="small"
                            sx={{
                                color: "white",
                                fontWeight: "bold",
                            }}
                        />

                        {isPurchased && (
                            <Box>
                                <Tooltip title="Remove Talent">
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onRemoveTalent();
                                        }}
                                        sx={{p: 0}}
                                    >
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )}
                    </Box>

                    {isEmpty ? (
                        <Box sx={{textAlign: "center", mt: 4}}>
                            <Typography
                                variant="h1"
                                color="text.disabled"
                                sx={{fontSize: 48}}
                            >
                                +
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {!isUnlocked ? "Locked" : !canAfford ? "Not Enough XP" : "Click to Select"}
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            {/* Talent Name */}
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                {talent?.name}
                            </Typography>

                            {/* Activation */}
                            {talent && (
                                <Chip
                                    label={talent.activation}
                                    size="small"
                                    sx={{
                                        backgroundColor: activationColor,
                                        color: "white",
                                        fontSize: "0.65rem",
                                        mb: 1,
                                    }}
                                />
                            )}

                            {/* Short Description */}
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                }}
                            >
                                {talent?.description}
                            </Typography>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Talent Selector Dialog */}
            <Dialog
                open={selectorOpen}
                onClose={() => setSelectorOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    Select Tier {slot.tier} Talent
                    <Chip
                        label={`Tier ${slot.tier}`}
                        size="small"
                        sx={{ml: 1, color: "white"}}
                    />
                    <Chip
                        label={`Cost: ${slotCost} XP`}
                        size="small"
                        color="primary"
                        sx={{ml: 1}}
                    />
                </DialogTitle>
                <DialogContent>
                    <List>
                        {availableTalents.map((t) => {
                            const talentCurrentRank = getTalentRank(t.id);

                            return (
                                <ListItem key={t.id} disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            onAssignTalent(t.id);
                                            setSelectorOpen(false);
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Box
                                                    sx={{display: "flex", alignItems: "center", gap: 1}}
                                                >
                                                    <Typography variant="body1" fontWeight="bold">
                                                        {t.name}
                                                    </Typography>
                                                    {t.ranked && (
                                                        <Chip
                                                            label={talentCurrentRank > 0 ? `Rank ${talentCurrentRank + 1}` : "Ranked"}
                                                            size="small"
                                                            icon={<StarIcon sx={{fontSize: 14}}/>}
                                                        />
                                                    )}
                                                    <Chip
                                                        label={t.activation}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: activationColors[t.activation],
                                                            color: "white",
                                                            fontSize: "0.7rem",
                                                        }}
                                                    />
                                                </Box>
                                            }
                                            secondary={t.description}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectorOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
