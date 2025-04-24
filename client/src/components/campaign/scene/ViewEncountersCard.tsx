import Scene from "../../../models/campaign/Scene";
import {Button, Card, CardContent} from "@mui/material";
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
import FullGrid from "../../common/grid/FullGrid";
import GridContainer from "../../common/grid/GridContainer";

interface Props {
    initialScene: Scene;
}

const ViewEncountersCard: React.FC<Props> = ({initialScene})=> {
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
        setScene(await SceneService.updateScene(updatedScene));
    };

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Card>
            <CenteredCardHeader title={'Encounters'}/>
            <CardContent>
                <FullGrid>
                    <TabContext value={value}>
                        <GridContainer>
                            <TabList onChange={handleChange} centered>
                                {initialScene.encounters.map((encounter, index) => (
                                    <Tab label={encounter.type} value={String(index)}/>
                                ))}
                            </TabList>
                        </GridContainer>
                        {initialScene.encounters.map((encounter, index) => (
                            <TabPanel value={String(index)}>
                                <EncounterCard sceneId={scene.id} encounter={encounter}/>
                            </TabPanel>
                        ))}
                    </TabContext>
                </FullGrid>
                <GridContainer centered>
                    <Button color='primary' variant='contained' onClick={(): void => setAddEncounterDialog(true)}>Add
                        Encounter</Button>
                    {addEncounterDialog && <AddEncounterDialog open={addEncounterDialog}
                                                               onClose={(): void => setAddEncounterDialog(false)}
                                                               createEncounter={addEncounter}
                                                               party={initialScene.party}
                                                               scene={initialScene}/>}
                </GridContainer>
            </CardContent>
        </Card>
    );
};

export default ViewEncountersCard;