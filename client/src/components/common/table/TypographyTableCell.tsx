import React, { useState } from "react";
import { Button, TableCell, Typography } from "@mui/material";
import GenesysDescriptionTypography from "../typography/GenesysDescriptionTypography";
import Actor, { ActorSkill, getActorCharacteristicRanks } from "../../../models/actor/Actor";
import GenesysSkillDiceTypography from "../typography/GenesysSkillDiceTypography";
import { Difficulty, getDifficultyDice } from "../../../models/common/Difficulty";
import GenesysDifficultyDiceTypography from "../typography/GenesysDifficultyDiceTypography";
import Cost, { CostType } from "../../../models/common/Cost";
import Limit, { LimitType } from "../../../models/common/Limit";
// import { GenesysSymbols } from "../../../models/roll/GenesysSymbols";
import DiceRollerDialog from "../../roll/DiceRollerDialog";

interface LeftProps {
    value: string;
}

const TypographyLeftTableCell: React.FC<LeftProps> = ({ value }) => (
    <TableCell style={{ textAlign: 'left' }} key={value}>
        <Typography>{value}</Typography>
    </TableCell>
);

interface CenterProps {
    value: string;
    span?: number;
}

const TypographyCenterTableCell: React.FC<CenterProps> = ({ value, span }) => (
    <TableCell style={{ textAlign: 'center' }} colSpan={span} key={value}>
        <Typography>{value}</Typography>
    </TableCell>
);

interface ButtonProps {
    value: string;
    onClick: () => void;
}

const TableCellButton: React.FC<ButtonProps> = ({ value, onClick }) => (
    <TableCell style={{ textAlign: 'center' }}>
        <Button onClick={onClick}>
            {value}
        </Button>
    </TableCell>
);

interface CostProps {
    cost: Cost;
    span?: number;
}

const CostTableCell: React.FC<CostProps> = ({ cost, span }) => {
    const renderCost = () => {
        switch (cost.type) {
            case CostType.None:
                return 'None';
            case CostType.Strain:
                return cost.amount + ' Strain';
            case CostType.StoryPoint:
                return cost.amount + ' Story Point';
        }
    };

    return (
        <TableCell style={{ textAlign: 'center' }} colSpan={span}>
            <Typography>{renderCost()}</Typography>
        </TableCell>
    );
};

interface LimitProps {
    limit: Limit;
    span?: number;
}

const LimitTableCell: React.FC<LimitProps> = ({ limit, span }) => {
    const renderLimit = () => {
        switch (limit.type) {
            case LimitType.PerRound:
                return limit.limit + ' Per Round';
            case LimitType.PerEncounter:
                return limit.limit + ' Per Encounter';
            case LimitType.PerSession:
                return limit.limit + ' Per Session';
            case LimitType.None:
                return 'None';
        }
    };

    return (
        <TableCell style={{ textAlign: 'center' }} colSpan={span}>
            <Typography>{renderLimit()}</Typography>
        </TableCell>
    );
};

interface DescriptionCenterProps {
    value: string;
    span?: number;
}

const GenesysDescriptionTypographyCenterTableCell: React.FC<DescriptionCenterProps> = ({ value, span }) => (
    <TableCell style={{ textAlign: 'center' }} colSpan={span}>
        <GenesysDescriptionTypography text={value} />
    </TableCell>
);

interface Target {
    actor: Actor;
    skill: ActorSkill;
}

interface DiceRollProps {
    actor: Actor;
    skill: ActorSkill;
    difficulty?: Difficulty;
    target?: Target;
}

const GenesysDicePoolCenterTableCellButton: React.FC<DiceRollProps> = ({ actor, skill, difficulty, target }) => {
    const [openCustomRollBackDrop, setOpenCustomRollBackDrop] = useState(false);

    const gatherBoostDice = () => 0;

    const gatherSetbackDice = () => 0;

    const gatherAbilityDice = () =>
        Math.max(getActorCharacteristicRanks(actor, skill), skill.ranks) -
        Math.min(getActorCharacteristicRanks(actor, skill), skill.ranks);

    const gatherDifficultyDice = () =>
        difficulty
            ? getDifficultyDice(difficulty)
            : target
                ? Math.max(getActorCharacteristicRanks(target.actor, target.skill), target.skill.ranks) -
                Math.min(getActorCharacteristicRanks(target.actor, target.skill), target.skill.ranks)
                : 0;

    const gatherProficiencyDice = () =>
        Math.min(getActorCharacteristicRanks(actor, skill), skill.ranks);

    const gatherChallengeDice = () =>
        target ? Math.min(getActorCharacteristicRanks(target.actor, target.skill), target.skill.ranks) : 0;

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
                        characteristicRanks={getActorCharacteristicRanks(actor, skill)}
                        skillRanks={skill.ranks}
                    />
                )}
                {difficulty && (
                    <GenesysSkillDiceTypography
                        characteristicRanks={getActorCharacteristicRanks(actor, skill)}
                        skillRanks={skill.ranks}
                        difficulty={dicePool.difficulty}
                    />
                )}
                {target && (
                    <GenesysSkillDiceTypography
                        characteristicRanks={getActorCharacteristicRanks(actor, skill)}
                        skillRanks={skill.ranks}
                        target={{
                            characteristicRanks: getActorCharacteristicRanks(target.actor, target.skill),
                            skillRanks: target.skill.ranks,
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

interface DifficultyProps {
    difficulty: Difficulty;
}

const GenesysDifficultyCenterTableCell: React.FC<DifficultyProps> = ({ difficulty }) => (
    <TableCell style={{ textAlign: 'center' }}>
        <GenesysDifficultyDiceTypography difficulty={difficulty} />
    </TableCell>
);

export {
    TypographyLeftTableCell,
    TypographyCenterTableCell,
    TableCellButton,
    CostTableCell,
    LimitTableCell,
    GenesysDescriptionTypographyCenterTableCell,
    GenesysDicePoolCenterTableCellButton,
    GenesysDifficultyCenterTableCell,
};