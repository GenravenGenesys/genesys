import {useState} from "react";
import type {PlayerCharacter, PlayerSkill} from "../../../../api/model";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader.tsx";
import {Box, Card, CardContent, CircularProgress, Stack, Typography} from "@mui/material";
import SkillRankAccordion from "./SkillRankAccordion.tsx";

interface Props {
    player: PlayerCharacter;
    onSkillSpend: (experience: number, skillRanks: Record<PlayerSkill, number>) => void;
}

export default function PurchaseSkillRanksTab(props: Props) {
    const {player, onSkillSpend} = props;
    const [skillRanks, setSkillRanks] = useState<Record<string, number>>({});

    const getPlayerSkillRank = (skillId: string): number => {
        return skillRanks[skillId] ?? 0;
    }

    const handleRankChange = (skill: PlayerSkill, newRank: number) => {
        if (newRank < skill.ranks) {
            onSkillSpend(-experienceCost, {
                ...characteristics,
                [label]: newRank,
            });
        } else {
            onSkillSpend(experienceCost, {
                ...characteristics,
                [label]: newRank,
            });
        }
        setSkillRanks((prev) => ({
            ...prev,
            [skillId]: newRank,
        }));
    };

    return (
        <Card>
            <CenteredCardHeader title={'Increase Skill Ranks'}/>
            <CardContent>
                <SkillRankAccordion skills={player.skills} careerSkills={player.career.skills} skillRanks={skillRanks}
                                    onRankChange={handleRankChange} availableXp={player.experience.initial}
                                    characteristics={{
                                        brawn: player.characteristics.brawn.base,
                                        agility: player.characteristics.agility.base,
                                        intellect: player.characteristics.intellect.base,
                                        cunning: player.characteristics.cunning.base,
                                        willpower: player.characteristics.willpower.base,
                                        presence: player.characteristics.presence.base
                                    }} maxSkillRanks={2}/>
            </CardContent>
        </Card>
    );
}