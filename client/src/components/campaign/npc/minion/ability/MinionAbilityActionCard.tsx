import { FC, useState } from "react";
import Minion from "../../../../../models/actor/npc/Minion";
import { Card, CardContent, FormControlLabel, Switch } from "@mui/material";
import { ActorSkill } from "../../../../../models/actor/Actor";
import Skill from "../../../../../models/actor/Skill";
import Action from "../../../../../models/campaign/encounter/Action";
import { Difficulty } from "../../../../../models/common/Difficulty";
import { RangeBand } from "../../../../../models/common/RangeBand";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader";
import DifficultyCard from "../../../../common/card/select/DifficultyCard";
import RangeBandCard from "../../../../common/card/select/RangeBandCard";
import SkillAutocompleteCard from "../../../../common/card/SkillAutocompleteCard";
import GridContainer from "../../../../common/grid/GridContainer";
import GridItem from "../../../../common/grid/GridItem";
import { useFetchAllSkills } from "../../../../skills/SkillWorkflow";

type Props = {
    action: Action;
    minion: Minion;
    onChange: (action: Action) => void;
    disabled: boolean;
};

const MinionAbilityActionCard: FC<Props> = ({ action, minion, onChange, disabled }) => {
    const [opposed, setOpposed] = useState<boolean>(!action.difficulty);
    const skills = useFetchAllSkills();

    const handleChange = () => {
        setOpposed(!opposed);
    };

    const handleSkillChange = (value: Skill) => {
        onChange({ ...action, skill: value as ActorSkill });
    };

    const handleDifficultyChange = (value: Difficulty) => {
        onChange({ ...action, difficulty: value });
    };

    const handleOpposedSkillChange = (value: Skill) => {
        onChange({ ...action, opposedSkill: value as ActorSkill });
    };

    const handleRangeBandUpdate = (value: RangeBand) => {
        onChange({ ...action, rangeBand: value })
    };

    return (
        <GridItem>
            <Card>
                <CenteredCardHeader title={'Action Information'} />
                <CardContent>
                    <GridContainer spacing={2}>
                        <CenteredCardHeader title={'Skill Check'} />
                        <GridContainer centered>
                            <FormControlLabel control={<Switch checked={opposed} onChange={handleChange} />}
                                label="Opposed Check" disabled={disabled}
                                sx={{ textAlign: 'center' }} />
                        </GridContainer>
                        <GridContainer centered>
                            <SkillAutocompleteCard disabled={disabled} handleSkillChange={handleSkillChange}
                                skills={skills}
                                startingSkill={action.skill} title={'User Skill'} />
                            {!opposed &&
                                <DifficultyCard value={action.difficulty} onChange={handleDifficultyChange}
                                    disabled={disabled} />}
                            {opposed &&
                                <SkillAutocompleteCard disabled={disabled} handleSkillChange={handleOpposedSkillChange}
                                    skills={skills}
                                    startingSkill={action.opposedSkill}
                                    title={'Target Skill'} />}
                        </GridContainer>
                    </GridContainer>
                    <GridContainer spacing={2}>
                        <RangeBandCard value={RangeBand.Engaged} onChange={handleRangeBandUpdate} disabled={disabled} />
                    </GridContainer>
                </CardContent>
            </Card>
        </GridItem>
    );
};

export default MinionAbilityActionCard;