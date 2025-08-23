import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import {Card, CardContent, MenuItem, Select} from "@mui/material";
import * as React from "react";
import {ActorSkill, getActorCharacteristicRanks} from "../../../../models/actor/Actor";
import GenesysSkillDiceTypography from "../../../common/typography/GenesysSkillDiceTypography";
import Typography from "@mui/material/Typography";

interface Props {
    npc: SingleNonPlayerCharacter
    onChange: (index: number, skill: ActorSkill) => void
    index: number
}

export default function NonPlayerCharacterInitiativeCard(props: Props) {
    const {npc, onChange, index} = props;

    const onCommit = (index: number, name: string) => {
        const selectedSkill = npc.skills.find((sk) => sk.name === name) as ActorSkill;
        onChange(index, selectedSkill);
    }

    return (
        <Card>
            <CenteredCardHeader title={npc.name}/>
            <CardContent>
                <Select
                    onChange={(e) => onCommit(index, String(e.target.value))}
                    fullWidth
                    label={'Skill'}
                >
                    {npc.skills.filter(skill => skill.initiative).map(skill => (
                        <MenuItem value={skill.name}>
                            <Typography>{skill.name}</Typography>
                            <GenesysSkillDiceTypography characteristicRanks={getActorCharacteristicRanks(npc, skill)}
                                                        skillRanks={skill.ranks}/>
                        </MenuItem>
                    ))}
                </Select>
            </CardContent>
        </Card>
    )
}