import Skill from "../../../models/actor/Skill";
import {Autocomplete, Card, CardContent, Grid, TextField} from "@mui/material";
import CenteredCardHeader from "./header/CenteredCardHeader";
import {renderSkillName} from "../skill/SkillRenders";
import * as React from "react";
import ViewFieldCard from "../ViewFieldCard";

interface Props {
    disabled: boolean;
    handleSkillChange: (newValue: Skill) => void;
    skills: Skill[];
    startingSkill: Skill;
}

const SkillAutocompleteCard: React.FC<Props> = ({handleSkillChange, disabled, startingSkill, skills}) => {
    return disabled ? <ViewFieldCard name={'Skill'} value={startingSkill ? startingSkill.name : ''}/> :
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Skill'}/>
                <CardContent>
                    <Autocomplete
                        options={skills}
                        getOptionLabel={(option) => renderSkillName(option)}
                        value={startingSkill}
                        fullWidth
                        onChange={(e, newValue) => handleSkillChange(newValue as Skill)}
                        renderInput={(params) => <TextField {...params} label='Skill'
                                                            variant="outlined"/>}
                        disabled={disabled}
                    />
                </CardContent>
            </Card>
        </Grid>;
};

export default SkillAutocompleteCard;