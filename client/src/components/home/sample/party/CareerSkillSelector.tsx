import React from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Alert,
    LinearProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import type {Skill} from "../../../../api/model";

interface CareerSkillSelectorProps {
    careerSkills: Skill[];
    selectedSkills: Skill[];
    onSkillToggle: (skill: Skill) => void;
}

export const CareerSkillSelector: React.FC<CareerSkillSelectorProps> = ({
                                                                            careerSkills,
                                                                            selectedSkills,
                                                                            onSkillToggle,
                                                                        }) => {
    const isSelected = (skill: Skill) => selectedSkills.includes(skill);
    const canSelectMore = selectedSkills.length < 4;

    const handleSkillClick = (skill: Skill) => {
        if (isSelected(skill)) {
            onSkillToggle(skill);
        } else if (canSelectMore) {
            onSkillToggle(skill);
        }
    };

    const progress = (selectedSkills.length / 4) * 100;

    return (
        <Box>
            <Box sx={{mb: 3}}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <Typography variant="h6">Select Career Skills</Typography>
                    <Chip
                        label={`${selectedSkills.length} / ${4} Selected`}
                        color={
                            selectedSkills.length === 4 ? "success" : "default"
                        }
                        sx={{fontWeight: "bold"}}
                    />
                </Box>

                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "grey.200",
                        "& .MuiLinearProgress-bar": {
                            backgroundColor:
                                selectedSkills.length === 4
                                    ? "success.main"
                                    : "primary.main",
                        },
                    }}
                />

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{mt: 0.5, display: "block"}}
                >
                    Choose 4 skills from your career to receive 1 free rank
                </Typography>
            </Box>

            {selectedSkills.length === 4 && (
                <Alert severity="success" sx={{mb: 2}}>
                    All career skills selected!
                </Alert>
            )}

            <Grid container spacing={2}>
                {careerSkills.map((skill) => {
                    const selected = isSelected(skill);
                    const disabled = !selected && !canSelectMore;

                    return (
                        <Grid sx={{xs: 12, sm: 6, md: 3}}>
                            <Card
                                onClick={() => handleSkillClick(skill)}
                                sx={{
                                    cursor: disabled ? "not-allowed" : "pointer",
                                    border: 2,
                                    borderColor: selected ? "success.main" : "divider",
                                    backgroundColor: selected
                                        ? "success.light"
                                        : disabled
                                            ? "action.disabledBackground"
                                            : "background.paper",
                                    opacity: disabled ? 0.5 : 1,
                                    transition: "all 0.2s",
                                    position: "relative",
                                    "&:hover": {
                                        borderColor: selected
                                            ? "success.dark"
                                            : disabled
                                                ? "divider"
                                                : "primary.main",
                                        transform: disabled ? "none" : "translateY(-2px)",
                                        boxShadow: disabled ? 1 : 3,
                                    },
                                }}
                            >
                                <CardContent>
                                    {/* Selection Icon */}
                                    <Box sx={{position: "absolute", top: 8, right: 8}}>
                                        {selected ? (
                                            <CheckCircleIcon color="success" sx={{fontSize: 28}}/>
                                        ) : (
                                            <RadioButtonUncheckedIcon
                                                sx={{color: "action.disabled", fontSize: 28}}
                                            />
                                        )}
                                    </Box>

                                    {/* Skill Name */}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mb: 1,
                                            pr: 4,
                                            fontWeight: selected ? "bold" : "normal",
                                            color: selected ? "success.dark" : "text.primary",
                                        }}
                                    >
                                        {skill.name}
                                    </Typography>

                                    {/* Characteristic */}
                                    <Chip
                                        label={skill.characteristic}
                                        size="small"
                                        sx={{
                                            mb: 1,
                                            backgroundColor: selected ? "success.main" : "grey.300",
                                            color: selected ? "white" : "text.secondary",
                                            fontWeight: "bold",
                                        }}
                                    />

                                    {/*/!* Description *!/*/}
                                    {/*{skill.description && (*/}
                                    {/*    <Typography*/}
                                    {/*        variant="caption"*/}
                                    {/*        color="text.secondary"*/}
                                    {/*        sx={{display: "block", mt: 1}}*/}
                                    {/*    >*/}
                                    {/*        {skill.description}*/}
                                    {/*    </Typography>*/}
                                    {/*)}*/}
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};
