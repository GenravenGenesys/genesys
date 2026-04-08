import React from "react";
import { Button, TableCell, Typography } from "@mui/material";
import GenesysDescriptionTypography from "../../home/common/typography/GenesysDescriptionTypography.tsx";
import GenesysDifficultyDiceTypography from "../../home/common/typography/GenesysDifficultyDiceTypography.tsx";
// import { GenesysSymbols } from "../../../models/roll/GenesysSymbols";
import {
    type Cost,
    CostType,
    type Difficulty,
    type Limit,
    LimitType,
} from "../../../api/model";

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
            case CostType.Story_Point:
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
            case LimitType.Per_Round:
                return limit.limit + ' Per Round';
            case LimitType.Per_Encounter:
                return limit.limit + ' Per Encounter';
            case LimitType.Per_Session:
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
    GenesysDifficultyCenterTableCell,
};