import Player, {PlayerSkill} from "../../../../../../models/actor/player/Player";
import {useEffect, useState} from "react";
import PlayerService from "../../../../../../services/actor/PlayerService";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton} from "@mui/material";
import {Add} from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader, renderSkillName} from "../../../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import {GenesysDescriptionTypographyCenterTableCell} from "../../../../../common/table/TypographyTableCell";
import TableCell from "@mui/material/TableCell";
import BooleanTableCell from "../../../../../common/table/BooleanTableCell";

interface Props {
    open: boolean
    onClose: () => void
    currentPlayer: Player
}

export default function SpendSkillDialog(props: Props) {
    const {open, onClose, currentPlayer} = props;
    const [player, setPlayer] = useState(currentPlayer);
    let headers = ['Skill', 'Career', 'Current Ranks', 'Increase'];

    useEffect(() => {
        setPlayer(currentPlayer);
    }, [currentPlayer]);

    const handleIncreaseLevel = async (skill: PlayerSkill) => {
        setPlayer(await PlayerService.purchaseSkillUpgrade(player.id, skill))
    };

    const handleCancel = async () => {
        await PlayerService.updatePlayer(currentPlayer);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Spend Experience on Characteristic</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <TableContainer component={Paper}>
                        <Table>
                            {renderSingleRowTableHeader(headers)}
                            <TableBody>
                                {player.skills.map((skill) => (
                                    <TableRow>
                                        {renderSkillName(skill)}
                                        <BooleanTableCell bool={skill.career}/>
                                        <GenesysDescriptionTypographyCenterTableCell value={String(skill.ranks)}/>
                                        <TableCell style={{textAlign: 'center'}}>
                                            <IconButton
                                                onClick={() => handleIncreaseLevel(skill)}
                                                color="primary">
                                                <Add/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose} color="primary">Confirm</Button>
                <Button onClick={handleCancel} color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}