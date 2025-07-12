import {Card, CardContent, Table, TableContainer} from "@mui/material";
import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import SingleActionTableCell from "../../common/table/actions/SingleActionTableCell";
import {CampaignPath} from "../../../services/RootPath";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import CenteredCardHeaderWithButton from "../../common/card/header/CenteredCardHeaderWithButton";
import SessionSceneSelectionDialog from "../session/SessionSceneSelectionDialog";
import CampaignSession from "../../../models/campaign/CampaignSession";
import CampaignSceneSelectionDialog from "./CampaignSceneSelectionDialog";
import Scene from "../../../models/campaign/Scene";
import CampaignService from "../../../services/CampaignService";

const ViewCampaignScenes = () => {
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [openSceneDialog, setOpenSceneDialog] = useState(false);
    const headers = ['Name', 'View'];

    useEffect(() => {
        (async (): Promise<void> => {
            setScenes(await CampaignService.getCampaignScenes());
        })()
    }, [setScenes]);

    return (
        <Card sx={{width: 1}}>
            <CenteredCardHeaderWithButton title={'Scenes'} onClick={() => setOpenSceneDialog(true)}
                                          buttonText={'Add Scene'}/>
            {openSceneDialog && <CampaignSceneSelectionDialog open={openSceneDialog}
                                                              onClose={(): void => setOpenSceneDialog(false)}/>}
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {(scenes || []).map((scene, index) => (
                                <TableRow key={index}>
                                    <TypographyCenterTableCell value={scene.name}/>
                                    <SingleActionTableCell name={scene.id} path={CampaignPath.Scene}/>
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