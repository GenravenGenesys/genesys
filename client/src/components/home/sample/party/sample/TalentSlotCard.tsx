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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LockIcon from "@mui/icons-material/Lock";
import StarIcon from "@mui/icons-material/Star";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import type {PyramidSlot, SlotAssignment, TalentDefinition} from "./TalentSampleApp.tsx";


interface TalentSlotCardProps {
    slot: PyramidSlot;
    assignment?: SlotAssignment;
    talent?: TalentDefinition;
    talents: TalentDefinition[];
    isUnlocked: boolean;
    currentRank: number;
    slotCost: number;
    canAfford: boolean;
    onAssignTalent: (talentId: string) => void;
    onPurchase: () => void;
    onRefund: () => void;
    onClearSlot: () => void;
}

const tierColors: Record<number, string> = {
    1: "#90CAF9",
    2: "#81C784",
    3: "#FFD54F",
    4: "#FFB74D",
    5: "#E57373",
};

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
                                                                  onPurchase,
                                                                  onRefund,
                                                                  onClearSlot,
                                                              }) => {
    const [selectorOpen, setSelectorOpen] = useState(false);

    const tierColor = tierColors[slot.tier];
    const activationColor = talent ? activationColors[talent.activation] : "";

    const isEmpty = !assignment;
    const isPurchased = assignment?.purchased || false;
    const canPurchase = !isEmpty && isUnlocked && !isPurchased && canAfford;
    const canRefund = isPurchased;
    const canChange = !isEmpty && !isPurchased;

    // Get talents available for this tier
    const availableTalents = talents.filter((t) => t.baseTier === slot.tier);

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
                        ? tierColor
                        : isUnlocked
                            ? "divider"
                            : "grey.400",
                    backgroundColor: isPurchased
                        ? `${tierColor}44`
                        : !isUnlocked
                            ? "grey.100"
                            : isEmpty
                                ? "grey.50"
                                : "background.paper",
                    opacity: !isUnlocked ? 0.6 : 1,
                    position: "relative",
                    cursor: isEmpty && isUnlocked ? "pointer" : "default",
                }}
                onClick={() => {
                    if (isEmpty && isUnlocked) {
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
                                backgroundColor: tierColor,
                                color: "white",
                                fontWeight: "bold",
                            }}
                        />

                        {canChange && (
                            <Box>
                                <Tooltip title="Change Talent">
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectorOpen(true);
                                        }}
                                        sx={{p: 0, mr: 0.5}}
                                    >
                                        <SwapHorizIcon fontSize="small"/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Clear Slot">
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onClearSlot();
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
                                {isUnlocked ? "Click to Select" : "Locked"}
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            {/* Talent Name */}
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                {talent?.name}
                            </Typography>

                            {/* Rank Display */}
                            {talent?.ranked && (
                                <Box sx={{mb: 1}}>
                                    <Chip
                                        label={`Rank ${currentRank}${
                                            talent.maxRanks ? `/${talent.maxRanks}` : ""
                                        }`}
                                        size="small"
                                        icon={<StarIcon sx={{fontSize: 14}}/>}
                                        color={currentRank > 0 ? "primary" : "default"}
                                        sx={{fontSize: "0.7rem"}}
                                    />
                                </Box>
                            )}

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

                {/* Purchase Section */}
                {!isEmpty && (
                    <Box
                        sx={{
                            p: 1,
                            borderTop: 1,
                            borderColor: "divider",
                            backgroundColor: "background.paper",
                        }}
                    >
                        {isPurchased ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <IconButton
                                    size="small"
                                    onClick={onRefund}
                                    color="error"
                                    sx={{border: 1, borderColor: "error.main"}}
                                >
                                    <RemoveIcon fontSize="small"/>
                                </IconButton>

                                <Typography
                                    variant="caption"
                                    fontWeight="bold"
                                    color="success.main"
                                >
                                    OWNED
                                </Typography>

                                <Box sx={{width: 32}}/>
                            </Box>
                        ) : (
                            <Box sx={{textAlign: "center"}}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    gutterBottom
                                    display="block"
                                >
                                    Cost: {slotCost} XP
                                    {talent?.ranked && ` (Rank ${currentRank + 1})`}
                                </Typography>
                                <Button
                                    fullWidth
                                    size="small"
                                    variant="contained"
                                    onClick={onPurchase}
                                    disabled={!canPurchase}
                                    startIcon={<AddIcon/>}
                                >
                                    {!isUnlocked
                                        ? "Locked"
                                        : !canAfford
                                            ? "Not Enough XP"
                                            : "Purchase"}
                                </Button>
                            </Box>
                        )}
                    </Box>
                )}
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
                        sx={{ml: 1, backgroundColor: tierColor, color: "white"}}
                    />
                </DialogTitle>
                <DialogContent>
                    <List>
                        {availableTalents.map((t) => {
                            const talentRank = talents.filter(
                                (talent) => talent.id === t.id
                            ).length;

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
                                                            label={`Ranked`}
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
