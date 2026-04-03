import type {ArmorStats} from "../../../../../../api/model";
import {Grid, Stack} from "@mui/material";
import GridContainer from "../../../../../common/grid/GridContainer.tsx";
import GenesysNumberField from "../../../../common/field/GenesysNumberField.tsx";

interface Props {
    armorStats: ArmorStats;
    updateArmorStats: (armorStats: ArmorStats) => void;
}

export default function ArmorStatsTab(props: Props) {
    const {armorStats, updateArmorStats} = props;

    const handleArmorStats = <K extends keyof ArmorStats>(field: K, value: ArmorStats[K]) => {
        updateArmorStats({
            ...armorStats,
            [field]: value,
        });
    }

    return (
        <Stack spacing={3}>
            <GridContainer>
                <Grid size={6}>
                    <GenesysNumberField
                        value={armorStats.soak.base}
                        fullwidth
                        label="Soak"
                        onChange={(e) => handleArmorStats('soak', {base: e, current: e})}
                    />
                </Grid>
                <Grid size={6}>
                    <GenesysNumberField
                        value={armorStats.defense.base}
                        fullwidth
                        label="Defense"
                        onChange={(e) => handleArmorStats('defense', {base: e, current: e})}
                    />
                </Grid>
            </GridContainer>
        </Stack>
    );
}