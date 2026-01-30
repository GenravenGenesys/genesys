import {type PlayerCharacter, type Skill, SkillCharacteristic, type Talent} from "../../../../api/model";
import {Box, Tab, Tabs, Typography} from "@mui/material";
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
    const [skillSpend, setSkillSpend] = useState(0);
    const [talentSpend, setTalentSpend] = useState(0);

    return (
        <Box sx={{mt: 3}}>
            <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} color="primary" centered>
                <Tab label="Characteristics"/>
                <Tab label="Skill Ranks"/>
                <Tab label="Talents"/>
            </Tabs>

            {tabValue === 0 && <PurchaseCharacteristicsTab player={player} onCharacteristicSpend={onSpendExperience}/>}
            {tabValue === 1 && <PurchaseSkillRanksTab player={player} onCharacteristicSpend={onSpendExperience}
                                                      skillRanks={{}}/>}
            {/* Debug Info */}
            <Paper sx={{ p: 2, mt: 3, backgroundColor: "grey.100" }}>
                {/*<Typography variant="caption" color="text.secondary">*/}
                {/*    <strong>Purchased Characteristics:</strong>{" "}*/}
                {/*    {Object.values(SkillCharacteristic)*/}
                {/*        .map(characteristic => {*/}

                {/*            return `${skill?.name} +${ranks}`;*/}
                {/*        })*/}
                {/*        .join(", ") || "None"}*/}
                {/*</Typography>*/}
                {/*<Typography variant="caption" color="text.secondary">*/}
                {/*    <strong>Purchased Skills:</strong>{" "}*/}
                {/*    {Object.entries(skillRanks)*/}
                {/*        .filter(([_, ranks]) => ranks > 0)*/}
                {/*        .map(([skillId, ranks]) => {*/}
                {/*            const skill = skills.find((s) => s.id === skillId);*/}
                {/*            return `${skill?.name} +${ranks}`;*/}
                {/*        })*/}
                {/*        .join(", ") || "None"}*/}
                {/*</Typography>*/}
            </Paper>
        </Box>
    );
}