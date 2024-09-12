import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import Talent from "../../../models/Talent";
import Campaign from "../../../models/campaign/Campaign";
import TalentBackdrop from "../../actor/common/talent/TalentBackdrop";
import TalentService from "../../../services/TalentService";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";

interface RowProps {
    talent: Talent
    campaign: Campaign
}

function TalentNameRow(props: RowProps) {
    const {talent, campaign} = props;
    console.log(campaign)
    const [openTalentBackDrop, setOpenTalentBackDrop] = useState(false)

    // const addTalent = async () => {
    //     if (player.talents.some(actorTalent => actorTalent.name === talent.name)) {
    //         player.talents.forEach((actorTalent, index) => {
    //             if (talent.name === actorTalent.name) {
    //                 actorTalent.ranks = actorTalent.ranks + 1
    //                 player.talents[index] = actorTalent
    //             }
    //         })
    //     } else {
    //         player.talents.push({...talent, ranks: 1})
    //     }
    //     await ActorService.updatePlayer(player.name, player)
    // }

    return (
        <TableRow>
            <TableCell>
                <Button onClick={(): void => setOpenTalentBackDrop(true)}>{talent.name}</Button>
                {openTalentBackDrop &&
                    <TalentBackdrop open={openTalentBackDrop} onClose={(): void => setOpenTalentBackDrop(false)}
                                    talent={talent}/>}
            </TableCell>
            <TableCell>
                <Button>Add</Button>
            </TableCell>
        </TableRow>
    )
}

interface TableProps {
    campaign: Campaign
}

export default function CampaignTalentSelectionTable(props: TableProps) {
    const {campaign} = props
    const [talents, setTalents] = useState<Talent[]>([])
    const headers = ['Name', 'Add']

    useEffect(() => {
        (async (): Promise<void> => {
            setTalents(await TalentService.getTalents())
        })()
    }, [setTalents])

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {talents.map((talent: Talent) => (
                        <TalentNameRow talent={talent} campaign={campaign}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}