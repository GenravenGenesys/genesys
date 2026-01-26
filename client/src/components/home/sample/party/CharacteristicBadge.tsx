import React from 'react';
import {Box, Typography, IconButton} from '@mui/material';
import {styled} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import type {SkillCharacteristic} from "../../../../api/model";

interface CharacteristicBadgeProps {
    value: number;
    label: SkillCharacteristic;
    color?: string;
    onIncrease?: () => void;
    onDecrease?: () => void;
    editable?: boolean;
}

const HexagonBox = styled(Box)<{ bgColor?: string }>(({theme, bgColor}) => ({
    position: 'relative',
    width: 100,
    height: 115,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',

    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: bgColor || theme.palette.primary.main,
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        zIndex: 1,
    },
}));

const CircleBox = styled(Box)(({theme}) => ({
    position: 'relative',
    width: 70,
    height: 70,
    borderRadius: '50%',
    backgroundColor: theme.palette.background.paper,
    border: `3px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
}));

export const CharacteristicBadge: React.FC<CharacteristicBadgeProps> = ({
                                                                            value,
                                                                            label,
                                                                            color,
                                                                            onIncrease,
                                                                            onDecrease,
                                                                            editable = false,
                                                                        }) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
            <HexagonBox bgColor={color}>
                <CircleBox>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 'bold',
                            fontFamily: 'Arial Black, sans-serif',
                            color: 'text.primary',
                        }}
                    >
                        {value}
                    </Typography>
                </CircleBox>
            </HexagonBox>

            <Typography
                variant="caption"
                sx={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                }}
            >
                {label}
            </Typography>

            {editable && (
                <Box sx={{display: 'flex', gap: 1}}>
                    <IconButton
                        size="small"
                        onClick={onDecrease}
                        aria-label="decrease"
                    >
                        <RemoveIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={onIncrease}
                        aria-label="increase"
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};