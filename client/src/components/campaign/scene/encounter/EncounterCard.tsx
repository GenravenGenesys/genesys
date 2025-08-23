import {Card, CardContent} from "@mui/material";
import * as React from "react";
import Encounter from "../../../../models/campaign/encounter/Encounter";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import TableContainer from "@mui/material/TableContainer";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import TableRow from "@mui/material/TableRow";
import CenteredCardHeaderWithButton from "../../../common/card/header/CenteredCardHeaderWithButton";
import {useNavigate} from "react-router";
import {CampaignPath} from "../../../../services/RootPath";

interface Props {
    sceneId: string;
    encounter: Encounter;
}

const EncounterCard = ({sceneId, encounter}: Props) => {
    const combinedEnemies = [
        ...(encounter.enemyMinionGroups ? encounter.enemyMinionGroups.map(minion => ({...minion})) : []),
        ...(encounter.enemyRivals ? encounter.enemyRivals.map(rival => ({...rival})) : []),
        ...(encounter.enemyNemeses ? encounter.enemyNemeses.map(nemesis => ({...nemesis})) : [])
    ];
    const headers = ['Name', 'Type'];
    const navigate = useNavigate();

    return (
        <Card>
            <CenteredCardHeaderWithButton title={'Encounter'}
                                          onClick={() => navigate(CampaignPath.Scene + sceneId + '/encounter/' + encounter.type)}
                                          buttonText={'Start Encounter'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {combinedEnemies.map((npc: SingleNonPlayerCharacter) => (
                                <TableRow key={npc.id}>
                                    <TypographyCenterTableCell value={npc.name}/>
                                    <TypographyCenterTableCell value={npc.type}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default EncounterCard;