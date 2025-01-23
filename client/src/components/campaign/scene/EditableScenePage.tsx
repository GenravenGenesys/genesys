import {Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeaderWithAction from "../../common/card/header/CenteredCardHeaderWithAction";
import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import * as React from "react";
import Scene from "../../../models/campaign/Scene";
import SceneService from "../../../services/SceneService";
import {RootPath} from "../../../services/RootPath";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import PartyCard from "../party/PartyCard";
import NonPlayerCharacterScene from "./npc/NonPlayerCharacterScene";
import ViewEncountersCard from "./ViewEncountersCard";

export default function EditableScenePage() {
    const {id} = useParams<{ id: string }>();
    const [scene, setScene] = useState<Scene | null>(null);
    const [value, setValue] = useState('1');

    useEffect(() => {
        if (!id) {
            return;
        }
        (async (): Promise<void> => {
            setScene(await SceneService.getScene(id));
        })()
    }, [id, setScene]);

    if (!scene) {
        return <Fragment/>;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={scene.name} path={RootPath.Scenes + scene.id}/>
            <CardContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                {/*<Tab label="Settings" value="1"/>*/}
                                <Tab label="Party" value="1"/>
                                <Tab label="Encounters" value="2"/>
                                <Tab label="Enemy NPC" value="3"/>
                            </TabList>
                        </Grid>
                        {/*<TabPanel value="1">*/}
                        {/*    <Button variant="contained" color="primary" onClick={startSession}>Start Session</Button>*/}
                        {/*    <Button variant="contained" color="primary" onClick={endSession}>End Session</Button>*/}
                        {/*</TabPanel>*/}
                        <TabPanel value="1">
                            <PartyCard party={scene.party}/>
                        </TabPanel>
                        <TabPanel value="2">
                            {/*Add Pathname for disablement*/}
                            <ViewEncountersCard scene={scene} disabled={false}/>
                        </TabPanel>
                        <TabPanel value="3">
                            <NonPlayerCharacterScene scene={scene}/>
                        </TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    )
}