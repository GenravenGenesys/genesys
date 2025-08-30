import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Button} from "@mui/material";
import type Scene from "../../../models/campaign/Scene";
import SceneBackdrop from "./SceneBackdrop";
import CampaignService from "../../../services/CampaignService";

const CampaignSceneSelectionTable = () => {
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [openSceneBackDrop, setOpenSceneBackDrop] = useState(false);
    const headers = ['Name', 'Add'];

    useEffect(() => {
        (async (): Promise<void> => {
            setScenes(await CampaignService.getCampaignScenes());
        })()
    }, [setScenes]);

    const addScene = async (scene: Scene) => {
        await CampaignService.addCampaignScene(scene);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {scenes.map((scene: Scene) => (
                        <TableRow key={scene.id}>
                            <TableCell>
                                <Button onClick={(): void => setOpenSceneBackDrop(true)}>{scene.name}</Button>
                                {openSceneBackDrop &&
                                    <SceneBackdrop open={openSceneBackDrop}
                                                   onClose={(): void => setOpenSceneBackDrop(false)}
                                                   scene={scene}/>}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => addScene(scene)}>Add</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CampaignSceneSelectionTable;