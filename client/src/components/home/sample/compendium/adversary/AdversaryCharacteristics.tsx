import {type Characteristics, CharacteristicType} from "../../../../../api/model";
import GenesysNumberField from "../../../../common/field/GenesysNumberField.tsx";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import {Grid} from "@mui/material";

interface Props {
    characteristics: Characteristics
    updateCharacteristics: (characteristics: Characteristics) => void;
}

export default function AdversaryCharacteristics(props: Props) {
    const {characteristics, updateCharacteristics} = props;

    const handleBrawnUpdate = (value: number) => {
        updateCharacteristics({...characteristics, brawn: {...characteristics.brawn, base: value}});
    };

    const handleAgilityUpdate = (value: number) => {
        updateCharacteristics({...characteristics, agility: {...characteristics.agility, base: value}});
    };

    const handleIntellectUpdate = (value: number) => {
        updateCharacteristics({...characteristics, intellect: {...characteristics.intellect, base: value}});
    };

    const handleCunningUpdate = (value: number) => {
        updateCharacteristics({...characteristics, cunning: {...characteristics.cunning, base: value}});
    };

    const handleWillpowerUpdate = (value: number) => {
        updateCharacteristics({...characteristics, willpower: {...characteristics.willpower, base: value}});
    };

    const handlePresenceUpdate = (value: number) => {
        updateCharacteristics({...characteristics, presence: {...characteristics.presence, base: value}});
    };

    return (
        <GridContainer>
            <Grid size={4}>
                <GenesysNumberField value={characteristics.brawn.base}
                                    label={CharacteristicType.Brawn}
                                    onChange={handleBrawnUpdate} min={1} max={5} fullwidth/>
                <GenesysNumberField value={characteristics.cunning.base}
                                    label={CharacteristicType.Cunning}
                                    onChange={handleCunningUpdate} min={1} max={5} fullwidth/>
            </Grid>
            <Grid size={4}>
                <GenesysNumberField value={characteristics.agility.base}
                                    label={CharacteristicType.Agility}
                                    onChange={handleAgilityUpdate} min={1} max={5} fullwidth/>
                <GenesysNumberField value={characteristics.willpower.base}
                                    label={CharacteristicType.Willpower}
                                    onChange={handleWillpowerUpdate} min={1} max={5} fullwidth/>
            </Grid>
            <Grid size={4}>
                <GenesysNumberField value={characteristics.intellect.base}
                                    label={CharacteristicType.Intellect}
                                    onChange={handleIntellectUpdate} min={1} max={5} fullwidth/>
                <GenesysNumberField value={characteristics.presence.base}
                                    label={CharacteristicType.Presence}
                                    onChange={handlePresenceUpdate} min={1} max={5} fullwidth/>
            </Grid>
        </GridContainer>
    );
}