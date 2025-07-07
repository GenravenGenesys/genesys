import {Card, CardContent, Table, TableContainer} from "@mui/material";
import CenteredCardHeaderWithButton from "../../common/card/header/CenteredCardHeaderWithButton";
import React, {useEffect, useState} from "react";
import Scene from "../../../models/campaign/Scene";
import Paper from "@mui/material/Paper";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import ActionsTableCell from "../../common/table/actions/ActionsTableCell";
import {RootPath} from "../../../services/RootPath";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import CampaignSession from "../../../models/campaign/CampaignSession";
import SessionService from "../../../services/SessionService";
import CampaignSceneSelectionDialog from "../scene/CampaignSceneSelectionDialog";

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
                                          buttonText={'Add Scene'}/>
            {openSceneDialog && <CampaignSceneSelectionDialog open={openSceneDialog}
            onClose={(): void => setOpenSceneDialog(false)} session={session} />}
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {scenes.map((scene, index) => (
                                <TableRow key={index}>
                                    <TypographyCenterTableCell value={scene.name}/>
                                    <ActionsTableCell name={scene.id} path={RootPath.Scenes}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
};

export default ViewSessionScenes;