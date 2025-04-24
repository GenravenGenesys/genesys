import {Organization} from "../../../models/lore/Organization";
import * as React from "react";
import {useEffect, useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import ActionsTableCell from "../../common/table/actions/ActionsTableCell";
import {GenesysDescriptionTypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import LoreCreationDialog from "../common/LoreCreationDialog";
import {LoreType} from "../../../models/lore/Lore";
import {LorePath} from "../../../services/RootPath";
import {useFetchCurrentCampaign} from "../../campaign/CampaignWorkflow";
import OrganizationService from "../../../services/lore/OrganizationService";

interface RowProps {
    organization: Organization
}

function OrganizationRow(props: RowProps) {
    const {organization} = props

    return (
        <TableRow>
            <GenesysDescriptionTypographyCenterTableCell value={organization.name}/>
            <ActionsTableCell name={organization.name} path={LorePath.Organization}/>
        </TableRow>
    )
}

export function ViewAllOrganizations() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [openLoreCreationDialog, setOpenLoreCreationDialog] = useState(false);
    const headers = ['Name', 'View'];
    const campaign = useFetchCurrentCampaign();

    useEffect(() => {
        (async (): Promise<void> => {
            if (!campaign) return;
            setOrganizations(await OrganizationService.getOrganizations());
        })()
    }, [setOrganizations, campaign])

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={'View All Organizations'}
                        action={<Button color='primary' variant='contained'
                                        onClick={(): void => setOpenLoreCreationDialog(true)}>CREATE</Button>}/>
            {openLoreCreationDialog &&
                <LoreCreationDialog open={openLoreCreationDialog} onClose={(): void => setOpenLoreCreationDialog(false)}
                                    lore={LoreType.ORGANIZATION} path={LorePath.Organization}/>}
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {organizations.map((organization: Organization) => (
                                <OrganizationRow key={organization.name} organization={organization}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}