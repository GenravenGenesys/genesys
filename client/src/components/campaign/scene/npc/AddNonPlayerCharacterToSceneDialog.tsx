import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@mui/material";
import EnemySceneRivals from "./EnemySceneRivals";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import * as React from "react";
import {useState} from "react";
import EnemySceneNemeses from "./EnemySceneNemeses";
import EnemySceneMinions from "./EnemySceneMinions";

interface Props {
    id: string
    open: boolean
    onClose: () => void
}

export default function AddNonPlayerCharacterToSceneDialog(props: Props) {
    const {id, open, onClose} = props;
    const [value, setValue] = useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle title={'Add NPC'}/>
            <DialogContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                <Tab label={'Minion'} value={'0'}/>
                                <Tab label={'Rival'} value={'1'}/>
                                <Tab label={'Nemesis'} value={'2'}/>
                            </TabList>
                        </Grid>
                        <TabPanel value={'0'}>
                            <EnemySceneMinions id={id}/>
                        </TabPanel>
                        <TabPanel value={'1'}>
                            <EnemySceneRivals id={id}/>
                        </TabPanel>
                        <TabPanel value={'2'}>
                            <EnemySceneNemeses id={id}/>
                        </TabPanel>
                    </TabContext>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CLOSE</Button>
            </DialogActions>
        </Dialog>
    );
}