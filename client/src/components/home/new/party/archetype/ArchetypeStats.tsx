import type {Archetype} from "../../../../../api/model";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import {Paper, Typography} from "@mui/material";

interface Props {
    archetype: Archetype;
}

export default function ArchetypeStats(props: Props) {
    const {archetype} = props;

    return (
        <GridContainer spacing={3} centered>
            <Paper sx={{p: 2, textAlign: "center"}}>
                <Typography variant="h3" fontWeight="bold" color="text.primary">
                    {archetype.wounds}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Wound Threshold
                </Typography>
            </Paper>
            <Paper sx={{p: 2, textAlign: "center"}}>
                <Typography variant="h3" fontWeight="bold" color="text.primary">
                    {archetype.strain}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Strain Threshold
                </Typography>
            </Paper>
            <Paper sx={{p: 2, textAlign: "center"}}>
                <Typography variant="h3" fontWeight="bold" color="text.primary">
                    {archetype.experience}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Starting XP
                </Typography>
            </Paper>
        </GridContainer>
    )
}