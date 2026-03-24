import type {QualityStats} from "../../../../../api/model";
import GridContainer from "../../../../common/grid/GridContainer";
import {Stack} from "@mui/material";
import GenesysNumberField from "../../../common/field/GenesysNumberField.tsx";

interface Props {
    stats: QualityStats;
    updateStats: (updatedStats: QualityStats) => void;
}

export default function QualityDialogStatsTab(props: Props) {
    const {stats, updateStats} = props;

    const handleChange = (field: keyof QualityStats, value: number) => {
        updateStats({
            ...stats,
            [field]: value,
        });
    };

    return (
        <GridContainer centered>
            <Stack spacing={3}>
                <GenesysNumberField value={stats.criticalInjury} fullwidth
                                    label="Increase Critical Injury roll by amount"
                                    onChange={(e) => handleChange('criticalInjury', e)}
                />
            </Stack>
        </GridContainer>
    );
}