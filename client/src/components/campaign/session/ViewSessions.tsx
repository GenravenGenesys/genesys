import Campaign from "../../../models/campaign/Campaign";
import React, {useState} from "react";
import {Button, Card, CardContent, Table, TableContainer, TableFooter} from "@mui/material";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import Paper from "@mui/material/Paper";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import AddIcon from "@mui/icons-material/Add";
import CampaignSession from "../../../models/campaign/CampaignSession";
import SingleActionTableCell from "../../common/table/actions/ActionsTableCell";
import {CampaignPath} from "../../../services/RootPath";
import TextFieldTableCell from "../../common/table/TextFieldTableCell";
import CampaignService from "../../../services/CampaignService";

interface Props {
    camp: Campaign
}

export default function ViewSessions(props: Props) {
    const {camp} = props;
    const [campaign, setCampaign] = useState(camp);
    const headers = ['Name', 'View'];

    const addRow = async () => {
        await updateCampaign({
            ...campaign,
            sessions: [...campaign.sessions, {
                name: 'new',
                party: campaign.party,
                active: false,
                scenes: [],
                player: 0,
                gm: 0
            } as CampaignSession]
        });
    };

    const onSessionNameChange = async (index: number, value: string) => {
        const updatedSessions = campaign.sessions.map((session, i) =>
            i === index ? {...session, name: value} : session
        );
        await updateCampaign({...campaign, sessions: updatedSessions});
    };

    const updateCampaign = async (updatedCampaign: Campaign) => {
        setCampaign(await CampaignService.updateCampaign(updatedCampaign));
    };

    return (
        <Card>
            <CenteredCardHeader title={'Sessions'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {campaign.sessions.map((session, index) => (
                                <TableRow key={index}>
                                    <TextFieldTableCell onChange={onSessionNameChange} value={session.name}
                                                        index={index} disabled={session.active}/>
                                    <SingleActionTableCell name={session.name} path={CampaignPath.Session}/>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow key={'Footer'}>
                                <Button variant='contained' color='primary' onClick={addRow} startIcon={<AddIcon/>}>Add
                                    Session</Button>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}