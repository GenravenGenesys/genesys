import {Card, CardContent} from '@mui/material';
import Talent from "../../models/Talent";
import * as React from "react";
import {useLocation, useParams} from "react-router";
import {Fragment, useEffect, useState} from "react";
import TalentService from "../../services/TalentService";
import CenteredCardHeaderWithAction from "../common/card/header/CenteredCardHeaderWithAction";
import {RootPath} from "../../services/RootPath";
import TabList from "@mui/lab/TabList/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TalentBaseTab from "./TalentBaseTab";
import TalentModifierTab from "./TalentModifierTab";
import GridContainer from "../common/grid/GridContainer";

export default function TalentPage() {
    const {id} = useParams<{ id: string }>();
    const [talent, setTalent] = useState<Talent | null>(null);
    const [tab, setTab] = useState('1');
    let pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return;
        }
        (async (): Promise<void> => {
            setTalent(await TalentService.getTalent(id));
        })()
    }, [id, setTalent]);

    if (!talent) {
        return <Fragment/>;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const updateTalent = async (updatedTalent: Talent) => {
        if (talent) {
            setTalent(await TalentService.updateTalent(updatedTalent));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={talent.name} path={RootPath.Talent + talent.id}/>
            <CardContent>
                <TabContext value={tab}>
                    <GridContainer centered>
                        <TabList onChange={handleChange} centered>
                            <Tab label="Base" value="1"/>
                            <Tab label="Modifiers" value="2"/>
                        </TabList>
                    </GridContainer>
                    <TabPanel value="1">
                        <TalentBaseTab talent={talent} updateTalent={updateTalent} disabled={!pathname.endsWith(talent.id + '/edit')}/>
                    </TabPanel>
                    <TabPanel value="2">
                        <TalentModifierTab talent={talent} updateTalent={updateTalent} disabled={!pathname.endsWith(talent.id + '/edit')}/>
                    </TabPanel>
                </TabContext>
            </CardContent>
        </Card>
    );
}
