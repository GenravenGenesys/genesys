import {type PlayerCharacter} from "../../../../api/model";
import {Box, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import PurchaseCharacteristicsTab from "./PurchaseCharacteristicsTab.tsx";

interface Props {
    player: PlayerCharacter;
    onSpendExperience: (experience: number) => void;
}

export default function SpendExperienceStep(props: Props) {
    const {player, onSpendExperience} = props;
    const [tabValue, setTabValue] = useState(0);

    return (
        <Box sx={{mt: 3}}>
            <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} color="primary" centered>
                <Tab label="Characteristics"/>
                <Tab label="Skill Ranks"/>
                <Tab label="Talents"/>
            </Tabs>

            {tabValue === 0 && <PurchaseCharacteristicsTab player={player} onCharacteristicSpend={onSpendExperience}/>}
        </Box>
    );
}