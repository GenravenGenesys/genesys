import {
    type Archetype,
    type PlayerCharacter,
    type PlayerSkill,
    CharacteristicType,
    type Talent, type Characteristics, type PlayerTalent
} from "../../../../../api/model";
import {Alert, Box, Stack, Tab, Tabs, Typography} from "@mui/material";
import {useState} from "react";
import PurchaseCharacteristicsTab from "./PurchaseCharacteristicsTab.tsx";
import Paper from "@mui/material/Paper";
import PurchaseSkillRanksTab from "./skill/PurchaseSkillRanksTab.tsx";
import PurchaseTalentTab from "./talent/PurchaseTalentTab.tsx";

interface Props {
    player: PlayerCharacter;
    onSpendExperience: (experience: number) => void;
    onCharacteristicUpdate: (characteristics: Characteristics) => void;
    onSkillUpdate: (skills: PlayerSkill[]) => void;
    onTalentUpdate: (talents: PlayerTalent[]) => void;
    talents: Talent[];
}

export default function SpendExperienceStep(props: Props) {
    const {player, onSpendExperience, onCharacteristicUpdate, onSkillUpdate, onTalentUpdate, talents} = props;
    const [tabValue, setTabValue] = useState(0);
    const [characteristicSpend, setCharacteristicSpend] = useState(0);
    const [characteristics, setCharacteristics] = useState({
        [CharacteristicType.Brawn]: player.characteristics.brawn.base,
        [CharacteristicType.Agility]: player.characteristics.agility.base,
        [CharacteristicType.Intellect]: player.characteristics.intellect.base,
        [CharacteristicType.Cunning]: player.characteristics.cunning.base,
        [CharacteristicType.Willpower]: player.characteristics.willpower.base,
        [CharacteristicType.Presence]: player.characteristics.presence.base,
    } as Record<CharacteristicType, number>);
    const [initialPlayerSkills] = useState(() => [...player.skills]);
    const initialPurchasedSkills: Record<string, number> = {};
    player.skills.forEach((skill: PlayerSkill) => {
        initialPurchasedSkills[skill.name] = 0;
    });
    const [purchasedSkills, setPurchasedSkills] = useState<Record<string, number>>(initialPurchasedSkills);
    const [skillSpend, setSkillSpend] = useState(0);
    const [initialPlayerTalents] = useState(() => [...player.talents]);
    const [purchasedTalents, setPurchasedTalents] = useState<Record<string, number>>({});
    const [talentSpend, setTalentSpend] = useState(0);

    const handleCharacteristicSpend = (experienceDiff: number, updatedCharacteristics: Record<CharacteristicType, number>) => {
        setCharacteristicSpend(characteristicSpend + experienceDiff);
        setCharacteristics(updatedCharacteristics);
        onSpendExperience(experienceDiff);
        onCharacteristicUpdate({
            brawn: {
                base: updatedCharacteristics[CharacteristicType.Brawn],
                current: updatedCharacteristics[CharacteristicType.Brawn]
            },
            agility: {
                base: updatedCharacteristics[CharacteristicType.Agility],
                current: updatedCharacteristics[CharacteristicType.Agility]
            },
            intellect: {
                base: updatedCharacteristics[CharacteristicType.Intellect],
                current: updatedCharacteristics[CharacteristicType.Intellect]
            },
            cunning: {
                base: updatedCharacteristics[CharacteristicType.Cunning],
                current: updatedCharacteristics[CharacteristicType.Cunning]
            },
            willpower: {
                base: updatedCharacteristics[CharacteristicType.Willpower],
                current: updatedCharacteristics[CharacteristicType.Willpower]
            },
            presence: {
                base: updatedCharacteristics[CharacteristicType.Presence],
                current: updatedCharacteristics[CharacteristicType.Presence]
            },
        } as Characteristics)
    };

    const handleSkillSpend = (experienceDiff: number, updatedSkills: Record<string, number>) => {
        setSkillSpend(prev => prev + experienceDiff);
        setPurchasedSkills(updatedSkills);
        onSpendExperience(experienceDiff);
        onSkillUpdate(
            initialPlayerSkills.map((skill) => ({
                ...skill,
                ranks: skill.ranks + (updatedSkills[skill.name] || 0)
            }))
        );
    };

    const handleTalentSpend = (experienceDiff: number, updatedTalents: Record<string, number>) => {
        setTalentSpend(prev => prev + experienceDiff);
        setPurchasedTalents(updatedTalents);
        onSpendExperience(experienceDiff);

        // Update ranks for talents the player already had before this session
        const updatedExisting = initialPlayerTalents.map((talent) => ({
            ...talent,
            ranks: talent.ranks + (updatedTalents[talent.id] || 0)
        }));

        // Add talents purchased during this session that weren't in the initial list
        const existingIds = new Set(initialPlayerTalents.map(t => t.id));
        const newTalents: PlayerTalent[] = Object.entries(updatedTalents)
            .filter(([id, ranks]) => !existingIds.has(id) && ranks > 0)
            .flatMap(([id, ranks]) => {
                const campaignTalent = talents.find(t => t.id === id);
                if (!campaignTalent) return [];
                return [{ ...campaignTalent, ranks } as PlayerTalent];
            });

        onTalentUpdate([...updatedExisting, ...newTalents]);
    };

    const getValueFromArchetype = (archetype: Archetype, label: CharacteristicType): number => {
        switch (label) {
            case CharacteristicType.Brawn:
                return archetype.brawn;
            case CharacteristicType.Agility:
                return archetype.agility;
            case CharacteristicType.Intellect:
                return archetype.intellect;
            case CharacteristicType.Cunning:
                return archetype.cunning;
            case CharacteristicType.Willpower:
                return archetype.willpower;
            case CharacteristicType.Presence:
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
                        You've overspent by {Math.abs(player.experience.initial)} XP! Please adjust your purchases to
                        not exceed your available XP.
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
                <PurchaseSkillRanksTab playerSkills={initialPlayerSkills} careerSkills={player.career.skills}
                                       characteristics={characteristics} experience={player.experience.initial}
                                       onSkillSpend={handleSkillSpend} skills={purchasedSkills}/>}
            {tabValue === 2 && <PurchaseTalentTab campaignTalents={talents} talents={purchasedTalents}
                                                  experience={player.experience.initial}
                                                  onTalentSpend={handleTalentSpend}/>}
            <Paper sx={{p: 2, mt: 3}}>
                <Stack spacing={2}>
                    <Typography variant="caption" color="text.secondary">
                        <strong>Purchased Characteristics:</strong>{" "}
                        {Object.entries(characteristics)
                            .filter(([char, value]) => value > getValueFromArchetype(player.archetype, char as CharacteristicType))
                            .map(([char, value]) => {
                                const baseValue = getValueFromArchetype(player.archetype, char as CharacteristicType);
                                return `${char} ${baseValue}→${value}`;
                            })
                            .join(", ") || "None"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        <strong>Purchased Skills:</strong>{" "}
                        {Object.entries(purchasedSkills)
                            .filter(([_, ranks]) => ranks > 0)
                            .map(([name, ranks]) => {
                                const baseValue = initialPlayerSkills.find((s) => s.name === name)?.ranks || 0;
                                return `${name} ${baseValue}→${baseValue + ranks}`;
                            })
                            .join(", ") || "None"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        <strong>Purchased Talents:</strong>{" "}
                        {Object.entries(purchasedTalents)
                            .filter(([_, ranks]) => ranks > 0)
                            .map(([id, ranks]) => {
                                const talent = talents.find((t) => t.id === id);
                                return `${talent?.name} +${ranks}`;
                            })
                            .join(", ") || "None"}
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
}