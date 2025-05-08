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
import {Card, CardContent} from "@mui/material";
import LoreCreationDialog from "../common/LoreCreationDialog";
import {LoreType} from "../../../models/lore/Lore";
import {LorePath} from "../../../services/RootPath";
import {useFetchCurrentCampaign} from "../../campaign/CampaignWorkflow";
import OrganizationService from "../../../services/lore/OrganizationService";
import CenteredCardHeaderWithButton from "../../common/card/header/CenteredCardHeaderWithButton";

const ViewAllOrganizations: React.FC = () => {
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
            <CenteredCardHeaderWithButton title={'View All Organizations'}
                                          onClick={() => setOpenLoreCreationDialog(true)}
                                          buttonText={'Create Organization'}/>
            {openLoreCreationDialog &&
                <LoreCreationDialog open={openLoreCreationDialog} onClose={(): void => setOpenLoreCreationDialog(false)}
                                    lore={LoreType.ORGANIZATION} path={LorePath.Organization}/>}
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {organizations.map((organization: Organization) => (
                                <TableRow key={organization.id}>
                                    <GenesysDescriptionTypographyCenterTableCell value={organization.name}/>
                                    <ActionsTableCell name={organization.id} path={LorePath.Organization}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default ViewAllOrganizations;