import Talent, {TalentSkills} from "../../models/Talent";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";
import CostCard from "../common/card/select/CostCard";
import LimitCard from "../common/card/select/LimitCard";
import * as React from "react";
import {useState} from "react";
import TalentModifierCard from "./modifier/TalentModifierCard";
import TalentCareerSkillsCard from "./skill/TalentCareerSkillsCard";
import NumberTextFieldCard from "../common/card/NumberTextFieldCard";
import {StatsType} from "../../models/actor/Stats";
import Cost, {CostType} from "../../models/common/Cost";
import Limit, {LimitType} from "../../models/common/Limit";
import GridContainer from "../common/grid/GridContainer";

interface Props {
    talent: Talent;
    updateTalent: (talent: Talent) => void;
    disabled: boolean;
}

const TalentModifierTab: React.FC<Props> = ({talent, updateTalent, disabled})=> {
    const [state, setState] = useState({
        cost: !(talent.cost.type === CostType.None && talent.limit.type === LimitType.None),
        careerSkill: talent.talentSkills.potentialCareerSkills.length > 0,
        stats: talent.talentStats.wounds > 0 || talent.talentStats.strain > 0 || talent.talentStats.soak > 0 || talent.talentStats.defense > 0
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const handleCostChange = async (value: Cost) => {
        if (talent) {
            updateTalent({...talent, cost: value});
        }
    };

    const handleLimitChange = async (value: Limit) => {
        if (talent) {
            updateTalent({...talent, limit: value});
        }
    };

    const handleTalentSkillsChange = async (value: TalentSkills) => {
        if (talent) {
            updateTalent({...talent, talentSkills: value});
        }
    };

    const handleWoundsChange = async (value: number) => {
        if (talent) {
            updateTalent({
                ...talent,
                talentStats: {
                    wounds: value,
                    strain: talent.talentStats.strain,
                    soak: talent.talentStats.soak,
                    defense: talent.talentStats.defense
                }
            });
        }
    };

    const handleStrainChange = async (value: number) => {
        if (talent) {
            updateTalent({
                ...talent,
                talentStats: {
                    wounds: value,
                    strain: talent.talentStats.strain,
                    soak: talent.talentStats.soak,
                    defense: talent.talentStats.defense
                }
            });
        }
    };

    const handleSoakChange = async (value: number) => {
        if (talent) {
            updateTalent({
                ...talent,
                talentStats: {
                    wounds: talent.talentStats.wounds,
                    strain: talent.talentStats.strain,
                    soak: value,
                    defense: talent.talentStats.defense
                }
            });
        }
    };

    const handleDefenseChange = async (value: number) => {
        if (talent) {
            updateTalent({
                ...talent,
                talentStats: {
                    wounds: talent.talentStats.wounds,
                    strain: talent.talentStats.strain,
                    soak: talent.talentStats.soak,
                    defense: value
                }
            });
        }
    };

    return (
        <GridContainer centered>
            <GridContainer centered>
                <FormControl sx={{m: 3}} component="fieldset" variant="standard" disabled={disabled}>
                    <FormLabel component="legend" sx={{textAlign: 'center'}}>Talent Modifiers</FormLabel>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.cost} onChange={handleChange} name="cost"/>
                            }
                            label="Cost"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.careerSkill} onChange={handleChange} name="careerSkill"/>
                            }
                            label="Career Skills"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.stats} onChange={handleChange} name="stats"/>
                            }
                            label="Stats"
                        />
                    </FormGroup>
                </FormControl>
            </GridContainer>
            {state.cost && <GridContainer spacing={2}>
                <CostCard initialCost={talent.cost} onChange={handleCostChange}
                          disabled={disabled}/>
                <LimitCard initialLimit={talent.limit} onChange={handleLimitChange}
                           disabled={disabled}/>
            </GridContainer>}
            {state.careerSkill && <GridContainer spacing={2}>
                <TalentCareerSkillsCard talentSkills={talent.talentSkills}
                                        updateTalentSkills={handleTalentSkillsChange}
                                        disabled={disabled}/>
            </GridContainer>}
            {state.stats && <GridContainer spacing={2}>
                <NumberTextFieldCard title={StatsType.Wounds + ' Threshold'} value={talent.talentStats.wounds}
                                     onChange={handleWoundsChange} min={0} max={5}
                                     disabled={disabled}/>
                <NumberTextFieldCard title={StatsType.Strain + ' Threshold'} value={talent.talentStats.strain}
                                     onChange={handleStrainChange} min={0} max={5}
                                     disabled={disabled}/>
                <NumberTextFieldCard title={'Soak'} value={talent.talentStats.soak}
                                     onChange={handleSoakChange} min={0} max={5}
                                     disabled={disabled}/>
                <NumberTextFieldCard title={'Defense'} value={talent.talentStats.defense}
                                     onChange={handleDefenseChange} min={0} max={5}
                                     disabled={disabled}/>
            </GridContainer>}
            <TalentModifierCard tal={talent}/>
        </GridContainer>
    );
};

export default TalentModifierTab;