import {
    type AdversarySkill,
    type AdversaryTemplate,
    type Difficulty,
    type PlayerCharacter,
    type PlayerSkill
} from "../../../api/model";
import React, {useState} from "react";
import {getDifficultyDice} from "../../../util/DiceHelper.ts";
import {Button, TableCell} from "@mui/material";
import GenesysSkillDiceTypography from "./typography/GenesysSkillDiceTypography.tsx";
import DiceRollerDialog from "../../roll/DiceRollerDialog.tsx";
import {getAdversaryCharacteristicRanks, getPlayerSkillCharacteristicRanks} from "../../../util/SkillHelper.ts";

interface Target {
    adversary: AdversaryTemplate;
    adversarySkill: AdversarySkill;
}

interface Props {
    player: PlayerCharacter;
    skill: PlayerSkill;
    difficulty?: Difficulty;
    target?: Target;
}

const GenesysPlayerDicePoolButton: React.FC<Props> = ({ player, skill, difficulty, target }) => {
    const [openCustomRollBackDrop, setOpenCustomRollBackDrop] = useState(false);

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
        <TableCell style={{ textAlign: 'center' }}>
            <Button onClick={() => setOpenCustomRollBackDrop(true)}>
                {!difficulty && !target && (
                    <GenesysSkillDiceTypography
                        characteristicRanks={getPlayerSkillCharacteristicRanks(player, skill)}
                        skillRanks={skill.ranks}
                    />
                )}
                {difficulty && (
                    <GenesysSkillDiceTypography
                        characteristicRanks={getPlayerSkillCharacteristicRanks(player, skill)}
                        skillRanks={skill.ranks}
                        difficulty={dicePool.difficulty}
                    />
                )}
                {target && (
                    <GenesysSkillDiceTypography
                        characteristicRanks={getPlayerSkillCharacteristicRanks(player, skill)}
                        skillRanks={skill.ranks}
                        target={{
                            characteristicRanks: getAdversaryCharacteristicRanks(target.adversary, target.adversarySkill),
                            skillRanks: target.adversarySkill.ranks,
                        }}
                    />
                )}
            </Button>
            {openCustomRollBackDrop && (
                <DiceRollerDialog
                    open={openCustomRollBackDrop}
                    onClose={() => setOpenCustomRollBackDrop(false)}
                    boost={dicePool.boost}
                    setback={dicePool.setback}
                    ability={dicePool.ability}
                    difficulty={dicePool.difficulty}
                    proficiency={dicePool.proficiency}
                    challenge={dicePool.challenge}
                />
            )}
        </TableCell>
    );
};