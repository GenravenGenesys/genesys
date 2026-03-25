import SelectSkillField from "../../SelectSkillField.tsx";
import {RangeBand, type Skill, SkillType, type WeaponStats} from "../../../../../../api/model";
import GridContainer from "../../../../../common/grid/GridContainer.tsx";
import {FormControlLabel, Grid, Stack, Switch} from "@mui/material";
import GenesysNumberField from "../../../../common/field/GenesysNumberField.tsx";
import GenesysSelectField from "../../../../common/field/GenesysSelectField.tsx";

interface Props {
    weaponStats: WeaponStats;
    updateWeaponStats: (updatedStats: WeaponStats) => void;
}

export default function WeaponStatsTab(props: Props) {
    const {weaponStats, updateWeaponStats} = props;

    const handleWeaponStats = <K extends keyof WeaponStats>(field: K, value: WeaponStats[K]) => {
        updateWeaponStats({
            ...weaponStats,
            [field]: value,
        });
    }

    return (
        <Stack spacing={3}>
            <SelectSkillField
                currentSkill={weaponStats.skill}
                handleSkillSelect={(skill: Skill) => handleWeaponStats('skill', skill)}
                filterByType={SkillType.Combat}
            />
            <GridContainer>
                <Grid size={6}>
                    <GenesysNumberField
                        value={weaponStats.damage}
                        fullwidth
                        label="Damage"
                        onChange={(e) => handleWeaponStats('damage', e)}
                    />
                </Grid>
                <Grid size={6}>
                    <GenesysNumberField
                        value={weaponStats.critical}
                        fullwidth
                        label="Critical"
                        onChange={(e) => handleWeaponStats('critical', e)}
                    />
                </Grid>
            </GridContainer>
            <GenesysSelectField value={weaponStats.range} label="Range"
                                onChange={(e) => handleWeaponStats('range', e)} options={RangeBand}/>
            <FormControlLabel
                control={
                    <Switch
                        checked={weaponStats.brawn}
                        onChange={(e) => handleWeaponStats('brawn', e.target.checked)}
                    />
                }
                label="Add Brawn to Damage"
            />
        </Stack>
    );
}