import {Card, CardContent, FormControlLabel, Grid, Switch} from "@mui/material";
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

interface Props {
    talent: Talent
    updateTalent: (talent: Talent) => void
    disabled: boolean
}

export default function TalentSkillCheckCard(props: Props) {
    const {talent, updateTalent, disabled} = props;
    const [opposed, setOpposed] = useState<boolean>(!talent.talentSkillCheck.difficulty);
    const skills = useFetchAllSkills();

    const handleChange = () => {
        setOpposed(!opposed);
    }

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
        <Grid item xs>
            <Card sx={{width: 1}}>
                <CenteredCardHeader title={'Skill Check'}/>
                <Grid container justifyContent={'center'}>
                    <FormControlLabel control={<Switch checked={opposed} onChange={handleChange}/>}
                                      label="Opposed Check" disabled={disabled}
                                      sx={{textAlign: 'center'}}/>
                </Grid>
                <CardContent>
                    <Grid container justifyContent={'center'}>
                        <SkillAutocompleteCard disabled={disabled} handleSkillChange={handleSkillChange}
                                               skills={skills}
                                               startingSkill={talent.talentSkillCheck.skill} title={'User Skill'}/>
                        {!opposed &&
                            <DifficultyCard value={talent.talentSkillCheck.difficulty} onChange={handleDifficultyChange}
                                            disabled={disabled}/>}
                        {opposed &&
                            <SkillAutocompleteCard disabled={disabled} handleSkillChange={handleOpposedSkillChange}
                                                   skills={skills}
                                                   startingSkill={talent.talentSkillCheck.opposedSkill} title={'Target Skill'}/>}
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}