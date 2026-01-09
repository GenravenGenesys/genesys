import {
    type Cost,
    CostType,
    type Limit,
    LimitType,
    StatsType,
    type Talent,
    type TalentSkills, type TalentStats
} from "../../../../../../api/model";
import * as React from "react";
import {useState} from "react";
import GridContainer from "../../../../../common/grid/GridContainer.tsx";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";
import CostCard from "../../../../../common/card/select/CostCard.tsx";
import LimitCard from "../../../../../common/card/select/LimitCard.tsx";
import TalentCareerSkillsCard from "../../../../../talents/skill/TalentCareerSkillsCard.tsx";
import NumberTextFieldCard from "../../../../../common/card/NumberTextFieldCard.tsx";
import TalentModifierCard from "../../../../../talents/modifier/TalentModifierCard.tsx";

interface Props {
    talent: Talent;
    updateTalentStats: (stats: TalentStats) => void;
}

const TalentModifierTab: React.FC<Props> = ({talent, updateTalentStats})=> {
    const [state, setState] = useState({
        // cost: !(talent.cost.type === CostType.None && talent.limit.type === LimitType.None),
        // careerSkill: talent.talentSkills.potentialCareerSkills.length > 0,
        stats: talent.talentStats.wounds > 0 || talent.talentStats.strain > 0 || talent.talentStats.soak > 0 || talent.talentStats.defense > 0
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    // const handleCostChange = async (value: Cost) => {
    //     if (talent) {
    //         updateTalent({...talent, cost: value});
    //     }
    // };
    //
    // const handleLimitChange = async (value: Limit) => {
    //     if (talent) {
    //         updateTalent({...talent, limit: value});
    //     }
    // };
    //
    // const handleTalentSkillsChange = async (value: TalentSkills) => {
    //     if (talent) {
    //         updateTalent({...talent, talentSkills: value});
    //     }
    // };
    //
    // const handleWoundsChange = async (value: number) => {
    //     if (talent) {
    //         updateTalent({
    //             ...talent,
    //             talentStats: {
    //                 wounds: value,
    //                 strain: talent.talentStats.strain,
    //                 soak: talent.talentStats.soak,
    //                 defense: talent.talentStats.defense
    //             }
    //         });
    //     }
    // };
    //
    // const handleStrainChange = async (value: number) => {
    //     if (talent) {
    //         updateTalent({
    //             ...talent,
    //             talentStats: {
    //                 wounds: value,
    //                 strain: talent.talentStats.strain,
    //                 soak: talent.talentStats.soak,
    //                 defense: talent.talentStats.defense
    //             }
    //         });
    //     }
    // };
    //
    // const handleSoakChange = async (value: number) => {
    //     if (talent) {
    //         updateTalent({
    //             ...talent,
    //             talentStats: {
    //                 wounds: talent.talentStats.wounds,
    //                 strain: talent.talentStats.strain,
    //                 soak: value,
    //                 defense: talent.talentStats.defense
    //             }
    //         });
    //     }
    // };
    //
    // const handleDefenseChange = async (value: number) => {
    //     if (talent) {
    //         updateTalent({
    //             ...talent,
    //             talentStats: {
    //                 wounds: talent.talentStats.wounds,
    //                 strain: talent.talentStats.strain,
    //                 soak: talent.talentStats.soak,
    //                 defense: value
    //             }
    //         });
    //     }
    // };

    return (
        <GridContainer centered>
            <GridContainer centered>
                <FormControl sx={{m: 3}} component="fieldset" variant="standard">
                    <FormLabel component="legend" sx={{textAlign: 'center'}}>Talent Modifiers</FormLabel>
                    <FormGroup row>
                        {/*<FormControlLabel*/}
                        {/*    control={*/}
                        {/*        <Checkbox checked={state.cost} onChange={handleChange} name="cost"/>*/}
                        {/*    }*/}
                        {/*    label="Cost"*/}
                        {/*/>*/}
                        {/*<FormControlLabel*/}
                        {/*    control={*/}
                        {/*        <Checkbox checked={state.careerSkill} onChange={handleChange} name="careerSkill"/>*/}
                        {/*    }*/}
                        {/*    label="Career Skills"*/}
                        {/*/>*/}
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.stats} onChange={handleChange} name="stats"/>
                            }
                            label="Stats"
                        />
                    </FormGroup>
                </FormControl>
            </GridContainer>
        </GridContainer>
    );
};

export default TalentModifierTab;

