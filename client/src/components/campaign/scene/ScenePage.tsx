import { Card, CardContent } from "@mui/material";
import {useNavigate, useParams} from "react-router";
import { Fragment, useEffect, useState } from "react";
import * as React from "react";
import Scene from "../../../models/campaign/Scene";
import SceneService from "../../../services/SceneService";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import PartyCard from "../party/PartyCard";
import NonPlayerCharacterScene from "./npc/NonPlayerCharacterScene";
import ViewEncountersCard from "./ViewEncountersCard";
import CenteredCardHeaderWithButton from "../../common/card/header/CenteredCardHeaderWithButton";
import {CampaignPath} from "../../../services/RootPath";
import FullGrid from "../../common/grid/FullGrid";
import GridContainer from "../../common/grid/GridContainer";

const ScenePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [scene, setScene] = useState<Scene | null>(null);
    const [value, setValue] = useState('1');
    let navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            return;
        }
        (async (): Promise<void> => {
            setScene(await SceneService.getScene(id));
        })()
    }, [id, setScene]);

    if (!scene) {
        return <Fragment />;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Card>
            <CenteredCardHeaderWithButton title={scene.name} onClick={() => navigate(CampaignPath.Scene + scene.id)} buttonText={'Return to Scene'}/>
            <CardContent>
                <FullGrid>
                    <TabContext value={value}>
                        <GridContainer>
                            <TabList onChange={handleChange} centered>
                                <Tab label="Party" value="1" />
                                <Tab label="NPC" value="2" />
                                <Tab label="Encounters" value="3" />
                            </TabList>
                        </GridContainer>
                        <TabPanel value="1">
                            <PartyCard party={scene.party} />
                        </TabPanel>
                        <TabPanel value="2">
                            <NonPlayerCharacterScene scene={scene} />
                        </TabPanel>
                        <TabPanel value="3">
                            <ViewEncountersCard initialScene={scene} />
                        </TabPanel>
                    </TabContext>
                </FullGrid>
            </CardContent>
        </Card>
    );
};

export default ScenePage;
