import {Dialog, DialogContent} from "@mui/material";
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
import GridContainer from "../../../common/grid/GridContainer";

interface Props {
    open: boolean;
    onClose: () => void;
    createEncounter: (encounter: Encounter) => void;
    party: Party;
    scene: Scene;
}

const AddEncounterDialog: React.FC<Props> = ({open, onClose, createEncounter, party, scene}) => {
    const [encounter, setEncounter] = useState<Encounter>({
        enemyMinionGroups: [],
        enemyNemeses: [],
        party: party,
        enemyRivals: [],
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
                enemyMinionGroups: minions,
                enemyRivals: rivals,
                enemyNemeses: nemeses,
            }));
        })();
    }, [scene.id]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const updateEncounter = <T, >(field: string, value: T) => {
        setEncounter({...encounter, [field]: value as T});
    };

    const onCreate = () => {
        createEncounter(encounter);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <CenteredDialogTitle title={'Add Encounter'}/>
            <DialogContent>
                <EncounterTypeCard value={encounter.type} onChange={updateEncounter<Type>}/>
                <TabContext value={value}>
                    <GridContainer>
                        <TabList onChange={handleChange} centered>
                            <Tab label={ActorType.Minion} value={"1"}/>
                            <Tab label={ActorType.Rival} value={"2"}/>
                            <Tab label={ActorType.Nemesis} value={"3"}/>
                        </TabList>
                    </GridContainer>
                    <TabPanel value={"1"}>
                        <NonPlayerCharacterEncounterTable npcs={encounter.enemyMinionGroups} onChange={updateEncounter<MinionGroup[]>}/>
                    </TabPanel>
                    <TabPanel value={"2"}>
                        <NonPlayerCharacterEncounterTable npcs={encounter.enemyRivals} onChange={updateEncounter<Rival[]>}/>
                    </TabPanel>
                    <TabPanel value={"3"}>
                        <NonPlayerCharacterEncounterTable npcs={encounter.enemyNemeses} onChange={updateEncounter<Rival[]>}/>
                    </TabPanel>
                </TabContext>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose}/>
        </Dialog>
    );
};

export default AddEncounterDialog;
