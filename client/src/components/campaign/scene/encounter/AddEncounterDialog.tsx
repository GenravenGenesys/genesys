import {Dialog, DialogContent, Grid} from "@mui/material";
import CenteredDialogTitle from "../../../common/dialog/CenteredDialogTitle";
import EncounterTypeCard from "../../../common/card/select/EncounterTypeCard";
import Encounter, {Type} from "../../../../models/campaign/encounter/Encounter";
import React, {useEffect, useState} from "react";
import Party from "../../../../models/campaign/Party";
import GenesysDialogActions from "../../../common/dialog/GenesysDialogActions";
import Scene from "../../../../models/campaign/Scene";
import SceneService from "../../../../services/SceneService";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {ActorType} from "../../../../models/actor/Actor";
import NonPlayerCharacterEncounterTable from "./NonPlayerCharacterEncounterTable";
import {MinionGroup} from "../../../../models/actor/npc/Minion";
import Rival from "../../../../models/actor/npc/Rival";

interface Props {
    open: boolean;
    onClose: () => void;
    createEncounter: (encounter: Encounter) => void;
    party: Party;
    scene: Scene;
}

const AddEncounterDialog: React.FC<Props> = ({open, onClose, createEncounter, party, scene}) => {
    const [encounter, setEncounter] = useState<Encounter>({
        minions: [],
        nemeses: [],
        party: party,
        rivals: [],
        slots: [],
        type: Type.Combat
    });
    const [value, setValue] = useState('0');

    useEffect(() => {
        (async () => {
            const minions = await SceneService.getEnemyMinionsForScene(scene.id);
            const rivals = await SceneService.getEnemyRivalsForScene(scene.id);
            const nemeses = await SceneService.getEnemyNemesesForScene(scene.id);
            setEncounter(prevEncounter => ({
                ...prevEncounter,
                minions: minions,
                rivals: rivals,
                nemeses: nemeses,
            }));
        })();
    }, [scene.id]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const updateEncounter = <T, >(field: string, value: T) => {
        console.log(field + " " + value)
        setEncounter({...encounter, [field]: value as T});
    };

    const onCreate = () => {
        console.log(encounter)
        createEncounter(encounter);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <CenteredDialogTitle title={'Add Encounter'}/>
            <DialogContent>
                <EncounterTypeCard value={encounter.type} onChange={updateEncounter<Type>}/>
                <TabContext value={value}>
                    <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} centered>
                            <Tab label={ActorType.Minion} value={"1"}/>
                            <Tab label={ActorType.Rival} value={"2"}/>
                            <Tab label={ActorType.Nemesis} value={"3"}/>
                        </TabList>
                    </Grid>
                    <TabPanel value={"1"}>
                        <NonPlayerCharacterEncounterTable npcs={encounter.minions} onChange={updateEncounter<MinionGroup[]>}/>
                    </TabPanel>
                    <TabPanel value={"2"}>
                        <NonPlayerCharacterEncounterTable npcs={encounter.rivals} onChange={updateEncounter<Rival[]>}/>
                    </TabPanel>
                    <TabPanel value={"3"}>
                        <NonPlayerCharacterEncounterTable npcs={encounter.nemeses} onChange={updateEncounter<Rival[]>}/>
                    </TabPanel>
                </TabContext>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose}/>
        </Dialog>
    );
};

export default AddEncounterDialog;
