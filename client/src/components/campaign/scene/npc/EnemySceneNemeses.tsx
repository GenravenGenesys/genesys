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
import Nemesis from "../../../../models/actor/npc/Nemesis";
import NemesisService from "../../../../services/actor/NemesisService";

interface Props {
    id: string
}

export default function EnemySceneNemeses(props: Props) {
    const {id} = props;
    const [nemeses, setNemeses] = useState<Nemesis[]>([]);
    const campaign = useFetchCurrentCampaign();
    const headers = ['Name', 'Add'];

    useEffect(() => {
        (async (): Promise<void> => {
            if (!campaign) return;
            setNemeses(await NemesisService.getNemeses(campaign.id));
        })()
    }, [setNemeses, campaign]);

    const addNemesis = async (nemesis: Nemesis) => {
        await SceneService.addNemesisToScene(id, nemesis);
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {nemeses.map((nemesis: Nemesis) => (
                        <TableRow key={nemesis.id}>
                            <TableCell style={{textAlign: 'left'}}>
                                <Button>{nemesis.name}</Button>
                            </TableCell>
                            <TableCell style={{textAlign: 'center'}}>
                                <Button onClick={() => addNemesis(nemesis)}>Add</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}