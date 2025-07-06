import { Card, CardContent, Table, TableContainer } from "@mui/material";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { renderSingleRowTableHeader } from "../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import SingleActionTableCell from "../../common/table/actions/SingleActionTableCell";
import { CampaignPath } from "../../../services/RootPath";
import { TypographyCenterTableCell } from "../../common/table/TypographyTableCell";
import CenteredCardHeaderWithButton from "../../common/card/header/CenteredCardHeaderWithButton";
import CampaignSceneSelectionDialog from "./CampaignSceneSelectionDialog";
import CampaignSession from "../../../models/campaign/CampaignSession";

interface Props {
    session: CampaignSession;
}

const ViewCampaignScenes: React.FC<Props> = ({ session }) => {
    const [openSceneDialog, setOpenSceneDialog] = useState(false);
    const headers = ['Name', 'View'];

    return (
        <Card sx={{ width: 1 }}>
            <CenteredCardHeaderWithButton title={'Scenes'} onClick={() => setOpenSceneDialog(true)}
                buttonText={'Add Scene'} />
            {openSceneDialog && <CampaignSceneSelectionDialog open={openSceneDialog}
            onClose={(): void => setOpenSceneDialog(false)} session={session} />}
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {(session.scenes || []).map((scene, index) => (
                                <TableRow key={index}>
                                    <TypographyCenterTableCell value={scene.name} />
                                    <SingleActionTableCell name={scene.id} path={CampaignPath.Scene} />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default ViewCampaignScenes;