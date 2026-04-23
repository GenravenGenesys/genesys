import {type InitiativeSlot, InitiativeSlotType} from "../../../../../api/model";
import {Box, Chip, IconButton, ListItem, ListItemText, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import GenesysResultsTypography from "../../../common/typography/GenesysResultsTypography.tsx";

interface Props {
    slot: InitiativeSlot,
    index: number,
    onRemoveInitiativeSlot: (index: number) => void,
}

export default function InitiativeOrderListItem(props: Props) {
    const {slot, index, onRemoveInitiativeSlot} = props;

    const isPlayer = slot.type === InitiativeSlotType.Player;
    const label = isPlayer
        ? (slot.playerCharacter?.name ?? "PC")
        : (slot.adversaryTemplate?.name ?? "NPC");

    return (
        <ListItem
            key={index}
            secondaryAction={
                <IconButton
                    edge="end"
                    color="error"
                    onClick={() => onRemoveInitiativeSlot(index)}
                >
                    <DeleteIcon/>
                </IconButton>
            }
            sx={{
                border: 2,
                borderColor: isPlayer ? "primary.main" : "error.main",
                backgroundColor: isPlayer ? "primary.light" : "error.light",
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
                    <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                        <Chip
                            label={isPlayer ? "PC" : "NPC"}
                            size="small"
                            color={isPlayer ? "primary" : "error"}
                            sx={{fontWeight: "bold"}}
                        />
                        <Typography variant="body2" fontWeight="bold">
                            {label}
                        </Typography>
                    </Box>
                }
                secondary={
                    <GenesysResultsTypography result={slot.results} variant={"h6"}/>
                }
            />
        </ListItem>
    );
}