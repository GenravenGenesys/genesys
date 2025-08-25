import {Dialog, DialogContent} from "@mui/material";
import Player from "../../../../../../models/actor/player/Player";
import CenteredDialogTitle from "../../../../../common/dialog/CenteredDialogTitle";
import Talent, {Tier} from "../../../../../../models/Talent";
import {useEffect, useState} from "react";
import CampaignService from "../../../../../../services/CampaignService";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {
    GenesysDescriptionTypographyCenterTableCell, TableCellButton,
    TypographyCenterTableCell
} from "../../../../../common/table/TypographyTableCell";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import PlayerService from "../../../../../../services/actor/PlayerService";

interface Props {
    open: boolean
    onClose: () => void
    currentPlayer: Player
    tier: Tier
    updatePlayer: (player: Player) => void
}

export default function TierTalentDialog(props: Props) {
    const {open, onClose, currentPlayer, tier, updatePlayer} = props;
    const [talents, setTalents] = useState<Talent[]>([]);
    const playerTalents = currentPlayer.talents.filter(talent => talent.tier === tier);
    const headers = ['Name', 'Activation', 'Summary', 'Purchase'];

    useEffect(() => {
        (async (): Promise<void> => {
            setTalents(await CampaignService.getCampaignTierTalents(tier));
        })();
    }, [setTalents, tier]);

    const addTalent = async (talent: Talent) => {
        updatePlayer(await PlayerService.purchaseTalentUpgrade(currentPlayer.id, talent));
        onClose();
    };

    const filterTalents = (): Talent[] => {
        const filteredPlayerTalents = new Set(playerTalents.map(talent => talent.id));
        return talents.filter(talent => !filteredPlayerTalents.has(talent.id));
    };

    const renderExperienceCost = () => {
        switch (tier) {
            case Tier.First:
                return '5XP';
            case Tier.Second:
                return '10XP';
            case Tier.Third:
                return '15XP';
            case Tier.Fourth:
                return '20XP';
            case Tier.Fifth:
                return '25XP';
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={'Talents'}/>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {filterTalents().map((talent: Talent) => (
                                <TableRow key={talent.name}>
                                    <TypographyCenterTableCell value={talent.name}/>
                                    <TypographyCenterTableCell value={talent.activation}/>
                                    <GenesysDescriptionTypographyCenterTableCell value={talent.summary}/>
                                    <TableCellButton value={renderExperienceCost()} onClick={() => addTalent(talent)}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    );
}