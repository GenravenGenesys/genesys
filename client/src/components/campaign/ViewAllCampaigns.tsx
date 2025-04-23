import {useState} from "react";
import {Button, Card, CardContent, CardHeader, Divider} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import SingleActionTableCell from "../common/table/actions/ActionsTableCell";
import {CampaignPath} from "../../services/RootPath";
import Campaign from "../../models/campaign/Campaign";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import CampaignDialog from "./CampaignDialog";

interface Props {
    campaigns: Campaign[]
}

export default function ViewAllCampaigns(props: Props) {
    const {campaigns} = props;
    const [openCampaignCreationDialog, setOpenCampaignCreationDialog] = useState(false)
    const headers = ['Name', 'View']

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Campaigns'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenCampaignCreationDialog(true)}>Create Campaign</Button>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {campaigns.map((campaign: Campaign) => (
                                <TableRow key={campaign.name}>
                                    <TypographyCenterTableCell value={campaign.name}/>
                                    <SingleActionTableCell name={campaign.name} path={CampaignPath.Campaign}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openCampaignCreationDialog && <CampaignDialog open={openCampaignCreationDialog}
                                                           onClose={(): void => setOpenCampaignCreationDialog(false)}/>}
        </Card>
    )
}