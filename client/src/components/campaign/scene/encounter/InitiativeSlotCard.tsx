import InitiativeSlot from "../../../../models/campaign/encounter/InitiativeSlot";
import {Autocomplete, Card, CardContent, Grid, TextField} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import {convertResultsToString} from "../../../../models/roll/DiceRoll";
import Character from "../../../../models/campaign/encounter/Character";
import React from "react";

interface Props {
    slot: InitiativeSlot;
    characters: Character[];
    updateSlot: (slot: InitiativeSlot, index: number) => void;
    index: number;
}

const InitiativeSlotCard: React.FC<Props> = ({slot, characters, updateSlot, index}) => {

    const handleCharacterChange = (character: Character) => {
        updateSlot({...slot, character: character}, index);
    };

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={slot.type}/>
                <CardContent>
                    <GenesysDescriptionTypography text={convertResultsToString(slot.results)}/>
                    <Autocomplete
                        options={characters}
                        getOptionLabel={(option) => (option.name)}
                        value={slot.character}
                        onChange={(e, newValue) => handleCharacterChange(newValue as Character)}
                        renderInput={(params) => <TextField {...params} label='Character'
                                                            variant="outlined"/>}
                        disabled={false}
                    />
                </CardContent>
            </Card>
        </Grid>
    );
};

export default InitiativeSlotCard;