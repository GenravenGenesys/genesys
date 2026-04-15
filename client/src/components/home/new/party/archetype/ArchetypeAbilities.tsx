import type {Archetype} from "../../../../../api/model";
import {Card, CardContent, Chip, Stack} from "@mui/material";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import GridItem from "../../../../common/grid/GridItem.tsx";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader.tsx";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography.tsx";

interface Props {
    archetype: Archetype;
}

export default function ArchetypeAbilities(props: Props) {
    const {archetype} = props;

    if (!archetype.abilities || archetype.abilities.length === 0) {
        return null;
    }

    return (
        <GridContainer spacing={3} centered>
            {archetype.abilities.map((ability, index) => (
                <GridItem key={`${ability.name}-${index}`}>
                    <Card variant="outlined">
                        <CenteredCardHeader title={ability.name || 'Unnamed Ability'}/>
                        <CardContent>
                            <Stack spacing={1} alignItems="center">
                                <Chip label={ability.activation} size="small" color="primary" variant="outlined"/>
                                {ability.description && (
                                    <GenesysDescriptionTypography text={ability.description} variant="body2" color="text.secondary"/>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </GridItem>
            ))}
        </GridContainer>
    );
}
