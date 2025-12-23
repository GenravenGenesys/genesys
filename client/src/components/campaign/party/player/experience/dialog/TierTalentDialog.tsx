import {Dialog, DialogContent} from "@mui/material";
import type Player from "../../../../../../models/actor/player/Player";
import CenteredDialogTitle from "../../../../../common/dialog/CenteredDialogTitle";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {
    GenesysDescriptionTypographyCenterTableCell,
    TableCellButton,
    TypographyCenterTableCell
} from "../../../../../common/table/TypographyTableCell";
import TableContainer from "@mui/material/TableContainer";
import PlayerService from "../../../../../../services/actor/PlayerService";
import {useFetchCampaignTalents} from "../../../../../../hooks/useFetchCampaignTalents.ts";
import {type Talent, TalentTier} from "../../../../../../api/model";
import type {FC} from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    currentPlayer: Player;
    tier: TalentTier;
    updatePlayer: (player: Player) => void;
}

const TierTalentDialog: FC<Props> = ({open, onClose, currentPlayer, tier, updatePlayer}) => {
    const {talents} = useFetchCampaignTalents(tier);
    const playerTalents = currentPlayer.talents.filter(talent => talent.tier === tier);
    const headers = ['Name', 'Activation', 'Summary', 'Purchase'];

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
            case TalentTier.First:
                return '5XP';
            case TalentTier.Second:
                return '10XP';
            case TalentTier.Third:
                return '15XP';
            case TalentTier.Fourth:
                return '20XP';
            case TalentTier.Fifth:
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
};

export default TierTalentDialog;