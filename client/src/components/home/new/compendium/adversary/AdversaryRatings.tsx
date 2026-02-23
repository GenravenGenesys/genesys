import {type AdversaryRatings} from "../../../../../api/model";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import {Grid} from "@mui/material";
import GenesysNumberField from "../../../common/field/GenesysNumberField.tsx";
import {RatingType} from "../../../../../models/actor/npc/NonPlayerActor.ts";

interface Props {
    ratings: AdversaryRatings
    updateRatings: (updatedRating: AdversaryRatings) => void;
}

export default function AdversaryRatings(props: Props) {
    const {ratings, updateRatings} = props;

    const handleCombatUpdate = (value: number) => {
        updateRatings({...ratings, combat: value});
    };

    const handleSocialUpdate = (value: number) => {
        updateRatings({...ratings, social: value});
    };

    const handleGeneralUpdate = (value: number) => {
        updateRatings({...ratings, general: value});
    };

    return (
        <GridContainer>
            <Grid size={4}>
                <GenesysNumberField value={ratings.combat}
                                    label={RatingType.Combat}
                                    onChange={handleCombatUpdate} min={1} max={20} fullwidth/>
            </Grid>
            <Grid size={4}>
                <GenesysNumberField value={ratings.social}
                                    label={RatingType.Social}
                                    onChange={handleSocialUpdate} min={1} max={20} fullwidth/>
            </Grid>
            <Grid size={4}>
                <GenesysNumberField value={ratings.general}
                                    label={RatingType.General}
                                    onChange={handleGeneralUpdate} min={1} max={20} fullwidth/>
            </Grid>
        </GridContainer>
    );
}