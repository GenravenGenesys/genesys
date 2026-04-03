import type {ArchetypeSkill, Skill} from "../../../../../api/model";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import {Card, CardContent, Chip, Stack, Typography} from "@mui/material";
import GridItem from "../../../../common/grid/GridItem.tsx";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader.tsx";
import SkillAutocompleteCard from "../../../../common/card/SkillAutocompleteCard.tsx";
import type {Archetype} from "../../../../../api/model";

interface Props {
    archetype: Archetype;
    skills: Skill[];
    updateArchetypeSkills: (archetypeSkills: ArchetypeSkill[]) => void;
}

export default function ArchetypeSkills(props: Props) {
    const {archetype, skills, updateArchetypeSkills} = props;

    const handleSkillChoice = (index: number, chosen: Skill) => {
        const updated = archetype.skills.map((entry, i) =>
            i === index ? {...entry, skill: chosen} : entry
        );
        updateArchetypeSkills(updated);
    };

    const getFilteredSkills = (entry: ArchetypeSkill): Skill[] => {
        if (entry.requiredSkillType) {
            return skills.filter(s => s.type === entry.requiredSkillType);
        }
        return skills;
    };

    const getRankLabel = (entry: ArchetypeSkill): string => {
        const rankWord = entry.startingRanks === 1 ? "1 rank" : "2 ranks";
        return `Starts with ${rankWord} • Cannot exceed rank ${entry.maxRank} during character creation`;
    };

    const getChoiceTitle = (entry: ArchetypeSkill): string => {
        if (entry.requiredSkillType) return `${entry.requiredSkillType} Skill (Your Choice)`;
        if (entry.nonCareer) return "Non-Career Skill (Your Choice)";
        return "Skill (Your Choice)";
    };

    return (
        <GridContainer spacing={3} centered>
            {archetype.skills.map((entry, index) => (
                <GridItem key={index}>
                    <Card variant="outlined">
                        <CenteredCardHeader title="Starting Skill"/>
                        <CardContent>
                            <Stack spacing={1} alignItems="center">
                                {entry.playerChoice ? (
                                    <SkillAutocompleteCard
                                        title={getChoiceTitle(entry)}
                                        disabled={false}
                                        handleSkillChange={(skill) => handleSkillChoice(index, skill)}
                                        skills={getFilteredSkills(entry)}
                                        startingSkill={entry.skill as Skill}
                                    />
                                ) : (
                                    <Typography variant="body1" fontWeight="bold">
                                        {entry.skill?.name ?? '—'}
                                    </Typography>
                                )}
                                <Typography variant="caption" color="text.secondary" textAlign="center">
                                    {getRankLabel(entry)}
                                </Typography>
                                {entry.nonCareer && (
                                    <Chip label="Non-Career Only" size="small" color="warning"/>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </GridItem>
            ))}
        </GridContainer>
    );
}
