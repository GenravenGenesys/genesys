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
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import CampaignTalentSelectionDialog from "./CampaignTalentSelectionDialog";

interface TableProps {
    campaign_id: string
}

export default function ViewCampaignTalents(props: TableProps) {
    const {campaign_id} = props
    const [talents, setTalents] = useState<Talent[]>([])
    const [openTalentCreationDialog, setOpenTalentCreationDialog] = useState(false)
    const headers = ['Name', 'Ranked', 'Activation', 'Tier']

    useEffect(() => {
        (async (): Promise<void> => {
            setTalents(await CampaignService.getCampaignTalents(campaign_id))
        })()
    }, [setTalents, campaign_id])

    const renderRanked = (talent: Talent): string => {
        return talent.ranked ? 'Yes' : 'No'
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Campaign Talents'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenTalentCreationDialog(true)}>Add Talent</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {talents.map((talent: Talent) => (
                                <TableRow key={talent.name}>
                                    <TypographyCenterTableCell value={talent.name}/>
                                    <TypographyCenterTableCell value={renderRanked(talent)}/>
                                    <TypographyCenterTableCell value={talent.activation}/>
                                    <TypographyCenterTableCell value={talent.tier}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openTalentCreationDialog && <CampaignTalentSelectionDialog open={openTalentCreationDialog}
                                                             onClose={(): void => setOpenTalentCreationDialog(false)} campaign_id={campaign_id}/>}
        </Card>
    );
}