import Scene from "../../../models/campaign/Scene";
import {Button, Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import * as React from "react";
import {useState} from "react";
import AddEncounterDialog from "./encounter/AddEncounterDialog";
import TabPanel from "@mui/lab/TabPanel";
import EncounterCard from "./encounter/EncounterCard";

interface Props {
    scene: Scene
    disabled: boolean
}

export default function ViewEncountersCard(props: Props) {
    const {scene, disabled} = props;
    const [value, setValue] = useState('0');
    const [addEncounterDialog, setAddEncounterDialog] = useState(false);

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
                                {scene.encounters.map((encounter, index) => (
                                    <Tab label={encounter.type} value={String(index)}/>
                                ))}
                            </TabList>
                        </Grid>
                        {scene.encounters.map((encounter, index) => (
                            <TabPanel value={String(index)}>
                                <EncounterCard scene={scene}/>
                            </TabPanel>
                        ))}
                    </TabContext>
                </Grid>
                {disabled && <Grid container justifyContent={'center'}>
                    <Button color='primary' variant='contained' onClick={(): void => setAddEncounterDialog(true)}>Add
                        Encounter</Button>
                    {addEncounterDialog && <AddEncounterDialog open={addEncounterDialog}
                                                               onClose={(): void => setAddEncounterDialog(false)}
                                                               createEncounter={} party={scene.party}/>}
                </Grid>}
            </CardContent>
        </Card>
    )
}