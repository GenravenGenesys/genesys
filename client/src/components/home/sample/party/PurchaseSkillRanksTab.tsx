import {useState} from "react";
import {type PlayerCharacter, type PlayerSkill, type Skill, SkillCharacteristic} from "../../../../api/model";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader.tsx";
import {Box, Card, CardContent, CircularProgress, Stack, Typography} from "@mui/material";
import SkillRankAccordion from "./SkillRankAccordion.tsx";

interface Props {
    skills: Record<string, number>;
    careerSkills: Skill[];
    characteristics: Record<SkillCharacteristic, number>;
    experience: number;
    onSkillSpend: (experience: number, skills: Record<string, number>) => void;
}

export default function PurchaseSkillRanksTab(props: Props) {
    const {skills, careerSkills, characteristics, experience, onSkillSpend} = props;
    const [skillRanks, setSkillRanks] = useState<Record<string, number>>({});

    const calculateCumulativeCost = (value: number, baseValue: number, career: boolean): number => {
        let cost = 0;
        for (let i = baseValue + 1; i <= value; i++) {
            cost += i * 10;
        }
        return career ? cost : (cost + 5);
    };

    const handleRankChange = (skill: PlayerSkill, newRank: number) => {
        const oldValue = characteristics[label];
        const baseValue = skills.find(ps => ps.name === skill.name)?.ranks || 0;
        //
        // const oldCost = calculateCumulativeCost(oldValue, baseValue);
        // const newCost = calculateCumulativeCost(newValue, baseValue);
        // const costDifference = newCost - oldCost;
        //
        // onCharacteristicSpend(costDifference, {
        //     ...characteristics,
        //     [label]: newValue,
        // });
    };

    return (
        <Card>
            <CenteredCardHeader title={'Increase Skill Ranks'}/>
            <CardContent>
                <SkillRankAccordion playerSkills={skills} careerSkills={careerSkills} skills={skillRanks}
                                    onRankChange={handleRankChange} availableXp={experience}
                                    characteristics={characteristics} maxSkillRanks={2}/>
            </CardContent>
        </Card>
    );
}