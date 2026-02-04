import {type PlayerSkill, type Skill, SkillCharacteristic} from "../../../../../../api/model";
import CenteredCardHeader from "../../../../../common/card/header/CenteredCardHeader.tsx";
import {Card, CardContent} from "@mui/material";
import SkillRankAccordion from "./SkillRankAccordion.tsx";

interface Props {
    skills: Record<string, number>;
    playerSkills: PlayerSkill[];
    careerSkills: Skill[];
    characteristics: Record<SkillCharacteristic, number>;
    experience: number;
    onSkillSpend: (experience: number, skills: Record<string, number>) => void;
}

export default function PurchaseSkillRanksTab(props: Props) {
    const {skills, playerSkills, careerSkills, characteristics, experience, onSkillSpend} = props;

    const calculateCumulativeCost = (value: number, baseValue: number): number => {
        let cost = 0;
        for (let i = baseValue + 1; i <= value; i++) {
            cost += i * 5;
        }
        return cost;
    };

    const handleRankChange = (name: string, newTotalRank: number) => {
        const baseRank = playerSkills.find(ps => ps.name === name)?.ranks || 0;

        const oldCost = calculateCumulativeCost(baseRank + skills[name], baseRank);
        const newCost = calculateCumulativeCost(newTotalRank, baseRank);
        let costDifference = newCost - oldCost;

        if (!careerSkills.some(cs => cs.name === name)) {
            costDifference += costDifference > 0 ? 5 : -5;
        }

        onSkillSpend(costDifference, {
            ...skills,
            [name]: newTotalRank - baseRank,
        });
    };

    return (
        <Card>
            <CenteredCardHeader title={'Increase Skill Ranks'}/>
            <CardContent>
                <SkillRankAccordion playerSkills={playerSkills} careerSkills={careerSkills} skills={skills}
                                    onRankChange={handleRankChange} availableXp={experience}
                                    characteristics={characteristics} maxSkillRanks={2}/>
            </CardContent>
        </Card>
    );
}