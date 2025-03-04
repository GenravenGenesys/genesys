import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import Encounter, {Type} from "../../../../models/campaign/encounter/Encounter";
import Scene from "../../../../models/campaign/Scene";
import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import InitiativeTrackCard from "./InitiativeTrackCard";
import {useNavigate, useParams} from "react-router-dom";
import SceneService from "../../../../services/SceneService";
import {CampaignPath} from "../../../../services/RootPath";

const EncounterPage: React.FC = () => {
    const {id, type} = useParams<{ id: string, type: Type }>();
    const [scene, setScene] = useState<Scene | null>(null);
    const [encounter, setEncounter] = useState<Encounter | null>();
    const [value, setValue] = useState('0');
    let navigate = useNavigate();

    const combinedEnemies = !encounter ? [] : [
        ...(encounter.enemyMinionGroups ? encounter.enemyMinionGroups.map(minion => ({...minion})) : []),
        ...(encounter.enemyRivals ? encounter.enemyRivals.map(rival => ({...rival})) : []),
        ...(encounter.enemyNemeses ? encounter.enemyNemeses.map(nemesis => ({...nemesis})) : [])
    ];

    useEffect(() => {
        if (!id) {
            return;
        }
        (async (): Promise<void> => {
            setScene(await SceneService.getScene(id));
        })()
    }, [id, setScene]);

    useEffect(() => {
        if (!type || !scene) {
            return;
        }
        const foundEncounter = scene.encounters.find(encounter => type === encounter?.type);
        setEncounter(foundEncounter || null);
    }, [type, scene]);

    if (!scene || !encounter) {
        return <Fragment/>;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const onReturnToScene = () => {
        navigate(CampaignPath.Scene + scene.id)
    }

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={encounter.type + ' Encounter'} action={onReturnToScene}/>
            <CardContent>
                <TabContext value={value}>
                    <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList centered>
                            <Tab label={'Roll Initiative'} value={"0"}/>
                        </TabList>
                    </Grid>
                    <TabPanel value={"0"}>
                        <InitiativeTrackCard npcs={combinedEnemies}/>
                    </TabPanel>
                </TabContext>
            </CardContent>
        </Card>
    )
}

export default EncounterPage;