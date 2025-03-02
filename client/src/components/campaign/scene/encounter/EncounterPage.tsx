import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import Encounter, {Type} from "../../../../models/campaign/encounter/Encounter";
import Scene from "../../../../models/campaign/Scene";
import * as React from "react";
import {useState} from "react";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import InitiativeTrackCard from "./InitiativeTrackCard";
import {useParams} from "react-router-dom";

interface Props {
    scene: Scene;
    encounter: Encounter;
}

const EncounterPage: React.FC<Props> = ({}) => {
    const { id, type } = useParams<{ id: string, type: Type }>();
    const [scene, setScene] = useState<Scene | null>(null);
    const [encounter, setEncounter] = useState<Encounter | null>(scene?.encounters.filter(type => encounter?.type === type));

    const [value, setValue] = useState('0');
    const combinedEnemies = [
        ...(encounter.enemyMinionGroups ? encounter.enemyMinionGroups.map(minion => ({...minion})) : []),
        ...(encounter.enemyRivals ? encounter.enemyRivals.map(rival => ({...rival})) : []),
        ...(encounter.enemyNemeses ? encounter.enemyNemeses.map(nemesis => ({...nemesis})) : [])
    ];

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={encounter.type + ' Encounter'} action={onPageChange()}/>
            <CardContent>
                <TabContext value={value}>
                    <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} centered>
                            <Tab label={'Roll Initiative'} value={"1"}/>
                        </TabList>
                    </Grid>
                    <TabPanel value={"1"}>
                        <InitiativeTrackCard npcs={combinedEnemies}/>
                    </TabPanel>
                </TabContext>
            </CardContent>
        </Card>
    )
}

export default EncounterPage;