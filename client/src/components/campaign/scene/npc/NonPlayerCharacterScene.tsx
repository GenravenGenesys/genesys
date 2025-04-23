import {Button, Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import {useEffect, useState} from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import * as React from "react";
import SingleNonPlayerCharacterSkillCard from "../../npc/skill/SingleNonPlayerCharacterSkillCard";
import AddNonPlayerCharacterToSceneDialog from "./AddNonPlayerCharacterToSceneDialog";
import Scene from "../../../../models/campaign/Scene";
import SceneService from "../../../../services/SceneService";
import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";

interface Props {
    scene: Scene
}

export default function NonPlayerCharacterScene(props: Props) {
    const {scene} = props;
    const [singleNonPlayerCharacters, setSingleNonPlayerCharacters] = useState<SingleNonPlayerCharacter[]>([]);
    const [value, setValue] = useState('0');
    const [addNpcDialog, setAddNpcDialog] = useState(false);

    useEffect(() => {
        (async (): Promise<void> => {
            const minions = await SceneService.getEnemyMinionsForScene(scene.id);
            const rivals = await SceneService.getEnemyRivalsForScene(scene.id);
            const nemeses = await SceneService.getEnemyNemesesForScene(scene.id);
            const combinedEnemies = [
                ...minions.map(minion => ({...minion})),
                ...rivals.map(rival => ({...rival})),
                ...nemeses.map(nemesis => ({...nemesis}))
            ];
            setSingleNonPlayerCharacters(combinedEnemies);
        })();
    }, [scene]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Card>
            <CenteredCardHeader title={'Non Player Characters'}/>
            <CardContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                {singleNonPlayerCharacters.map((npc, index) => (
                                    <Tab label={npc.name + ' (' + npc.type + ')'} value={String(index)}/>
                                ))}
                            </TabList>
                        </Grid>
                        {singleNonPlayerCharacters.map((npc, index) => (
                            <TabPanel value={String(index)}>
                                <SingleNonPlayerCharacterSkillCard actor={npc}/>
                            </TabPanel>
                        ))}
                    </TabContext>
                </Grid>
                <Grid container sx={{
                    justifyContent: 'center'
                }}>
                    <Button color='primary' variant='contained' onClick={(): void => setAddNpcDialog(true)}>Add
                        NPC</Button>
                    {addNpcDialog && <AddNonPlayerCharacterToSceneDialog open={addNpcDialog}
                                                                         onClose={(): void => setAddNpcDialog(false)}
                                                                         id={scene.id}/>}
                </Grid>
            </CardContent>
        </Card>
    );
}