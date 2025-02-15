import Scene from "../../../models/campaign/Scene";
import {Button, Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import * as React from "react";
import {useEffect, useState} from "react";
import AddEncounterDialog from "./encounter/AddEncounterDialog";
import TabPanel from "@mui/lab/TabPanel";
import EncounterCard from "./encounter/EncounterCard";
import SceneService from "../../../services/SceneService";
import Encounter from "../../../models/campaign/encounter/Encounter";

interface Props {
    initialScene: Scene
}

export default function ViewEncountersCard(props: Props) {
    const {initialScene} = props;
    const [value, setValue] = useState('0');
    const [scene, setScene] = useState<Scene>(initialScene);
    const [addEncounterDialog, setAddEncounterDialog] = useState(false);

    useEffect(() => {
        setScene(scene);
    }, [scene]);

    const addEncounter = async (encounter: Encounter) => {
        await updateScene({...scene, encounters: [...scene.encounters, encounter]})
    };

    const updateScene = async (updatedScene: Scene) => {
        console.log(updatedScene)
        setScene(await SceneService.updateScene(updatedScene));
    };

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Card>
            <CenteredCardHeader title={'Encounters'}/>
            <CardContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                {initialScene.encounters.map((encounter, index) => (
                                    <Tab label={encounter.type} value={String(index)}/>
                                ))}
                            </TabList>
                        </Grid>
                        {initialScene.encounters.map((encounter, index) => (
                            <TabPanel value={String(index)}>
                                <EncounterCard encounter={encounter}/>
                            </TabPanel>
                        ))}
                    </TabContext>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Button color='primary' variant='contained' onClick={(): void => setAddEncounterDialog(true)}>Add
                        Encounter</Button>
                    {addEncounterDialog && <AddEncounterDialog open={addEncounterDialog}
                                                               onClose={(): void => setAddEncounterDialog(false)}
                                                               createEncounter={addEncounter}
                                                               party={initialScene.party}
                                                               scene={initialScene}/>}
                </Grid>
            </CardContent>
        </Card>
    )
}