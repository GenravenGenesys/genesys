import {Card, CardContent} from "@mui/material";
import Encounter, {Type} from "../../../../models/campaign/encounter/Encounter";
import Scene from "../../../../models/campaign/Scene";
import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import InitiativeTrackCard from "./InitiativeTrackCard";
import {useNavigate, useParams} from "react-router";
import SceneService from "../../../../services/SceneService";
import {CampaignPath} from "../../../../services/RootPath";
import InitiativeSlot from "../../../../models/campaign/encounter/InitiativeSlot";
import ClaimInitiativeSlotTrack from "./ClaimInitiativeSlotTrack";
import CenteredCardHeaderWithButton from "../../../common/card/header/CenteredCardHeaderWithButton";
import GridContainer from "../../../common/grid/GridContainer";

const EncounterPage: React.FC = () => {
    const {id, type} = useParams<{ id: string, type: Type }>();
    const [scene, setScene] = useState<Scene | null>(null);
    const [encounter, setEncounter] = useState<Encounter | null>();
    const [value, setValue] = useState('0');
    const [slots, setSlots] = useState<InitiativeSlot[]>([]);
    let navigate = useNavigate();

    const combinedEnemies = !encounter ? [] : [
        ...(encounter.enemyMinionGroups ? encounter.enemyMinionGroups.map(minion => ({...minion})) : []),
        ...(encounter.enemyRivals ? encounter.enemyRivals.map(rival => ({...rival})) : []),
        ...(encounter.enemyNemeses ? encounter.enemyNemeses.map(nemesis => ({...nemesis})) : [])
    ];

    const party = scene?.party;

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

    const moveToClaimSlotsTab = (initiativeSlots: InitiativeSlot[]) => {
        setSlots(initiativeSlots);
        setValue("1");
    };

    const moveToActiveTurnTab = (initiativeSlots: InitiativeSlot[]) => {
        setSlots(initiativeSlots);
        setValue("2");
    };

    return (
        <Card>
            <CenteredCardHeaderWithButton title={encounter.type + ' Encounter'} onClick={() => navigate(CampaignPath.Scene + scene.id)}
                                          buttonText={'Return to Scene'}/>
            <CardContent>
                <TabContext value={value}>
                    <GridContainer>
                        <TabList centered>
                            <Tab label={'Roll Initiative'} value={"0"} disabled={value !== "0"}/>
                            <Tab label={'Claim Slots'} value={"1"} disabled={value !== "1"}/>
                            <Tab label={'Execute Active Turn'} value={"2"} disabled={value !== "2"}/>
                            <Tab label={'Resolve Active Turn'} value={"3"} disabled={value !== "3"}/>
                            <Tab label={'Resolve Encounter'} value={"4"} disabled={value !== "4"}/>
                        </TabList>
                    </GridContainer>
                    <TabPanel value={"0"}>
                        <InitiativeTrackCard enemies={combinedEnemies}
                                             updateSlots={moveToClaimSlotsTab} party={party!!}/>
                    </TabPanel>
                    <TabPanel value={"1"}>
                        <ClaimInitiativeSlotTrack npcs={combinedEnemies} initialSlots={slots}
                                                  updateInitiativeSlots={moveToActiveTurnTab}/>
                    </TabPanel>
                    <TabPanel value={"2"}>

                    </TabPanel>
                    <TabPanel value={"3"}>

                    </TabPanel>
                    <TabPanel value={"4"}>

                    </TabPanel>
                </TabContext>
            </CardContent>
        </Card>
    );
};

export default EncounterPage;