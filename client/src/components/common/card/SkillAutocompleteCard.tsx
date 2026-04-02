import { Autocomplete, Card, CardContent, TextField } from "@mui/material";
import CenteredCardHeader from "./header/CenteredCardHeader";
import { renderBasicSkillName } from "../skill/SkillRenders";
import * as React from "react";
import ViewFieldCard from "../ViewFieldCard";
import GridItem from "../grid/GridItem";
import type {Skill} from "../../../api/model";

interface Props {
    title: string;
    disabled: boolean;
    handleSkillChange: (newValue: Skill) => void;
    skills: Skill[];
    startingSkill: Skill;
}

const SkillAutocompleteCard: React.FC<Props> = ({ handleSkillChange, disabled, startingSkill, skills, title }) => {
    return disabled ? <ViewFieldCard name={title} value={startingSkill ? startingSkill.name : ''} /> :
        <GridItem>
            <Card>
                <CenteredCardHeader title={title} />
                <CardContent>
                    <Autocomplete
                        options={skills}
                        getOptionLabel={(option) => renderBasicSkillName(option)}
                        value={startingSkill}
                        fullWidth
                        onChange={(_, newValue) => handleSkillChange(newValue as Skill)}
                        renderInput={(params) => <TextField {...params} label='Skill'
                            variant="outlined" />}
                        disabled={disabled}
                    />
                </CardContent>
            </Card>
        </GridItem>;
};

export default SkillAutocompleteCard;