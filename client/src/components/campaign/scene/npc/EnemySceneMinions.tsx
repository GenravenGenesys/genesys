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
import {useFetchCurrentCampaign} from "../../CampaignWorkflow";
import Minion from "../../../../models/actor/npc/Minion";
import MinionService from "../../../../services/actor/MinionService";

interface Props {
    id: string
}

export default function EnemySceneMinions(props: Props) {
    const {id} = props;
    const [minions, setMinions] = useState<Minion[]>([]);
    const campaign = useFetchCurrentCampaign();
    const headers = ['Name', 'Add'];

    useEffect(() => {
        (async (): Promise<void> => {
            if (!campaign) return;
            setMinions(await MinionService.getMinions(campaign.id));
        })()
    }, [setMinions, campaign]);

    const addMinion = async (minion: Minion) => {
        await SceneService.addMinionToScene(id, minion);
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {minions.map((minion: Minion) => (
                        <TableRow key={minion.id}>
                            <TableCell style={{textAlign: 'left'}}>
                                <Button>{minion.name}</Button>
                            </TableCell>
                            <TableCell style={{textAlign: 'center'}}>
                                <Button onClick={() => addMinion(minion)}>Add</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}