import {Card, CardContent, FormControlLabel, Switch} from "@mui/material";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import * as React from "react";
import SkillAutocompleteCard from "../../common/card/SkillAutocompleteCard";
import Talent from "../../../models/Talent";
import {useFetchAllSkills} from "../../skills/SkillWorkflow";
import Skill from "../../../models/actor/Skill";
import {ActorSkill} from "../../../models/actor/Actor";
import DifficultyCard from "../../common/card/select/DifficultyCard";
import {Difficulty} from "../../../models/common/Difficulty";
import {useState} from "react";
import GridItem from "../../common/grid/GridItem";
import GridContainer from "../../common/grid/GridContainer";

type Props = {
    talent: Talent;
    updateTalent: (talent: Talent) => void;
    disabled: boolean;
};

const TalentSkillCheckCard: React.FC<Props> = ({talent, updateTalent, disabled}) => {
    const [opposed, setOpposed] = useState<boolean>(!talent.talentSkillCheck.difficulty);
    const skills = useFetchAllSkills();

    const handleChange = () => {
        setOpposed(!opposed);
    };

    const handleSkillChange = (value: Skill) => {
        updateTalent({...talent, talentSkillCheck: {...talent.talentSkillCheck, skill: value as ActorSkill}});
    };

    const handleDifficultyChange = (value: Difficulty) => {
        updateTalent({...talent, talentSkillCheck: {...talent.talentSkillCheck, difficulty: value}});
    };

    const handleOpposedSkillChange = (value: Skill) => {
        updateTalent({...talent, talentSkillCheck: {...talent.talentSkillCheck, opposedSkill: value as ActorSkill}});
    };

    return (
        <GridItem>
            <Card sx={{width: 1}}>
                <CenteredCardHeader title={'Skill Check'}/>
                <GridContainer centered>
                    <FormControlLabel control={<Switch checked={opposed} onChange={handleChange}/>}
                                      label="Opposed Check" disabled={disabled}
                                      sx={{textAlign: 'center'}}/>
                </GridContainer>
                <CardContent>
                    <GridContainer centered>
                        <SkillAutocompleteCard disabled={disabled} handleSkillChange={handleSkillChange}
                                               skills={skills}
                                               startingSkill={talent.talentSkillCheck.skill} title={'User Skill'}/>
                        {!opposed &&
                            <DifficultyCard value={talent.talentSkillCheck.difficulty} onChange={handleDifficultyChange}
                                            disabled={disabled}/>}
                        {opposed &&
                            <SkillAutocompleteCard disabled={disabled} handleSkillChange={handleOpposedSkillChange}
                                                   skills={skills}
                                                   startingSkill={talent.talentSkillCheck.opposedSkill}
                                                   title={'Target Skill'}/>}
                    </GridContainer>
                </CardContent>
            </Card>
        </GridItem>
    );
};

export default TalentSkillCheckCard;