import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { renderSingleRowTableHeader } from "../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import Talent from "../../../../models/Talent";
import TableContainer from "@mui/material/TableContainer";
import { useEffect, useState } from "react";
import CampaignService from "../../../../services/CampaignService";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {
    GenesysDescriptionTypographyCenterTableCell,
    TypographyCenterTableCell
} from "../../../common/table/TypographyTableCell";
import * as React from "react";

interface Props {
    open: boolean
    addTalent: (talent: Talent) => void
    onClose: () => void
}

export default function CharacterTalentSelectionDialog(props: Props) {
    const { open, addTalent, onClose } = props;
    const [talents, setTalents] = useState<Talent[]>([]);
    const headers = ['Name', 'Activation', 'Description', 'Add'];

    useEffect(() => {
        if (!open) return;

        let isMounted = true;
        (async () => {
            const data = await CampaignService.getCampaignTalents();
            if (isMounted) setTalents(data);
        })();

        return () => {
            isMounted = false;
            setTalents([]);
        };
    }, [open]);


    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle title={'Add Talent'} />
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {talents.map((talent: Talent) => (
                                <TableRow key={talent.name}>
                                    <TypographyCenterTableCell value={talent.name} />
                                    <TypographyCenterTableCell value={talent.activation} />
                                    <GenesysDescriptionTypographyCenterTableCell value={talent.description} />
                                    <TableCell style={{ textAlign: "center" }}>
                                        <Button onClick={() => addTalent(talent)}>Add</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}