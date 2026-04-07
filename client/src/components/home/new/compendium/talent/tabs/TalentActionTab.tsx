import * as React from 'react';
import {useState} from 'react';
import {Box, Card, CardContent, FormControlLabel, MenuItem, Stack, Switch, TextField, Typography} from '@mui/material';
import type {Difficulty, Skill, Talent, TalentSkillCheck} from '../../../../../../api/model';
import {StatusEffectType} from '../../../../../../api/model';
import {useFetchAllSkills} from '../../../../../../hooks/useFetchAllSkills.ts';
import SkillAutocompleteCard from '../../../../../common/card/SkillAutocompleteCard.tsx';
import DifficultyCard from '../../../../../common/card/select/DifficultyCard.tsx';
import GridContainer from '../../../../../common/grid/GridContainer.tsx';
import GridItem from '../../../../../common/grid/GridItem.tsx';
import GenesysNumberField from '../../../../common/field/GenesysNumberField.tsx';

interface Props {
    talent: Talent;
    updateTalent: (talent: Talent) => void;
}

const TalentActionTab: React.FC<Props> = ({talent, updateTalent}) => {
    const {skills} = useFetchAllSkills();
    const check: TalentSkillCheck = talent.talentSkillCheck ?? {skill: null, difficulty: null, opposedSkill: null};
    const [opposed, setOpposed] = useState<boolean>(!!check.opposedSkill);

    const patchCheck = (patch: Partial<TalentSkillCheck>) => {
        updateTalent({...talent, talentSkillCheck: {...check, ...patch}});
    };

    const handleOpposedToggle = () => {
        const next = !opposed;
        setOpposed(next);
        if (!next) {
            patchCheck({opposedSkill: null, onSuccessCondition: null});
        } else {
            patchCheck({difficulty: null});
        }
    };

    return (
        <Stack spacing={3}>
            <Card>
                <CardContent>
                    <Typography variant="subtitle2" sx={{mb: 2, fontWeight: 'bold', color: 'primary.main'}}>
                        Skill Check
                    </Typography>
                    <GridContainer spacing={2}>
                        <SkillAutocompleteCard
                            title="User Skill"
                            disabled={false}
                            skills={skills}
                            startingSkill={check.skill as unknown as Skill}
                            handleSkillChange={(value: Skill) => patchCheck({skill: value as TalentSkillCheck['skill']})}
                        />
                    </GridContainer>
                    <GridContainer centered>
                        <FormControlLabel
                            control={<Switch checked={opposed} onChange={handleOpposedToggle}/>}
                            label="Opposed Check"
                            sx={{textAlign: 'center', mt: 1}}
                        />
                    </GridContainer>
                    <GridContainer spacing={2}>
                        {!opposed && (
                            <DifficultyCard
                                value={check.difficulty as Difficulty}
                                onChange={(value: Difficulty) => patchCheck({difficulty: value})}
                                disabled={false}
                            />
                        )}
                        {opposed && (
                            <SkillAutocompleteCard
                                title="Target Skill"
                                disabled={false}
                                skills={skills}
                                startingSkill={check.opposedSkill as unknown as Skill}
                                handleSkillChange={(value: Skill) =>
                                    patchCheck({opposedSkill: value as TalentSkillCheck['opposedSkill']})
                                }
                            />
                        )}
                    </GridContainer>
                </CardContent>
            </Card>

            {opposed && (
                <Card>
                    <CardContent>
                        <Typography variant="subtitle2" sx={{mb: 2, fontWeight: 'bold', color: 'primary.main'}}>
                            On Success: Inflict Condition
                        </Typography>
                        <GridContainer spacing={2}>
                            <GridItem>
                                <TextField
                                    select
                                    fullWidth
                                    label="Condition"
                                    value={check.onSuccessCondition?.type ?? ''}
                                    onChange={(e) => {
                                        const type = e.target.value as typeof StatusEffectType[keyof typeof StatusEffectType];
                                        patchCheck({
                                            onSuccessCondition: type
                                                ? {type, rounds: check.onSuccessCondition?.rounds ?? 1}
                                                : null,
                                        });
                                    }}
                                >
                                    <MenuItem value="">— None —</MenuItem>
                                    {Object.values(StatusEffectType).map((t) => (
                                        <MenuItem key={t} value={t}>{t}</MenuItem>
                                    ))}
                                </TextField>
                            </GridItem>
                            {check.onSuccessCondition?.type && (
                                <GridItem>
                                    <Box sx={{maxWidth: 160}}>
                                        <GenesysNumberField
                                            value={check.onSuccessCondition?.rounds ?? 1}
                                            label="Rounds"
                                            min={1}
                                            max={10}
                                            onChange={(value) =>
                                                patchCheck({
                                                    onSuccessCondition: {
                                                        ...check.onSuccessCondition!,
                                                        rounds: value,
                                                    },
                                                })
                                            }
                                        />
                                    </Box>
                                </GridItem>
                            )}
                        </GridContainer>
                    </CardContent>
                </Card>
            )}
        </Stack>
    );
};

export default TalentActionTab;
