import {Button, Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import {useEffect, useState} from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import * as React from "react";
import SingleNonPlayerCharacterSkillCard from "../../npc/skill/SingleNonPlayerCharacterSkillCard";
import AddRivalToSceneDialog from "./AddRivalToSceneDialog";
import Scene from "../../../../models/campaign/Scene";
import Rival from "../../../../models/actor/npc/Rival";
import SceneService from "../../../../services/SceneService";

interface Props {
    scene: Scene
}

export default function RivalSkill(props: Props) {
    const {scene} = props;
    const [rivals, setRivals] = useState<Rival[]>([]);
    const [value, setValue] = useState('0');
    const [addRivalDialog, setAddRivalDialog] = useState(false);

    useEffect(() => {
        (async (): Promise<void> => {
            setRivals(await SceneService.getEnemyRivalsForScene(scene.id));
        })()
    }, [setRivals, scene]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    if (!rivals) {
        return (
            <Card>
                <Button color='primary' variant='contained' onClick={(): void => setAddRivalDialog(true)}>Add Rival</Button>
                {addRivalDialog && <AddRivalToSceneDialog open={addRivalDialog}
                                                          onClose={(): void => setAddRivalDialog(false)} id={scene.id}/>}
            </Card>
        )
    }

    return (
        <Card>
            <CenteredCardHeader title={'Rivals'}/>
            <CardContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                {rivals.map((rival, index) => (
                                    <Tab label={rival.name} value={String(index)}/>
                                ))}
                            </TabList>
                        </Grid>
                        {rivals.map((rival, index) => (
                            <TabPanel value={String(index)}>
                                {console.log(index)}
                                <SingleNonPlayerCharacterSkillCard actor={rival}/>
                            </TabPanel>
                        ))}
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    );
}