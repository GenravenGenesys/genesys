import {MenuItem, TextField} from "@mui/material";
import GenesysSkillDiceTypography from "./typography/GenesysSkillDiceTypography.tsx";
import React from "react";
import {getPlayerSkillCharacteristicRanks} from "../../../util/SkillHelper.ts";
import type {PlayerCharacter, PlayerSkill} from "../../../api/model";

interface Props {
    player: PlayerCharacter
    defaultSkill?: PlayerSkill;
    onChange: (skill: PlayerSkill) => void;
}

const PlayerSkillSelectWithDice: React.FC<Props> = ({player, defaultSkill, onChange}) => {

    const onCommit = (name: string) => {
        const selectedSkill = player.skills.find((sk) => sk.name === name) as PlayerSkill;
        onChange(selectedSkill);
    }

    return (
        <TextField
            value={defaultSkill?.name}
            select
            onChange={(e) => onCommit(String(e.target.value))}
            fullWidth
            label={'Skill'}
        >
            {player.skills.filter(skill => skill.initiative).map(skill => (
                <MenuItem value={skill.name}>
                    <GenesysSkillDiceTypography characteristicRanks={getPlayerSkillCharacteristicRanks(player, skill)}
                                                skillRanks={skill.ranks} name={skill.name}/>
                </MenuItem>
            ))}
        </TextField>
    );
};

export default PlayerSkillSelectWithDice;