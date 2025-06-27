import { FC, useEffect } from "react";
import GridItem from "../../grid/GridItem";
import { Card, CardContent, Select, MenuItem, Typography } from "@mui/material";
import { ActorSkill, getActorCharacteristicRanks } from "../../../../models/actor/Actor";
import GenesysSkillDiceTypography from "../../typography/GenesysSkillDiceTypography";
import CenteredCardHeader from "../header/CenteredCardHeader";
import { SingleNonPlayerCharacter } from "../../../../models/actor/npc/NonPlayerActor";

type Props = {
    npc: SingleNonPlayerCharacter;
    skills: ActorSkill[];
    handleSkillChange: (newValue: ActorSkill) => void;
    startingSkill: ActorSkill;
    disabled: boolean;
};

const SingleNonPlayerCharacterSkillSelectCard: FC<Props> = ({ npc, skills, handleSkillChange, startingSkill, disabled }) => {

    const onCommit = (name: string) => {
        let selectedSkill = npc.skills.find((sk) => sk.name === name) as ActorSkill;
        handleSkillChange(selectedSkill);
    };
    useEffect(() => {
        return () => {
            console.log('Unmounting', { startingSkill, skills });
        };
    }, []);


    return (
        <GridItem>
            <Card>
                <CenteredCardHeader title={npc.name} />
                <CardContent>
                    <Select
                        value={startingSkill?.name ?? ''}
                        onChange={(e) => onCommit(String(e.target.value))}
                        fullWidth
                        label={'Skill'}
                        disabled={disabled}
                        displayEmpty
                    >
                        <MenuItem key={'None'} value="">
                            <em>None</em>
                        </MenuItem>
                        {skills.map(skill => (
                            <MenuItem key={skill.name} value={skill.name}>
                                <Typography>{skill.name}</Typography>
                                <GenesysSkillDiceTypography characteristicRanks={getActorCharacteristicRanks(npc, skill)}
                                    skillRanks={skill.ranks} />
                            </MenuItem>
                        ))}
                    </Select>
                </CardContent>
            </Card>
        </GridItem>
    )
};

export default SingleNonPlayerCharacterSkillSelectCard;