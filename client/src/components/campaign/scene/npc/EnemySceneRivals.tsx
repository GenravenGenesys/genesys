import Rival from "../../../../models/actor/npc/Rival";
import {Button} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import SceneService from "../../../../services/SceneService";
import {useEffect, useState} from "react";
import RivalService from "../../../../services/actor/RivalService";
import {useFetchCurrentCampaign} from "../../CampaignWorkflow";

interface Props {
    id: string
}

export default function EnemySceneRivals(props: Props) {
    const {id} = props;
    const [rivals, setRivals] = useState<Rival[]>([]);
    const campaign = useFetchCurrentCampaign();
    const headers = ['Name', 'Add'];

    useEffect(() => {
        (async (): Promise<void> => {
            if (!campaign) return;
            setRivals(await RivalService.getRivals(campaign.id));
        })()
    }, [setRivals, campaign]);

    const addRival = async (rival: Rival) => {
        await SceneService.addRivalToScene(id, rival);
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {rivals.map((rival: Rival) => (
                        <TableRow key={rival.id}>
                            <TableCell style={{textAlign: 'left'}}>
                                <Button>{rival.name}</Button>
                            </TableCell>
                            <TableCell style={{textAlign: 'center'}}>
                                <Button onClick={() => addRival(rival)}>Add</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}