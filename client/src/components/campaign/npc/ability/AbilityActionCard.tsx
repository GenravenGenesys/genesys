import { FC, useState } from "react";
import Action from "../../../../models/campaign/encounter/Action";
import GridItem from "../../../common/grid/GridItem";
import { Card, CardContent, FormControlLabel, Switch } from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import GridContainer from "../../../common/grid/GridContainer";
import RangeBandCard from "../../../common/card/select/RangeBandCard";
import { RangeBand } from "../../../../models/common/RangeBand";
import { useFetchAllSkills } from "../../../skills/SkillWorkflow";
import { ActorSkill } from "../../../../models/actor/Actor";
import Skill from "../../../../models/actor/Skill";
import { Difficulty } from "../../../../models/common/Difficulty";
import SkillAutocompleteCard from "../../../common/card/SkillAutocompleteCard";
import DifficultyCard from "../../../common/card/select/DifficultyCard";
import { SingleNonPlayerCharacter } from "../../../../models/actor/npc/NonPlayerActor";
import SingleNonPlayerCharacterSkillSelectCard from "../../../common/card/select/SingleNonPlayerCharacterSkillSelectCard;";

type Props = {
    action: Action;
    npc: SingleNonPlayerCharacter;
    onChange: (action: Action) => void;
    disabled: boolean;
};

const AbilityActionCard: FC<Props> = ({ action, npc, onChange, disabled }) => {
    const [opposed, setOpposed] = useState<boolean>(!action.difficulty);
    const skills = useFetchAllSkills();

    const handleChange = () => {
        setOpposed(!opposed);
    };

    const handleSkillChange = (value: Skill) => {
        onChange({ ...action, skill: value as ActorSkill });
    };

    const handleDifficultyChange = (value: Difficulty) => {
        onChange({ ...action, difficulty: value, opposedSkill: {} as ActorSkill });
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
                            <SingleNonPlayerCharacterSkillSelectCard npc={npc} skills={npc.skills} handleSkillChange={handleSkillChange} startingSkill={action.skill} disabled={disabled} />
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

export default AbilityActionCard;