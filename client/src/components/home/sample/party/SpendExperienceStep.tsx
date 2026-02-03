import {
    type Archetype,
    type PlayerCharacter,
    type PlayerSkill,
    type Skill,
    SkillCharacteristic,
    type Talent
} from "../../../../api/model";
import {Alert, Box, Stack, Tab, Tabs, Typography} from "@mui/material";
import {useState} from "react";
import PurchaseCharacteristicsTab from "./PurchaseCharacteristicsTab.tsx";
import Paper from "@mui/material/Paper";
import PurchaseSkillRanksTab from "./PurchaseSkillRanksTab.tsx";

interface Props {
    player: PlayerCharacter;
    onSpendExperience: (experience: number) => void;
    skills: Skill[];
    talents: Talent[];
}

export default function SpendExperienceStep(props: Props) {
    const {player, onSpendExperience, skills, talents} = props;
    const [tabValue, setTabValue] = useState(0);
    const [characteristicSpend, setCharacteristicSpend] = useState(0);
    const [characteristics, setCharacteristics] = useState({
        [SkillCharacteristic.Brawn]: player.characteristics.brawn.base,
        [SkillCharacteristic.Agility]: player.characteristics.agility.base,
        [SkillCharacteristic.Intellect]: player.characteristics.intellect.base,
        [SkillCharacteristic.Cunning]: player.characteristics.cunning.base,
        [SkillCharacteristic.Willpower]: player.characteristics.willpower.base,
        [SkillCharacteristic.Presence]: player.characteristics.presence.base,
    } as Record<SkillCharacteristic, number>);
    const initialPurchasedSkills: Record<string, number> = {};
    player.skills.forEach((skill: PlayerSkill) => {
        initialPurchasedSkills[skill.name] = 0;
    });
    const [purchasedSkills, setPurchasedSkills] = useState<Record<string, number>>(initialPurchasedSkills);
    const [skillSpend, setSkillSpend] = useState(0);
    const [talentSpend, setTalentSpend] = useState(0);

    const handleCharacteristicSpend = (experienceDiff: number, updatedCharacteristics: Record<SkillCharacteristic, number>) => {
        setCharacteristicSpend(characteristicSpend + experienceDiff);
        setCharacteristics(updatedCharacteristics);
        onSpendExperience(experienceDiff);
    }

    const handleSkillSpend = (experienceDiff: number, updatedSkills: Record<string, number>) => {
        setSkillSpend(skillSpend + experienceDiff);
        setPurchasedSkills(updatedSkills);
        onSpendExperience(experienceDiff);
    }

    const getValueFromArchetype = (archetype: Archetype, label: SkillCharacteristic): number => {
        switch (label) {
            case SkillCharacteristic.Brawn:
                return archetype.brawn;
            case SkillCharacteristic.Agility:
                return archetype.agility;
            case SkillCharacteristic.Intellect:
                return archetype.intellect;
            case SkillCharacteristic.Cunning:
                return archetype.cunning;
            case SkillCharacteristic.Willpower:
                return archetype.willpower;
            case SkillCharacteristic.Presence:
                return archetype.presence;
            default:
                return 1;
        }
    }

    return (
        <Box sx={{mt: 3}}>
            <Paper sx={{p: 3, mb: 3}}>
                <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    <Box sx={{textAlign: 'center'}}>
                        <Typography variant="h4" fontWeight="bold" color="primary">
                            {player.experience.initial}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Available XP
                        </Typography>
                    </Box>

                    <Box sx={{textAlign: 'center'}}>
                        <Typography variant="h4" fontWeight="bold">
                            {characteristicSpend + skillSpend + talentSpend}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Spent XP
                        </Typography>
                    </Box>

                    <Box sx={{textAlign: 'center'}}>
                        <Typography variant="h4" fontWeight="bold">
                            {player.experience.initial}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Starting XP
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            {player.experience.initial < 0 && (
                <Alert severity="error" sx={{mb: 3}}>
                    <Typography variant="body2">
                        You've overspent by {Math.abs(player.experience.initial)} XP! Remove some skill ranks.
                    </Typography>
                </Alert>
            )}
            <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} color="primary" centered>
                <Tab label="Characteristics"/>
                <Tab label="Skill Ranks"/>
                <Tab label="Talents"/>
            </Tabs>

            {tabValue === 0 &&
                <PurchaseCharacteristicsTab archetype={player.archetype} characteristics={characteristics}
                                            onCharacteristicSpend={handleCharacteristicSpend}
                                            experience={player.experience.initial}/>}
            {tabValue === 1 &&
                <PurchaseSkillRanksTab playerSkills={player.skills} careerSkills={player.career.skills}
                                       characteristics={characteristics} experience={player.experience.initial}
                                       onSkillSpend={handleSkillSpend} skills={purchasedSkills}/>}
            <Paper sx={{p: 2, mt: 3}}>
                <Stack spacing={2}>
                    <Typography variant="caption" color="text.secondary">
                        <strong>Purchased Characteristics:</strong>{" "}
                        {Object.entries(characteristics)
                            .filter(([char, value]) => value > getValueFromArchetype(player.archetype, char as SkillCharacteristic))
                            .map(([char, value]) => {
                                const baseValue = getValueFromArchetype(player.archetype, char as SkillCharacteristic);
                                return `${char} ${baseValue}→${value}`;
                            })
                            .join(", ") || "None"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        <strong>Purchased Skills:</strong>{" "}
                        {Object.entries(purchasedSkills)
                            .filter(([_, ranks]) => ranks > 0)
                            .map(([name, ranks]) => {
                                const baseValue = player.skills.find((s) => s.name === name)?.ranks || 0;
                                return `${name} ${baseValue}→${ranks}`;
                            })
                            .join(", ") || "None"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        <strong>Purchased Talents:</strong>{" "}
                        {/*{Object.entries(skillRanks)*/}
                        {/*    .filter(([_, ranks]) => ranks > 0)*/}
                        {/*    .map(([skillId, ranks]) => {*/}
                        {/*        const skill = skills.find((s) => s.id === skillId);*/}
                        {/*        return `${skill?.name} +${ranks}`;*/}
                        {/*    })*/}
                        {/*    .join(", ") || "None"}*/}
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
}