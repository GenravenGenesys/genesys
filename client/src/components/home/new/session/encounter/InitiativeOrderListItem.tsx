import type {InitiativeSlot} from "../../../../../api/model";
import {Box, Chip, IconButton, ListItem, ListItemText, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
    slot: InitiativeSlot,
    index: number,
    onRemoveInitiativeSlot: (slotId: string) => void,
}

export default function EncounterSetup(props: Props) {
    const {slot, index, onRemoveInitiativeSlot} = props;

    const rolledByParticipant = encounter.participants.find(
        (p) => p.id === slot.rolledBy
    );

    return (
        <ListItem
            key={slot.id}
            sx={{
                border: 2,
                borderColor:
                    slot.slotType === "pc"
                        ? "primary.main"
                        : "error.main",
                backgroundColor:
                    slot.slotType === "pc"
                        ? "primary.light"
                        : "error.light",
                borderRadius: 1,
                mb: 1,
            }}
        >
            <Box sx={{mr: 2, textAlign: "center", minWidth: 40}}>
                <Typography variant="h6" fontWeight="bold">
                    #{index + 1}
                </Typography>
            </Box>

            <ListItemText
                primary={
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Chip
                            label={slot.slotType.toUpperCase()}
                            size="small"
                            color={
                                slot.slotType === "pc" ? "primary" : "error"
                            }
                            sx={{fontWeight: "bold"}}
                        />
                        <Typography variant="body2">
                            Rolled by: {rolledByParticipant?.name}
                        </Typography>
                    </Box>
                }
                secondary={
                    <Typography variant="h6" component="span">
                        {slot.success} Success, {slot.advantage} Advantage
                    </Typography>
                }
            />

            secondaryAction={
            <IconButton
                edge="end"
                color="error"
                onClick={() => onRemoveInitiativeSlot(slot.id)}
            >
                <DeleteIcon/>
            </IconButton>
        }
        </ListItem>
    );
}