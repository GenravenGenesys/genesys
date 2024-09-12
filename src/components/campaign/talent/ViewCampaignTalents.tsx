import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from 'react';
import * as React from 'react';
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import CampaignService from "../../../services/CampaignService";
import Talent from "../../../models/Talent";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import CreateTalentDialog from "../../talents/CreateTalentDialog";
import {TalentRow} from "../../talents/ViewAllTalents";

interface TableProps {
    campaign_id: string
}

export default function ViewCampaignTalents(props: TableProps) {
    const {campaign_id} = props
    const [talents, setTalents] = useState<Talent[]>([])
    const [openTalentCreationDialog, setOpenTalentCreationDialog] = useState(false)
    const headers = ['Name', 'Ranked', 'Activation', 'Tier', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            setTalents(await CampaignService.getCampaignTalents(campaign_id))
        })()
    }, [setTalents, campaign_id])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Talents'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenTalentCreationDialog(true)}>Add Talent</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {talents.map((talent: Talent) => (
                                <TalentRow key={talent.name} talent={talent} columns={headers.length}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openTalentCreationDialog && <CreateTalentDialog open={openTalentCreationDialog}
                                                             onClose={(): void => setOpenTalentCreationDialog(false)}/>}
        </Card>
    );
}
