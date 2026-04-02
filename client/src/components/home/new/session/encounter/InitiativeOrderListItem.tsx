import {type InitiativeSlot, InitiativeSlotType} from "../../../../../api/model";
import {Box, Chip, IconButton, ListItem, ListItemText, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import GenesysResultsTypography from "../../../common/typography/GenesysResultsTypography.tsx";

interface Props {
    slot: InitiativeSlot,
    index: number,
    onRemoveInitiativeSlot: (index: number) => void,
}

export default function EncounterSetup(props: Props) {
    const {slot, index, onRemoveInitiativeSlot} = props;

    // const rolledByParticipant = encounter.participants.find(
    //     (p) => p.id === slot.rolledBy
    // );

    return (
        <ListItem
            key={index}
            sx={{
                border: 2,
                borderColor:
                    slot.type === InitiativeSlotType.Player
                        ? "primary.main"
                        : "error.main",
                backgroundColor:
                    slot.type === InitiativeSlotType.Player
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
                            label={slot.type.toUpperCase()}
                            size="small"
                            color={
                                slot.type === InitiativeSlotType.Player ? "primary" : "error"
                            }
                            sx={{fontWeight: "bold"}}
                        />
                        {/*<Typography variant="body2">*/}
                        {/*    Rolled by: {rolledByParticipant?.name}*/}
                        {/*</Typography>*/}
                    </Box>
                }
                secondary={
                    <GenesysResultsTypography result={slot.results} variant={"h6"}/>
                }
            />

            secondaryAction={
            <IconButton
                edge="end"
                color="error"
                onClick={() => onRemoveInitiativeSlot(index)}
            >
                <DeleteIcon/>
            </IconButton>
        }
        </ListItem>
    );
}