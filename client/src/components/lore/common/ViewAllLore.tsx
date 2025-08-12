import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {useEffect, useState} from "react";
import LoreService from "../../../services/lore/LoreService";
import Lore, {LoreType} from "../../../models/lore/Lore";
import ActionsTableCell from "../../common/table/actions/ActionsTableCell";
import {LorePath} from "../../../services/RootPath";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import {useFetchCurrentCampaign} from "../../campaign/CampaignWorkflow";

interface RowProps {
    lore: Lore
}

function LoreRow(props: RowProps): JSX.Element {
    const {lore} = props

    const getLorePath = ():LorePath => {
        switch (lore.type) {
            case LoreType.ORGANIZATION:
                return LorePath.Organization
        }
    }

    return (
        <TableRow>
            <TypographyCenterTableCell value={lore.name}/>
            <TypographyCenterTableCell value={lore.type}/>
            <ActionsTableCell name={lore.name} path={getLorePath()}/>
        </TableRow>
    )
}

export default function ViewAllLore() {
    const [lore, setLore] = useState<Lore[]>([]);
    const headers = ['Name', 'Type', 'View'];
    const campaign = useFetchCurrentCampaign();

    useEffect(() => {
        (async (): Promise<void> => {
            if (!campaign) return;
            setLore(await LoreService.getAllLore(campaign.id))
        })()
    }, [campaign])

    return (
        <Card>
            <CenteredCardHeader title={'View All Lore'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {lore.map((lore: Lore) => (
                                <LoreRow lore={lore}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}
