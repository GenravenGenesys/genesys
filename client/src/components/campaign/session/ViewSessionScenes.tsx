import { Card, CardContent, Table, TableContainer } from "@mui/material";
import CenteredCardHeaderWithButton from "../../common/card/header/CenteredCardHeaderWithButton";
import React, { useEffect, useState } from "react";
import Scene from "../../../models/campaign/Scene";
import Paper from "@mui/material/Paper";
import { renderSingleRowTableHeader } from "../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import CampaignSession from "../../../models/campaign/CampaignSession";
import SessionService from "../../../services/SessionService";
import SessionSceneSelectionDialog from "./SessionSceneSelectionDialog";
import SceneStartActionTableRow from "../../common/table/actions/SceneStartActionTableRow";

type Props = {
    session: CampaignSession;
};

const ViewSessionScenes: React.FC<Props> = ({ session }) => {
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [openSceneDialog, setOpenSceneDialog] = useState(false);
    const headers = ['Name', 'View'];

    useEffect(() => {
        (async (): Promise<void> => {
            setScenes(await SessionService.getScenesForSession(session.name));
        })()
    }, [setScenes])

    return (
        <Card>
            <CenteredCardHeaderWithButton title={'Scenes'} onClick={() => setOpenSceneDialog(true)}
                buttonText={'Add Scene'} />
            {openSceneDialog && <SessionSceneSelectionDialog open={openSceneDialog}
                                                             onClose={(): void => setOpenSceneDialog(false)} session={session} />}
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {scenes.map((scene) => (
                                <SceneStartActionTableRow session={session} scene={scene} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
};

export default ViewSessionScenes;