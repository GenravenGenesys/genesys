import {
    type AdversarySkill,
    type AdversaryTemplate,
    type Difficulty, type GenesysSymbolResults,
    type PlayerCharacter,
    type PlayerSkill
} from "../../../api/model";
import React from "react";
import {getDifficultyDice} from "../../../util/DiceHelper.ts";
import {Box, Button} from "@mui/material";
import GenesysSkillDiceTypography from "./typography/GenesysSkillDiceTypography.tsx";
import {getAdversaryCharacteristicRanks, getPlayerSkillCharacteristicRanks} from "../../../util/SkillHelper.ts";

interface Target {
    adversary: AdversaryTemplate;
    adversarySkill: AdversarySkill;
}

interface Props {
    player: PlayerCharacter;
    skill: PlayerSkill;
    baseResult: GenesysSymbolResults;
    difficulty?: Difficulty;
    target?: Target;
    onClick: () => void;
}

const SkillRollDisplayButton: React.FC<Props> = ({
                                                     player,
                                                     skill,
                                                     baseResult,
                                                     difficulty,
                                                     target,
                                                     onClick
                                                 }) => {
    const gatherBoostDice = () => 0;

    const gatherSetbackDice = () => 0;

    const gatherAbilityDice = () =>
        Math.max(getPlayerSkillCharacteristicRanks(player, skill), skill.ranks) -
        Math.min(getPlayerSkillCharacteristicRanks(player, skill), skill.ranks);

    const gatherDifficultyDice = () =>
        difficulty
            ? getDifficultyDice(difficulty)
            : target
                ? Math.max(getPlayerSkillCharacteristicRanks(player, skill), target.adversarySkill.ranks) -
                Math.min(getPlayerSkillCharacteristicRanks(player, skill), target.adversarySkill.ranks)
                : 0;

    const gatherProficiencyDice = () =>
        Math.min(getPlayerSkillCharacteristicRanks(player, skill), skill.ranks);

    const gatherChallengeDice = () =>
        target ? Math.min(getPlayerSkillCharacteristicRanks(player, skill), target.adversarySkill.ranks) : 0;

    const dicePool = {
        boost: gatherBoostDice(),
        setback: gatherSetbackDice(),
        ability: gatherAbilityDice(),
        difficulty: gatherDifficultyDice(),
        proficiency: gatherProficiencyDice(),
        challenge: gatherChallengeDice(),
    };

    return (
        <Box sx={{display: "flex", gap: 1}}>
            <Button onClick={onClick}>
                {!difficulty && !target && (
                    <GenesysSkillDiceTypography
                        characteristicRanks={getPlayerSkillCharacteristicRanks(player, skill)}
                        skillRanks={skill.ranks} name={skill.name}
                    />
                )}
                {difficulty && (
                    <GenesysSkillDiceTypography
                        characteristicRanks={getPlayerSkillCharacteristicRanks(player, skill)}
                        skillRanks={skill.ranks} name={skill.name}
                        difficulty={dicePool.difficulty}
                    />
                )}
                {target && (
                    <GenesysSkillDiceTypography
                        characteristicRanks={getPlayerSkillCharacteristicRanks(player, skill)}
                        skillRanks={skill.ranks} name={skill.name}
                        target={{
                            characteristicRanks: getAdversaryCharacteristicRanks(target.adversary, target.adversarySkill),
                            skillRanks: target.adversarySkill.ranks,
                        }}
                    />
                )}
            </Button>
        </Box>
    );
};

export default SkillRollDisplayButton;