import {MenuItem, Select} from "@mui/material";
import GenesysSkillDiceTypography from "./typography/GenesysSkillDiceTypography.tsx";
import type {PlayerCharacter, PlayerSkill} from "../../../api/model";
import React from "react";
import {getPlayerSkillCharacteristicRanks} from "../../../util/SkillHelper.ts";

interface Props {
    player: PlayerCharacter
    onChange: (skill: PlayerSkill) => void;
}

const PlayerSkillSelectWithDice: React.FC<Props> = ({player, onChange}) => {

    const onCommit = (name: string) => {
        const selectedSkill = player.skills.find((sk) => sk.name === name) as PlayerSkill;
        onChange(selectedSkill);
    }

    return (
        <Select onChange={(e) => onCommit(String(e.target.value))} fullWidth label={'Skill'}>
            {player.skills.filter(skill => skill.initiative).map(skill => (
                <MenuItem value={skill.name}>
                    <GenesysSkillDiceTypography characteristicRanks={getPlayerSkillCharacteristicRanks(player, skill)}
                                                skillRanks={skill.ranks} name={skill.name}/>
                </MenuItem>
            ))}
        </Select>
    );
};

export default PlayerSkillSelectWithDice;